import { useEffect, useRef } from 'react';
import educationData from '../data/education.json';

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

  const education = (educationData as any).education;

  return (
    <section id="education" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">Academic Background</span>
        <h2 className="reveal">Education</h2>

        <div className="education-grid">
          {education.map((edu: any, index: number) => (
            <div key={index} className="education-card reveal">
              {edu.status && (
                <span className="education-status">{edu.status}</span>
              )}
              <h3 className="education-degree">{edu.degree}</h3>
              <h4 className="education-school">{edu.school}</h4>
              <p className="education-period">{edu.period}</p>
              <p className="education-location">{edu.location}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Education;
