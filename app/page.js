import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';

const Projects = dynamic(() => import('@/components/Projects'), { ssr: true });
const CodingProfiles = dynamic(() => import('@/components/CodingProfiles'), { ssr: true });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: true });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true });

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <CodingProfiles />
      <Experience />
      <Contact />
    </main>
  );
}
