import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Stack from "./components/Stack";
import Work from "./components/Work";
import Writings from "./components/Writings";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <About />
        <Stack />
        <Work />
        <Writings />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
