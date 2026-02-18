import { useEffect, useRef } from 'react';
import achievementsData from '../data/achievements.json';

const Achievements = () => {
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

  const achievements = (achievementsData as any).achievements;

  return (
    <section id="achievements" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">Recognition</span>
        <h2 className="reveal">Achievements</h2>

        <div className="achievements-container">
          {achievements.map((achievement: any, index: number) => (
            <div key={index} className="achievement-card reveal">
              <div className="achievement-icon">{achievement.prize}</div>
              <div className="achievement-content">
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Achievements;
