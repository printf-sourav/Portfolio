/**
 * Loader Component - Unix Boot Sequence Animation
 */

import React, { useEffect, useState } from 'react';

const bootLines = [
  '[    0.000000] Initializing portfolio kernel...',
  '[    0.124532] Loading creative modules...',
  '[    0.256891] Mounting /dev/skills...',
  '[    0.389234] Starting project daemon...',
  '[    0.521567] Initializing neural networks...',
  '[    0.654123] Loading experience database...',
  '[    0.786456] Configuring display server...',
  '[    0.918789] Starting portfolio service...',
  '[  OK  ] Portfolio ready. Welcome!'
];

function Loader({ onLoadComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show boot lines sequentially
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, { text: line, isSuccess: index === bootLines.length - 1 }]);
      }, index * 200);
    });

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Complete loading
    const totalDuration = bootLines.length * 200 + 800;
    const timer = setTimeout(() => {
      onLoadComplete();
    }, totalDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onLoadComplete]);

  return (
    <div className="loader">
      <div className="boot-sequence">
        {visibleLines.map((line, index) => (
          <div 
            key={index} 
            className={`boot-line visible ${line.isSuccess ? 'success' : ''}`}
          >
            {line.text}
          </div>
        ))}
      </div>
      <div className="boot-progress">
        <div 
          className="boot-progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default Loader;
