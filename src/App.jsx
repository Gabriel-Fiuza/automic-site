import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/Herosection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseSection from './components/WhyChooseSection';
import Footer from './components/Footer';
import Game from './components/Game';
import Certificado from './components/Certificado';
import MembroDetalhado from './components/MembroDetalhado';
import './styles/index.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <main className="main-content">
                <HeroSection />
                <ServicesSection id="services" />
                <WhyChooseSection />
              </main>
              <Game />
              <Footer id="footer" />
            </>
          }
        />
        <Route
          path="/quem-somos"
          element={
            <>
              <Header />
              <AboutSection />
              <Footer />
            </>
          }
        />
        <Route path="/certificado" element={<Certificado />} />
        <Route path="/membro/:id" element={<MembroDetalhado />} />
      </Routes>
    </Router>
  );
}

