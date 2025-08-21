import React, { useEffect, useRef, useState } from "react";

const AnimatedNumber = ({ value, duration = 1200, suffix = "", className = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimestamp = useRef(null);

  useEffect(() => {
    let animationFrame;
    const start = performance.now();
    const animate = (timestamp) => {
      if (!startTimestamp.current) startTimestamp.current = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <span className={className}>{displayValue}{suffix}</span>
  );
};

export default AnimatedNumber;