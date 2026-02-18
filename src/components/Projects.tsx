import { useEffect, useRef, useState } from 'react';
import projectsData from '../data/projects.json';

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = (projectsData as any).projects;

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="projects" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">Portfolio</span>
        <h2 className="reveal">Featured Projects</h2>

        <div className="projects-container reveal">
          <div className="carousel-wrapper">
            <button
              className="carousel-nav carousel-nav-prev"
              onClick={prevSlide}
              aria-label="Previous project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="carousel" ref={carouselRef}>
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: 'transform 0.5s ease'
                }}
              >
                {projects.map((project: any, index: number) => (
                  <div key={index} className="carousel-slide">
                    <div className="project-card">
                      <h3 className="project-name">{project.name}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="project-tech">
                        {project.tech.map((tech: any, techIndex: number) => (
                          <span key={techIndex} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="carousel-nav carousel-nav-next"
              onClick={nextSlide}
              aria-label="Next project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="carousel-indicators">
            {projects.map((_project: any, index: number) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Grid Layout */}
        <div className="projects-grid-mobile">
          {projects.map((project: any, index: number) => (
            <div key={index} className="project-card-mobile reveal">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech: any, techIndex: number) => (
                  <span key={techIndex} className="tech-badge">
                    {tech}
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

export default Projects;
