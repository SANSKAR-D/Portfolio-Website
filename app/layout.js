import { Inter } from 'next/font/google';
import './globals.css';
import './components.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Sanskar Gupta — Backend Developer & Competitive Programmer',
  description:
    'Personal portfolio of Sanskar Gupta — a backend developer and competitive programmer. Explore projects, coding profiles, and get in touch.',
  keywords: ['developer', 'portfolio', 'backend', 'competitive programming', 'react', 'nextjs'],
  openGraph: {
    title: 'Sanskar Gupta — Backend Developer',
    description: 'Explore my projects, coding profiles, and experience.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={inter.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}