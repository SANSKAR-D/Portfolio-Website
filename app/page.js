import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import CodingProfiles from '@/components/CodingProfiles';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <CodingProfiles />
      <Experience />
      <Contact />
    </main>
  );
}
