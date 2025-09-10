import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { membrosData } from '../assets/membros/membrosData.js';
import '../styles/AboutSection.css';

export default function AboutSection() {
  const [filtroCargo, setFiltroCargo] = useState('');
  const [filtroPeriodo, setFiltroPeriodo] = useState('');
  const navigate = useNavigate();

  const membrosFiltrados = Object.entries(membrosData).filter(([id, membro]) => {
    const porCargo = filtroCargo ? membro.cargo.toLowerCase().includes(filtroCargo.toLowerCase()) : true;
    const porPeriodo = filtroPeriodo ? membro.inicio === filtroPeriodo : true;
    return porCargo && porPeriodo;
  });

  const diretorias = ['Diretoria de Presidência', 'Diretoria de Gestão Estratégica', 'Diretoria de Mercado', 'Diretoria de Projetos'];
  const membrosPorDiretoria = diretorias.map((diretoria) => ({
    diretoria,
    membros: membrosFiltrados.filter(([id, membro]) => membro.diretoria === diretoria),
  }));

  return (
    <section
      className="aboutSection">
      <div className='aboutContent'>
        <h2 id="sobreTitulo">Sobre a Automic Jr.</h2>
        <p style={{ color: '#001330' }}>A Automic Jr. é a Empresa Júnior em Engenharia de Controle e Automação da Universidade Federal de Ouro Preto (UFOP), fundada em 2016. Nosso propósito é desenvolver soluções inovadoras e de alto impacto, ao mesmo tempo em que capacitamos nossos membros para o mercado de trabalho.</p>
        <p style={{ color: '#001330' }}>Somos parte do Movimento Empresa Júnior (MEJ), um dos maiores movimentos de empreendedorismo universitário do mundo, que promove a excelência e o impacto social através de projetos reais.</p>
        
        {/* Adicionando os cards */}
        <div id="sobreCards">
          {/* Card 1: Nossa Missão */}
          <card className="card-padrao">
            <cardHeader>
              <img src="Icons/missao.png" alt="Imagem representativa" />
              <h3 >Nossa Missão</h3>
            </cardHeader>
            <p style={{ color: '#1e2531ff' }}>Contribuir com a população de Ouro Preto e Região por meio de soluções em automação e formar profissionais capazes de fazer a diferença no mundo.</p>
          </card>

          {/* Card 2: Nossa Visão */}
          <card className="card-padrao">
            <cardHeader>
              <img src="Icons/lampada-de-ideia.png" alt="Imagem representativa" />
              <h3 >Nossa Visão</h3>
            </cardHeader>
            <p style={{ color: '#1e2531ff' }}>Ser uma empresa autossuficiente, consolidada e que investe na vivência empresarial e práticas de seus membros.</p>
          </card>

          {/* Card 3: Nossos Valores */}
          <card className="card-padrao">
            <cardHeader>
              <img src="Icons/valores.png" alt="Imagem representativa" />
              <h3 >Nossos Valores</h3>
            </cardHeader>
            <p style={{ color: '#1e2531ff' }}>Inovação, qualidade, colaboração, compromisso com a excelência técnica, desenvolvimento pessoal e impacto social.</p>
          </card>
        </div>
      </div>
      
      <div id='waveNossaEquipe'>
        <h1>Nossa Equipe</h1>
        <div className="wave-line"></div> {/* Linha com efeito de onda */}
        <p>Conheça os talentos que fazem a Automic Jr. acontecer </p>
      </div>

      {membrosPorDiretoria.map(({ diretoria, membros }) => (
        <div key={diretoria} style={{ marginBottom: '2rem' }}>
          <h3>{diretoria}</h3>
          <div className="diretorias-container">
            {membros.map(([id, membro]) => (
              <div
                key={id}
                onClick={() => navigate(`/membro/${id}`)}
                className="card group hover:shadow-brand transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  className="diretoriasFoto"
                  src={membro.foto}
                  alt={membro.nome}
                />
                <h4>{membro.nome}</h4>
                <p className="membro-info">
                  <b>Cargo:</b> {membro.cargo}
                </p>

                <p className="membro-info">
                  <b>Início:</b> {membro.inicio}
                </p>
                
                <p className="membro-info">{membro.introdução}</p>
                <div className="membro-contatos">
                  <button
                    className="btn-linkedin"
                    onClick={() => window.open(membro.linkedin, '_blank')}
                  >
                    LinkedIn
                  </button>
                  <button
                    className="btn-email"
                    onClick={() => window.location.href = `mailto:${membro.email}`}
                  >
                    Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}