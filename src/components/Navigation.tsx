import { useEffect, useState } from 'react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'languages', label: 'Languages' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Calculate position for each menu item stacked vertically above the button
  const getMenuItemStyle = (index: number) => {
    // Stack items vertically above the button
    // Each item is positioned higher (negative Y)
    const itemHeight = 50; // Height of each menu item plus gap
    const offset = (index + 1) * itemHeight;

    return {
      '--y': `${-offset}px`,
      '--delay': `${index * 50}ms`
    } as React.CSSProperties;
  };

  return (
    <>
      {/* Radial navigation container */}
      <div className={`radial-nav ${isMenuOpen ? 'open' : ''}`}>
        {/* Center toggle button */}
        <button
          className="nav-toggle-btn"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="menu-icon">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="close-icon">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Radial menu items */}
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`radial-menu-item ${isMenuOpen ? 'visible' : ''} ${
              activeSection === section.id ? 'active' : ''
            }`}
            style={getMenuItemStyle(index)}
            onClick={() => scrollToSection(section.id)}
            aria-label={`Navigate to ${section.label}`}
            title={section.label}
          >
            <span className="radial-label">{section.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Navigation;
