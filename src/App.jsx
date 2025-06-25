import Header from './components/Header'
import HeroSection from './components/Herosection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import WhyChooseSection from './components/WhyChooseSection'
import Footer from './components/Footer'
import './styles/index.css'
import Game from './components/Game'
import Certificado from './components/Certificado'

export default function App() {
  // Verifica se está na rota /certificado
  const isCertPage = window.location.pathname.replace(/\/+$/, '') === '/certificado';
  if (isCertPage) {
    return <Certificado />;
  }
  return (
    <>
      <Header />
      <main className="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection id='services'/>
        <WhyChooseSection />
      </main>
      <Game />
      <Footer id='footer'/>
    </>
  )
}

<iframe
  src={dados.pdf}
  width="100%"
  height="600px"
  style={{ border: 'none', borderRadius: 8, marginBottom: 24, boxShadow: '0 2px 8px #0001' }}
  title="Certificado PDF"
/>