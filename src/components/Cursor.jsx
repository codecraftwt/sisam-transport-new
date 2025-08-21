import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);
  const leftDotRef = useRef(null);
  const rightDotRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        duration: 0.3,
        delay: 0.1,
        x: e.clientX,
        y: e.clientY,
        ease: 'power3.out',
      });
    };
    document.addEventListener('mousemove', moveCursor);
    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  useEffect(() => {
    if (hovering) {
      gsap.to(leftDotRef.current, {
        left: '50%',
        width: '15px', 
        height: '15px', 
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(rightDotRef.current, {
        left: '50%',
        width: '15px', 
        height: '15px', 
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      
      gsap.to(leftDotRef.current, {
        left: '30%',
        width: '6px', 
        height: '6px', 
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(rightDotRef.current, {
        left: '70%',
        width: '6px', 
        height: '6px', 
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [hovering]);

  useEffect(() => {
    const handlePointerOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'IMG' || e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'LI') {

        setHovering(true);
      }
    };
    const handlePointerOut = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'IMG' || e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'LI') {

        setHovering(false);
      }
    };
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    return () => {
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '60px',
        height: '60px',
        border: '1px solid #c7fe00',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.0)',
        transform: 'translate(-50%, -50%)',
        boxSizing: 'border-box',
      }}
    >
      <div
        ref={leftDotRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '30%',
          width: '6px',
          height: '6px',
          background: '#fafe00',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
      <div
        ref={rightDotRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '70%',
          width: '6px',
          height: '6px',
          background: '#fafe00',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
    </div>
  );
};

export default Cursor;
