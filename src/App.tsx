import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import { projects } from "./data/projects";
import { jobs } from "./data/experience";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
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
  );
}

