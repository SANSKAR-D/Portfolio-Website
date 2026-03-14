'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import { FaGithub } from 'react-icons/fa';
import { HiRefresh } from 'react-icons/hi';

/* Animated counter hook */
function useCounter(target, initial = 0, inView, duration = 2000) {
    const [count, setCount] = useState(initial);

    useEffect(() => {
        if (!inView) return;
        
        let start = count; 
        const distance = target - start;
        if (distance === 0) return;

        const step = distance / (duration / 16);
        const id = setInterval(() => {
            start += step;
            if ((step > 0 && start >= target) || (step < 0 && start <= target)) {
                setCount(target);
                clearInterval(id);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(id);
    }, [inView, target, duration]);

    // Fast-forward initial load if data is already available
    useEffect(() => {
        if (target > 0 && count === 0 && !inView) {
             setCount(target);
        }
    }, [target, count, inView]);

    return count;
}

const platformConfig = {
    'LeetCode': {
        icon: <SiLeetcode size={28} />,
        color: '#ffa116'
    },
    'Codeforces': {
        icon: <SiCodeforces size={28} />,
        color: '#1f8acb'
    }
};

const initialProfileStats = [
    {
        platform: 'LeetCode',
        stats: [
            { id: 'lc-solved', label: 'Problems Solved', value: 0 },
            { id: 'lc-rating', label: 'Contest Rating', value: 0 },
            { id: 'lc-contests', label: 'Contests', value: 0 },
        ]
    },
    {
        platform: 'Codeforces',
        stats: [
            { id: 'cf-rating', label: 'Rating', value: 0 },
            { id: 'cf-max', label: 'Max Rating', value: 0 },
            { id: 'cf-contests', label: 'Contests', value: 0 },
        ]
    },
];

function StatCard({ stat, inView }) {
    const count = useCounter(stat.value, stat.value, inView);
    return (
        <div className="profiles__stat">
            <span className="profiles__stat-value">{count.toLocaleString()}</span>
            <span className="profiles__stat-label">{stat.label}</span>
        </div>
    );
}

/* GitHub-style contribution heatmap (real data) */
function ContributionGraph() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch('https://github-contributions-api.jogruber.de/v4/SANSKAR-D?y=last')
            .then(res => res.json())
            .then(json => {
                setTotal(json.total?.lastYear || 0);
                // Group contributions into weeks (columns of 7 days)
                const contributions = json.contributions || [];
                const weeks = [];
                for (let i = 0; i < contributions.length; i += 7) {
                    weeks.push(contributions.slice(i, i + 7));
                }
                setData(weeks);
            })
            .catch(() => {
                // Fallback to empty data
                setData([]);
            });
    }, []);

    return (
        <div className="profiles__graph">
            <p className="profiles__graph-title">
                <FaGithub size={20} /> {total} contributions in the last year
            </p>
            <div className="profiles__heatmap">
                {data.map((week, wi) => (
                    <div key={wi} className="profiles__heatmap-col">
                        {week.map((day, di) => (
                            <div
                                key={di}
                                className={`profiles__heatmap-cell profiles__heatmap-cell--${day.level}`}
                                title={`${day.date}: ${day.count} contributions`}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="profiles__heatmap-legend">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((l) => (
                    <div key={l} className={`profiles__heatmap-cell profiles__heatmap-cell--${l}`} />
                ))}
                <span>More</span>
            </div>
        </div>
    );
}

export default function CodingProfiles() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const [stats, setStats] = useState(initialProfileStats);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Initialize from local storage
    useEffect(() => {
        const savedStats = localStorage.getItem('codingProfileStats');
        if (savedStats) {
            setStats(JSON.parse(savedStats));
        }
        
        const savedCooldown = localStorage.getItem('codingProfileCooldown');
        if (savedCooldown) {
            const timePassed = Math.floor((Date.now() - parseInt(savedCooldown, 10)) / 1000);
            const remaining = 15 * 60 - timePassed;
            if (remaining > 0) {
                setCooldown(remaining);
            }
        }
        setHasLoaded(true);
    }, []);

    // Countdown timer for cooldown
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => {
            setCooldown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleRefresh = async () => {
        if (cooldown > 0 || isRefreshing) return;
        
        setIsRefreshing(true);
        try {
            // Fetch LeetCode Data via local API
            const lcRes = await fetch('/api/profiles?platform=leetcode&handle=sanskarguptadsa');
            const lcData = await lcRes.json();
            
            // Fetch Codeforces Data via local API
            const cfRes = await fetch('/api/profiles?platform=codeforces&handle=Sanskar__g');
            const cfData = await cfRes.json();

            const newStats = [
                {
                    ...initialProfileStats[0],
                    stats: [
                        { id: 'lc-solved', label: 'Problems Solved', value: lcData?.solved || 0 },
                        { id: 'lc-rating', label: 'Contest Rating', value: lcData?.rating || 0 },
                        { id: 'lc-contests', label: 'Contests', value: lcData?.contests || 0 },
                    ]
                },
                {
                    ...initialProfileStats[1],
                    stats: [
                        { id: 'cf-rating', label: 'Rating', value: cfData?.rating || 0 },
                        { id: 'cf-max', label: 'Max Rating', value: cfData?.maxRating || 0 },
                        { id: 'cf-contests', label: 'Contests', value: cfData?.contests || 0 },
                    ]
                }
            ];

            // Update state and local storage
            setStats(newStats);
            localStorage.setItem('codingProfileStats', JSON.stringify(newStats));
            
            // Start 15 minute cooldown
            setCooldown(15 * 60);
            localStorage.setItem('codingProfileCooldown', Date.now().toString());

        } catch (error) {
            console.error('Failed to fetch coding profile stats through proxy API:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    // Format cooldown seconds to MM:SS
    const formatCooldown = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <section className="section profiles" id="profiles" ref={ref}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="profiles__header-container"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}
            >
                <div>
                    <h2 className="section__heading">Coding Profiles</h2>
                    <p className="section__subheading" style={{ marginBottom: '1rem' }}>
                        Competitive programming stats and contribution activity.
                    </p>
                </div>
                
                <button 
                    onClick={handleRefresh} 
                    disabled={cooldown > 0 || isRefreshing}
                    className={`btn ${cooldown > 0 ? 'btn--secondary' : 'btn--primary'}`}
                    style={{ opacity: cooldown > 0 ? 0.6 : 1, cursor: cooldown > 0 ? 'not-allowed' : 'pointer' }}
                >
                    <HiRefresh size={18} className={isRefreshing ? 'spin' : ''} />
                    {isRefreshing ? 'Refreshing...' : cooldown > 0 ? `Refresh in ${formatCooldown(cooldown)}` : 'Sync Live Data'}
                </button>
            </motion.div>

            <div className="profiles__cards" style={{ marginTop: '2rem' }}>
                {stats.map((profile, i) => (
                    <motion.div
                        key={profile.platform}
                        className="profiles__card glass-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                    >
                        <div className="profiles__card-header" style={{ '--profile-color': platformConfig[profile.platform].color }}>
                            <span className="profiles__card-icon">{platformConfig[profile.platform].icon}</span>
                            <h3>{profile.platform}</h3>
                        </div>
                        <div className="profiles__stats">
                            {profile.stats.map((stat) => (
                                <StatCard 
                                    key={stat.id || stat.label} 
                                    stat={hasLoaded ? stat : { ...stat, value: 0 }} 
                                    inView={inView} 
                                />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <ContributionGraph />
            </motion.div>
        </section>
    );
}
