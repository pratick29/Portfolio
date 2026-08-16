import Hero from "../components/Hero";
import About from "../components/About";
import Journey from "../components/Journey";
import Skills from "../components/Skills";
import PratickLabs from "../components/PratickLabs";
import PersonalWork from "../components/PersonalWork";
import NotesSection from "../components/NotesSection";
import Contact from "../components/Contact";
import Support from "../components/Support";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Skills />
      <PersonalWork />
      <PratickLabs />
      <NotesSection />
      <Contact />
      <Support />
    </>
  );
}