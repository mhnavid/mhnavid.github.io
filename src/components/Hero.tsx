import { useEffect, useState } from 'react';
import profileData from '../data/profile.json';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');

  const greeting = (profileData as any).greeting || 'Hi! I am';
  const fullName = (profileData as any).displayName || 'Mahmudul Hassan Navid';
  const roles = (profileData as any).roles || [
    'Senior Software Engineer',
    'AI & ML Engineer',
    'Full-Stack Developer',
    'MSc Student @ Uni Bamberg 🇩🇪'
  ];

  const socialLinks = [
    { name: 'GitHub', url: (profileData as any).social?.github || 'https://github.com/mhnavid', icon: 'GH' },
    { name: 'LinkedIn', url: (profileData as any).social?.linkedin || 'https://linkedin.com/in/mahmudul-hassan-navid', icon: 'LI' },
    { name: 'Medium', url: (profileData as any).social?.medium || 'https://medium.com/@mahmudulhassannavid', icon: 'M' },
    { name: 'Email', url: `mailto:${(profileData as any).email || 'mahmudulhassannavid@gmail.com'}`, icon: 'E' }
  ];

  // Typewriter effect for roles
  useEffect(() => {
    let timeoutId: number | undefined;
    let charIndex = 0;
    const role = roles[currentRole];

    const typeWriter = () => {
      if (charIndex <= role.length) {
        setDisplayText(role.slice(0, charIndex));
        charIndex++;
        timeoutId = window.setTimeout(typeWriter, 100);
      } else {
        timeoutId = window.setTimeout(() => {
          const deleteWriter = () => {
            if (charIndex >= 0) {
              setDisplayText(role.slice(0, charIndex));
              charIndex--;
              timeoutId = window.setTimeout(deleteWriter, 50);
            } else {
              setCurrentRole((prev) => (prev + 1) % roles.length);
              charIndex = 0;
              timeoutId = window.setTimeout(typeWriter, 500);
            }
          };
          deleteWriter();
        }, 2000);
      }
    };

    typeWriter();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [currentRole]);

  const handleScroll = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">

      {/* Hero content */}
      <div className="hero-content">
        {/* Greeting text */}
        <div className="greeting-text reveal active">
          <span className="greeting">{greeting}</span>
          <span className="name">{fullName}</span>
        </div>

        {/* Typewriter role text */}
        <div className="hero-subtitle">
          <h2 className="typewriter">
            {displayText}
            <span className="cursor">|</span>
          </h2>
        </div>

        {/* Social links */}
        <div className="social-links">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={link.name}
            >
              <span className="social-icon">{link.icon}</span>
              <span className="social-name">{link.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator - positioned at bottom */}
      <button
        className="scroll-indicator"
        onClick={handleScroll}
        aria-label="Scroll down"
      >
        <span className="scroll-text">Scroll Down</span>
        <svg className="scroll-chevron" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  );
};

export default Hero;
