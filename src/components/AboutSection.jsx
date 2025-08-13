import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { membrosData } from '../assets/membros/membrosData.js';

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
      className="about-section"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Centraliza verticalmente
        padding: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#f2f2f2c9', // Cor de fundo suave
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '80%',
          textAlign: 'center',
        }}
      >
        <h2 id="sobreTitulo">Sobre a Automic Jr.</h2>
        <p style={{ color: '#001330' }}>A Automic Jr. é a Empresa Júnior em Engenharia de Controle e Automação da Universidade Federal de Ouro Preto (UFOP), fundada em 2016. Nosso propósito é desenvolver soluções inovadoras e de alto impacto, ao mesmo tempo em que capacitamos nossos membros para o mercado de trabalho.</p>
        <p style={{ color: '#001330' }}>Somos parte do Movimento Empresa Júnior (MEJ), um dos maiores movimentos de empreendedorismo universitário do mundo, que promove a excelência e o impacto social através de projetos reais.</p>
        
        {/* Adicionando os cards */}
        <div id="sobreCards">
          {/* Card 1: Nossa Missão */}
          <card className="card-padrao">
            <cardHeader>
              <img src="../../public/Icons/missao.png" alt="Imagem representativa" />
              <h3 >Nossa Missão</h3>
            </cardHeader>
            <p style={{ color: '#1e2531ff' }}>Contribuir com a população de Ouro Preto e Região por meio de soluções em automação e formar profissionais capazes de fazer a diferença no mundo.</p>
          </card>

          {/* Card 2: Nossa Visão */}
          <card className="card-padrao">
            <cardHeader>
              <img src="../../public/Icons/lampada-de-ideia.png" alt="Imagem representativa" />
              <h3 >Nossa Visão</h3>
            </cardHeader>
            <p style={{ color: '#1e2531ff' }}>Ser uma empresa autossuficiente, consolidada e que investe na vivência empresarial e práticas de seus membros.</p>
          </card>

          {/* Card 3: Nossos Valores */}
          <card className="card-padrao">
            <cardHeader>
              <img src="../../public/Icons/valores.png" alt="Imagem representativa" />
              <h3 >Nossos Valores</h3>
            </cardHeader>
            <p style={{ color: '#1e2531ff' }}>Inovação, qualidade, colaboração, compromisso com a excelência técnica, desenvolvimento pessoal e impacto social.</p>
          </card>
        </div>
      </div>
      
      <div id='waveNossaEquipe'>
        <h1 style={{ zIndex: 100 }}>Nossa Equipe</h1>
        <div className="wave-line" style={{ zIndex: 0}}></div> {/* Linha com efeito de onda */}
        <p style={{ 
          marginBottom: '15rem', 
          zIndex: 100, 
          color: '#ffffffff',
          fontSize: '1.2rem',
          textAlign: 'center',
        }}>Conheça os talentos que fazem a Automic Jr. acontecer </p>
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
                  src={membro.foto}
                  alt={membro.nome}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <h4 style={{ color: '#000000ff', fontSize: '1.2rem', margin: '0.5rem 0' }}>{membro.nome}</h4>
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