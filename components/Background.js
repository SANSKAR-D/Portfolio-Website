'use client';

export default function Background() {
  return (
    <div className="background-container">
      {/* 2. Animated Glowing Orbs (Aurora Effect) */}
      <div className="background-orb background-orb--1"></div>
      <div className="background-orb background-orb--2"></div>
      <div className="background-orb background-orb--3"></div>

      {/* 1. Subtle Animated Grid */}
      <div className="background-grid"></div>
    </div>
  );
}
