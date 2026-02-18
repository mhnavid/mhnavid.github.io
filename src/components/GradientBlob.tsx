import { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

const GradientBlob = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<Position>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [currentPos, setCurrentPos] = useState<Position>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [activeSection, setActiveSection] = useState<'hero' | 'about' | 'skills' | 'experience' | 'projects' | 'education' | 'achievements' | 'certifications' | 'contact'>('hero');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smooth interpolation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrentPos(mousePos);
      return;
    }

    const animate = () => {
      setCurrentPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.08,
        y: prev.y + (mousePos.y - prev.y) * 0.08,
      }));
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos]);

  // Detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'achievements', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section as any);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBlobColor = () => {
    switch (activeSection) {
      case 'hero':
      case 'about':
        return 'radial-gradient(circle, rgba(0, 245, 255, 0.15) 0%, transparent 70%)';
      case 'skills':
      case 'experience':
        return 'radial-gradient(circle, rgba(155, 93, 229, 0.15) 0%, transparent 70%)';
      case 'projects':
        return 'radial-gradient(circle, rgba(247, 183, 49, 0.12) 0%, transparent 70%)';
      case 'contact':
        return 'radial-gradient(circle, rgba(0, 245, 255, 0.1) 0%, rgba(155, 93, 229, 0.1) 50%, transparent 70%)';
      default:
        return 'radial-gradient(circle, rgba(0, 245, 255, 0.15) 0%, transparent 70%)';
    }
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  return (
    <div
      ref={blobRef}
      id="gradient-blob"
      style={{
        position: 'fixed',
        left: `${currentPos.x - 250}px`,
        top: `${currentPos.y - 250}px`,
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(100px)',
        background: getBlobColor(),
        transition: 'background 1s ease',
      }}
    />
  );
};

export default GradientBlob;
