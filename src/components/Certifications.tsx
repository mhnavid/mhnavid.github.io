import { useEffect, useRef } from 'react';
import certificationsData from '../data/certifications.json';

const Certifications = () => {
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

  const certifications = (certificationsData as any).certifications;

  return (
    <section id="certifications" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">Credentials</span>
        <h2 className="reveal">Certifications</h2>

        <div className="certifications-grid">
          {certifications.map((cert: any, index: number) => (
            <div key={index} className="cert-card reveal">
              <div className="cert-icon">📜</div>
              <h3 className="cert-name">{cert.name}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <span className="cert-date">{cert.date}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Certifications;
