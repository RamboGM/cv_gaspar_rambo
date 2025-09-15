import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import { projects } from "./data/projects";
import { jobs } from "./data/experience";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f172a] text-[#f1f5f9] antialiased">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4">
          <Hero />
          <About />
          <Projects items={projects} />
          <Experience items={jobs} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

