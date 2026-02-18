import { useEffect, useRef } from 'react';
import aboutData from '../data/about.json';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badges = (aboutData as any).badges || [];
  const bio = (aboutData as any).bio || '';

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

  return (
    <section id="about" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">About Me</span>
        <h2 className="reveal">Summarizing My Experience</h2>

        <div className="about-content">
          <div className="about-text reveal">
            <p>{bio}</p>

            <div className="badges-container reveal">
              {badges.map((badge: any, index: number) => (
                <div key={index} className="badge-item">
                  <span className="badge-icon">{badge.icon}</span>
                  <span className="badge-text">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image reveal">
            <div className="face-art">
              <svg viewBox="0 0 200 200" className="face-svg">
                {/* Face outline */}
                <ellipse cx="100" cy="100" rx="70" ry="85" fill="none" stroke="rgba(0, 245, 255, 0.3)" strokeWidth="2"/>

                {/* Eyes */}
                <ellipse cx="70" cy="85" rx="15" ry="8" fill="none" stroke="rgba(0, 245, 255, 0.6)" strokeWidth="2"/>
                <ellipse cx="130" cy="85" rx="15" ry="8" fill="none" stroke="rgba(0, 245, 255, 0.6)" strokeWidth="2"/>
                <circle cx="70" cy="85" r="3" fill="rgba(0, 245, 255, 0.8)"/>
                <circle cx="130" cy="85" r="3" fill="rgba(0, 245, 255, 0.8)"/>

                {/* Eyebrows */}
                <line x1="55" y1="72" x2="85" y2="75" stroke="rgba(155, 93, 229, 0.5)" strokeWidth="2" strokeLinecap="round"/>
                <line x1="115" y1="75" x2="145" y2="72" stroke="rgba(155, 93, 229, 0.5)" strokeWidth="2" strokeLinecap="round"/>

                {/* Nose */}
                <line x1="100" y1="90" x2="100" y2="115" stroke="rgba(0, 245, 255, 0.4)" strokeWidth="1.5"/>
                <line x1="90" y1="115" x2="100" y2="115" stroke="rgba(0, 245, 255, 0.4)" strokeWidth="1.5"/>

                {/* Mouth */}
                <path d="M 75 135 Q 100 145 125 135" fill="none" stroke="rgba(247, 183, 49, 0.6)" strokeWidth="2" strokeLinecap="round"/>

                {/* Neural network connections */}
                <g className="neural-connections">
                  <circle cx="50" cy="60" r="2" fill="rgba(0, 245, 255, 0.4)"/>
                  <circle cx="150" cy="60" r="2" fill="rgba(0, 245, 255, 0.4)"/>
                  <circle cx="40" cy="100" r="2" fill="rgba(0, 245, 255, 0.4)"/>
                  <circle cx="160" cy="100" r="2" fill="rgba(0, 245, 255, 0.4)"/>
                  <circle cx="50" cy="140" r="2" fill="rgba(0, 245, 255, 0.4)"/>
                  <circle cx="150" cy="140" r="2" fill="rgba(0, 245, 255, 0.4)"/>

                  <line x1="50" y1="60" x2="70" y2="85" stroke="rgba(0, 245, 255, 0.2)" strokeWidth="1"/>
                  <line x1="150" y1="60" x2="130" y2="85" stroke="rgba(0, 245, 255, 0.2)" strokeWidth="1"/>
                  <line x1="40" y1="100" x2="70" y2="85" stroke="rgba(0, 245, 255, 0.2)" strokeWidth="1"/>
                  <line x1="160" y1="100" x2="130" y2="85" stroke="rgba(0, 245, 255, 0.2)" strokeWidth="1"/>
                  <line x1="50" y1="140" x2="75" y2="135" stroke="rgba(0, 245, 255, 0.2)" strokeWidth="1"/>
                  <line x1="150" y1="140" x2="125" y2="135" stroke="rgba(0, 245, 255, 0.2)" strokeWidth="1"/>
                </g>

                {/* Decorative elements */}
                <circle cx="100" cy="30" r="3" fill="rgba(155, 93, 229, 0.5)">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="170" cy="100" r="2" fill="rgba(155, 93, 229, 0.5)">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="30" cy="100" r="2" fill="rgba(155, 93, 229, 0.5)">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
