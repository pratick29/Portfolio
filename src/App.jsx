import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
// import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
// import ResumeViewer from "./components/ResumeViewer";
import ScrollProgress from "./components/ScrollProgress";
import Blog from "./components/Blog";
import Education from "./components/Education";
import QuickContact from "./components/QuickContact";

export default function App() {
  return (
  <div className="max-w-7xl mx-auto">
<div className="
  bg-slate-50 text-slate-800
  dark:bg-slate-950 dark:text-slate-200
  min-h-screen
">
    <ScrollProgress />
  <Navbar />


    
    <Hero />
    <About />
    <div className="w-full h-px bg-gradient-to-r 
                from-transparent 
                via-gray-300/20 
                to-transparent 
                my-24" />
<Education />
      <Skills />
<div className="w-full h-px bg-gradient-to-r 
                from-transparent 
                via-gray-300/20 
                to-transparent 
                my-24" />

    <Projects />
<div className="w-full h-px bg-gradient-to-r 
                from-transparent 
                via-gray-300/20 
                to-transparent 
                my-24" />
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/20 to-transparent my-16 md:my-24" />

<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/20 to-transparent my-16 md:my-24" />

<Blog />

<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/20 to-transparent my-16 md:my-24" />

<QuickContact />
    <Contact />
    <Footer />

  </div>
  </div>
  );
}
