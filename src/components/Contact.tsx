import { useEffect, useRef, useState } from 'react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Using Formspree for form handling
    // Replace YOUR_FORM_ID with your actual Formspree form ID
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/mhnavid', icon: 'GH' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/mahmudul-hassan-navid', icon: 'LI' },
    { name: 'Medium', url: 'https://medium.com/@mahmudulhassannavid', icon: 'M' },
    { name: 'Email', url: 'mailto:mahmudulhassannavid@gmail.com', icon: 'E' }
  ];

  return (
    <section id="contact" ref={sectionRef}>
      <div className="container">
        <span className="section-label reveal">Get in Touch</span>
        <h2 className="reveal">Contact</h2>

        <div className="contact-content">
          <div className="contact-text reveal">
            <h3>Let's Connect</h3>
            <p>
              Have a project in mind or want to collaborate? I'm always open to discussing new opportunities,
              innovative ideas, and ways to leverage technology for impactful solutions.
            </p>

            <div className="contact-social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                >
                  <span className="social-icon">{link.icon}</span>
                  <span className="social-label">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form reveal" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Tell me about your project or inquiry..."
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <p className="form-message success">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="form-message error">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>

    </section>
  );
};

export default Contact;
