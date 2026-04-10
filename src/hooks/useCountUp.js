/**
 * useCountUp Hook - Animated Counter
 */

import { useState, useEffect, useRef } from 'react';

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);


  useEffect(() => {
    // Start counting when component mounts (after loader)
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 1500); // Delay to account for loader

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const step = target / (duration / 16);
    let current = 0;
    let animationId;

    const updateCount = () => {
      current += step;
      if (current < target) {
        setCount(Math.floor(current));
        animationId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationId);
  }, [target, duration, hasStarted]);

  return count;
}

export default useCountUp;
