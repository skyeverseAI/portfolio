import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import CurrentlyBuilding from "./components/CurrentlyBuilding";
import Writing from "./components/Writing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
<Nav />

      <main>
        <Hero />
        <div className="glow-divider" />
        <Timeline />
        <Projects />
        <Stack />
        <CurrentlyBuilding />
        <Writing />
      </main>

      <Footer />
    </>
  );
}
