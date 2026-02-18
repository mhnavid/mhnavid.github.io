import { useEffect, useRef } from 'react';
import skillsData from '../data/skills.json';

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillCategories = (skillsData as any).categories || [];

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

    const revealElements = sectionRef.current?.querySelectorAll('.reveal, .skill-tag');
    revealElements?.forEach((el) => observer.observe(el));

    return () => {
      revealElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">Expertise</span>
        <h2 className="reveal">Skills & Technologies</h2>

        <div className="skills-grid">
          {skillCategories.map((category: any, categoryIndex: number) => (
            <div key={categoryIndex} className="skill-category reveal">
              <h3
                className="category-name"
                style={{ '--category-color': category.color } as React.CSSProperties}
              >
                {category.name}
              </h3>
              <div className="skills-list">
                {category.skills.map((skill: string, skillIndex: number) => (
                  <span
                    key={skillIndex}
                    className="skill-tag"
                    style={{
                      borderColor: category.color,
                      animationDelay: `${skillIndex * 0.05}s`
                    } as React.CSSProperties}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Skills;
