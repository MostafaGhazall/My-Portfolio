import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import { useActiveSection } from './data/useActiveSection';

const App: React.FC = () => {
  useActiveSection();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* <div className="snap-container"> */}
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <Contact />
        </section>
      {/* </div> */}

      <Footer />
    </div>
  );
};

export default App;
