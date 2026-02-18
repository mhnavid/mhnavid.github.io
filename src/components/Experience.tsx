import { useEffect, useRef } from 'react';
import experienceData from '../data/experience.json';

const Experience = () => {
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

  const experiences = (experienceData as any).items;

  return (
    <section id="experience" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">Career Journey</span>
        <h2 className="reveal">Experience</h2>

        <div className="timeline">
          <div className="timeline-line"></div>

          {experiences.map((exp: any, index: number) => (
            <div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} reveal`}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-period">{exp.period}</span>
                <h3 className="timeline-title">{exp.title}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <p className="timeline-location">{exp.location}</p>
                <ul className="timeline-highlights">
                  {exp.highlights.map((highlight: any, i: number) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Experience;
