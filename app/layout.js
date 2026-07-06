import { Inter, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import './components.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Background from '@/components/Background';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgress from '@/components/ScrollProgress';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});

export const metadata = {
  title: 'Sanskar Gupta — AI Engineer & Competitive Programmer',
  description:
    'Personal portfolio of Sanskar Gupta — an AI engineer and competitive programmer. Explore projects, coding profiles, and get in touch.',
  keywords: ['developer', 'portfolio', 'ai', 'ai engineer', 'competitive programming', 'react', 'nextjs'],
  openGraph: {
    title: 'Sanskar Gupta — AI Engineer',
    description: 'Explore my projects, coding profiles, and experience.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${bricolage.variable}`}>
      <body>
        <Script 
          src="https://cloud.umami.is/script.js" 
          data-website-id="358fc997-02f2-4293-a3bb-edd182236ecb" 
          strategy="afterInteractive"
        />
        <Background />
        <Navbar />
        <ScrollProgress />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}