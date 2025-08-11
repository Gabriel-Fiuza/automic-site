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
      <section className="about-section">
        {/* Nova div com fundo suave */}
        <div
          style={{
            backgroundColor: '#f2f2f2c9', // Cor de fundo suave
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem',
          }}
        >
          <h2 style={{ color: '#000000ff', textAlign: 'center' }}>Sobre a Automic Jr.</h2>
          <p>A Automic Jr. é a Empresa Júnior em Engenharia de Controle e Automação da Universidade Federal de Ouro Preto (UFOP), fundada em 2016. Nosso propósito é desenvolver soluções inovadoras e de alto impacto, ao mesmo tempo em que capacitamos nossos membros para o mercado de trabalho.</p>
          <p>Somos parte do Movimento Empresa Júnior (MEJ), um dos maiores movimentos de empreendedorismo universitário do mundo, que promove a excelência e o impacto social através de projetos reais.</p>
        </div>

        <h4>Membros</h4>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Filtrar por cargo"
            value={filtroCargo}
            onChange={(e) => setFiltroCargo(e.target.value)}
            style={{ marginRight: '1rem', padding: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Filtrar por período (ex.: 2020)"
            value={filtroPeriodo}
            onChange={(e) => setFiltroPeriodo(e.target.value)}
            style={{ padding: '0.5rem' }}
          />
        </div>

        {membrosPorDiretoria.map(({ diretoria, membros }) => (
          <div key={diretoria} style={{ marginBottom: '2rem' }}>
            <h3>{diretoria}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem' }}>
              {membros.map(([id, membro]) => (
                <div
                  key={id}
                  onClick={() => navigate(`/membro/${id}`)}
                  style={{
                    width: '300px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                  }}
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
                    }}
                  />
                  <h4 style={{ color: '#000000ff', fontSize: '1.2rem', margin: '0.5rem 0' }}>{membro.nome}</h4>
                  <p style={{ color: '#000000ff', fontSize: '1.2rem', margin: '0.5rem 0' }}><b>Cargo:</b> {membro.cargo}</p>
                  <p style={{ color: '#000000ff', fontSize: '1.2rem', margin: '0.5rem 0' }}><b>Início:</b> {membro.inicio}</p>
                  <p style={{ color: '#100375ff', fontSize: '1.2rem', margin: '0.5rem 0' }}>{membro.introdução}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }