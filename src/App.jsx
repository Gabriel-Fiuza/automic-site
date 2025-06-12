import Header from './components/Header'
import HeroSection from './components/Herosection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import WhyChooseSection from './components/WhyChooseSection'
import Footer from './components/Footer'
import './styles/index.css'
import Game from './components/Game'

export default function App() {
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