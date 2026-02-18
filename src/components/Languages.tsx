import { useEffect, useRef } from 'react';
import languagesData from '../data/languages.json';

const Languages = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const languages = (languagesData as any).languages || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.2 }
    );

    const revealElements = sectionRef.current?.querySelectorAll('.reveal');
    revealElements?.forEach((el) => observer.observe(el));

    return () => {
      revealElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : 'empty'}`}>★</span>
    ));
  };

  return (
    <section id="languages" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">Communication</span>
        <h2 className="reveal">Language Proficiency</h2>

        <div className="languages-grid">
          {languages.map((lang: any, index: number) => (
            <div key={index} className="language-card reveal">
              <div className="language-header">
                <h3 className="language-name">{lang.name}</h3>
                <span className="language-level">{lang.level}</span>
              </div>
              <div className="language-rating">
                {renderStars(lang.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;
