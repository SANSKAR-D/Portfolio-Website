'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import { FaGithub } from 'react-icons/fa';

/* Animated counter hook */
function useCounter(target, inView, duration = 2000) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = target / (duration / 16);
        const id = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(id);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(id);
    }, [inView, target, duration]);
    return count;
}

const profileStats = [
    {
        platform: 'LeetCode',
        icon: <SiLeetcode size={28} />,
        color: '#ffa116',
        stats: [
            { label: 'Problems Solved', value: 332 },
            { label: 'Contest Rating', value: 1530 },
            { label: 'Contests', value: 3 },
        ]
    },
    {
        platform: 'Codeforces',
        icon: <SiCodeforces size={28} />,
        color: '#1f8acb',
        stats: [
            { label: 'Rating', value: 1196 },
            { label: 'Max Rating', value: 1214 },
            { label: 'Contests', value: 10 },
        ]
    },
];

function StatCard({ stat, inView }) {
    const count = useCounter(stat.value, inView);
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

    return (
        <section className="section profiles" id="profiles" ref={ref}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section__heading">Coding Profiles</h2>
                <p className="section__subheading">
                    Competitive programming stats and contribution activity.
                </p>
            </motion.div>

            <div className="profiles__cards">
                {profileStats.map((profile, i) => (
                    <motion.div
                        key={profile.platform}
                        className="profiles__card glass-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                    >
                        <div className="profiles__card-header" style={{ '--profile-color': profile.color }}>
                            <span className="profiles__card-icon">{profile.icon}</span>
                            <h3>{profile.platform}</h3>
                        </div>
                        <div className="profiles__stats">
                            {profile.stats.map((stat) => (
                                <StatCard key={stat.label} stat={stat} inView={inView} />
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
