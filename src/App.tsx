import CustomCursor from './components/CustomCursor';
import NeuralBackground from './components/NeuralBackground';
import GradientBlob from './components/GradientBlob';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Languages from './components/Languages';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      {!prefersReducedMotion && <CustomCursor />}
      {!prefersReducedMotion && <NeuralBackground />}
      {!prefersReducedMotion && <GradientBlob />}
      <div id="scanlines"></div>
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Achievements />
        <Certifications />
        <Languages />
      </main>
      <Footer />
    </>
  );
}

export default App;
