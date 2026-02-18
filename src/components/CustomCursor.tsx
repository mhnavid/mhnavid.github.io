import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorOuter = cursorOuterRef.current;

    if (!cursor || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (cursor) {
        cursor.style.left = `${clientX}px`;
        cursor.style.top = `${clientY}px`;
      }
      if (cursorOuter) {
        cursorOuter.style.left = `${clientX}px`;
        cursorOuter.style.top = `${clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (cursor && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('btn'))) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.mixBlendMode = 'normal';
      }
    };

    const handleMouseOut = () => {
      if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.mixBlendMode = 'difference';
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorOuterRef} className="custom-cursor-outer" />
    </>
  );
};

export default CustomCursor;
