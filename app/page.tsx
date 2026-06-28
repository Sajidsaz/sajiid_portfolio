import SmoothScroll from "@/components/SmoothScroll";
import Masthead from "@/components/Masthead";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Interlude from "@/components/Interlude";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Masthead />
      <main id="top">
        <Hero />
        <Work />
        <Interlude />
        <About />
        <Services />
        <Contact />
      </main>
    </>
  );
}
