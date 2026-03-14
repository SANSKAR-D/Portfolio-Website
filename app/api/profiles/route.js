import { NextResponse } from 'next/server';

// In-memory cache for development. In production, consider Redis or at least Vercel KV.
const cache = {
  leetcode: { data: null, timestamp: 0 },
  codeforces: { data: null, timestamp: 0 }
};

const CACHE_TTL = 3600 * 1000; // (1 hour)

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform');
  const handle = searchParams.get('handle');

  if (!platform || !handle) {
    return NextResponse.json({ error: 'Missing platform or handle' }, { status: 400 });
  }

  const now = Date.now();
  
  // Return cached data if valid
  if (cache[platform]?.data && (now - cache[platform].timestamp < CACHE_TTL)) {
    return NextResponse.json(cache[platform].data);
  }

  try {
    let result = {};

    if (platform === 'leetcode') {
        // Fetch total solved
        const lcRes = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${handle}`);
        const lcData = await lcRes.json();
        
        // Fetch contest data via GraphQL
        const query = `
        query userContestRankingInfo($username: String!) {
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
          }
        }`;
        
        let lcRating = 0;
        let lcContests = 0;

        try {
            const gqlRes = await fetch('https://leetcode.com/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables: { username: handle } })
            });
            const gqlData = await gqlRes.json();
            
            if (gqlData?.data?.userContestRanking) {
                lcRating = Math.round(gqlData.data.userContestRanking.rating) || 0;
                lcContests = gqlData.data.userContestRanking.attendedContestsCount || 0;
            }
        } catch (e) {
            console.error("Failed to fetch LeetCode GraphQL data", e);
        }

        result = {
            solved: lcData?.totalSolved || 0,
            rating: lcRating,
            contests: lcContests
        };

    } else if (platform === 'codeforces') {
        const cfUserRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const cfUserData = await cfUserRes.json();
        const cfRating = cfUserData?.result?.[0]?.rating || 0;
        const cfMaxRating = cfUserData?.result?.[0]?.maxRating || 0;

        const cfRatingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
        const cfRatingData = await cfRatingRes.json();
        const cfContests = cfRatingData?.result?.length || 0;

        result = {
            rating: cfRating,
            maxRating: cfMaxRating,
            contests: cfContests
        };
    } else {
        return NextResponse.json({ error: 'Invalid platform' }, { status: 400 });
    }

    // Update Cache
    cache[platform] = { data: result, timestamp: now };
    
    return NextResponse.json(result);

  } catch (error) {
    console.error(`Error fetching ${platform} data:`, error);
    // If error, return stale cache if available, otherwise return 0s
    if (cache[platform]?.data) {
        return NextResponse.json(cache[platform].data);
    }
    
    return NextResponse.json({ 
        error: 'Failed to fetch data',
        ...(platform === 'leetcode' ? { solved: 0, rating: 0, contests: 0 } : { rating: 0, maxRating: 0, contests: 0 })
    }, { status: 500 });
  }
}
