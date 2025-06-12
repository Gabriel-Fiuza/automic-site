import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import WhyChooseSection from './components/WhyChooseSection'
import Footer from './components/Footer'
import './styles/index.css'
import Game from './components/Game'

export default function App() {

  const kombImg = document.querySelector('.komb');

  const jump = () => {
      kombImg.classList.add('jump');

      setTimeout(() => {
          kombImg.classList.remove('jump');
      }, 500)

  }

  document.addEventListener('keydown', jump);

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