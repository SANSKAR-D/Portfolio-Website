import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Scroll3DWrapper from '@/components/Scroll3DWrapper';

const CodeDashboard = dynamic(() => import('@/components/CodeDashboard'), { ssr: true });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: true });
const CodingProfiles = dynamic(() => import('@/components/CodingProfiles'), { ssr: true });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: true });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true });

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Scroll3DWrapper>
        <CodeDashboard />
      </Scroll3DWrapper>
      <Scroll3DWrapper>
        <Projects />
      </Scroll3DWrapper>
      <Scroll3DWrapper>
        <CodingProfiles />
      </Scroll3DWrapper>
      <Scroll3DWrapper>
        <Experience />
      </Scroll3DWrapper>
      <Scroll3DWrapper>
        <Contact />
      </Scroll3DWrapper>
    </main>
  );
}
