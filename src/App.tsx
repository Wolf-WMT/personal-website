import { LanguageProvider } from '@/i18n/LanguageContext';
import { MusicProvider } from '@/i18n/MusicContext';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import CRTOverlay from '@/components/CRTOverlay';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import SkillsRadar from '@/components/SkillsRadar';
import Projects from '@/components/Projects';
import SideActivity from '@/components/SideActivity';
import Playlist from '@/components/Playlist';
import TerminalComponent from '@/components/Terminal';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  return (
    <LanguageProvider>
      <MusicProvider>
        <div className="relative min-h-screen bg-cyber-bg text-cyber-text">
          <BackgroundAnimation />
          <CRTOverlay />
          <Navbar />

          <div className="relative z-10">
            <main>
              <Hero />
              <About />
              <SkillsRadar />
              <Projects />
              <SideActivity />
              <Playlist />
              <TerminalComponent />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      </MusicProvider>
    </LanguageProvider>
  );
}

export default App;
