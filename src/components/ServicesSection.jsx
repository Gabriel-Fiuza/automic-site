import Services from "./subcomponents/Services";
import sensor from '../assets/ImgListService/sensor-nivel.jpg';
import residencial from '../assets/ImgListService/automacao-residencial.jpg';
import bi from '../assets/ImgListService/bi.jpg';
import chopeira from '../assets/ImgListService/chopeira-automatica.jpg';
import controleAcesso from '../assets/ImgListService/controle-de-acesso.jpg';
import controleEstoque from '../assets/ImgListService/controle-de-estoque.jpg';
import irrigacao from '../assets/ImgListService/irrigacao-automatica.jpg';
import eletrico from '../assets/ImgListService/projeto-eletrico.jpg';
import iluminacao from '../assets/ImgListService/projeto-iluminacao.jpg';
import '../styles/ServicesSection.css';


export default function ServicesSection({id}) {
  return (
    <section className="section" id={id}>
      <h2>Nossos Serviços</h2>
      <p>Oferecemos uma gama de serviços especializados em engenharia de controle e automação, incluindo desenvolvimento de software personalizado, automação industrial e consultoria técnica. Nosso foco é entregar soluções eficientes e sob medida para as necessidades dos nossos clientes.</p>
      <p>Um de nossos destaques é o aplicativo SEEM 2025, uma solução completa para controle de presença via QR Codes, gerenciamento de usuários e recursos administrativos, demonstrando nossa capacidade em projetos de alta complexidade.</p>
      <div className="services-img">
        <Services img={sensor}/>
        <Services img={residencial}/>
        <Services img={bi}/>
        <Services img={chopeira}/>
        <Services img={controleAcesso}/>
        <Services img={controleEstoque}/>
        <Services img={irrigacao}/>
        <Services img={eletrico}/>
        <Services img={iluminacao}/>
      </div>
    </section>
  )
}