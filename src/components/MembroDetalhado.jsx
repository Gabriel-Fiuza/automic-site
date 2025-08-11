import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { membrosData } from '../assets/membros/membrosData.js';
import Header from './Header';
import Footer from './Footer';

export default function MembroDetalhado() {
  const { id } = useParams(); // Obtém o ID do membro a partir da URL
  const membro = membrosData[id]; // Busca os dados do membro pelo ID

  // Força o scroll para o topo ao carregar a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!membro) {
    return <p style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>Membro não encontrado.</p>; // Caso o ID seja inválido
  }

  return (
    <>
      <Header />
      <section style={{ padding: '2rem', backgroundColor: '#001330', minHeight: 'max-content', color: '#fff' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            backgroundColor: '#002244', // Fundo suave para diferenciar
            padding: '2rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Imagem do membro */}
          <img
            src={membro.foto}
            alt={membro.nome}
            style={{
              width: '450px',
              height: '450px',
              objectFit: 'cover',
              border: '4px solid #FFC300', // Adiciona uma borda amarela vibrante
            }}
          />

          {/* Informações do membro */}
          <div style={{ maxWidth: '600px', textAlign: 'left' }}>
            <h2 style={{ marginBottom: '1rem' }}>{membro.nome}</h2>
            <p style={{ marginBottom: '0.5rem' }}><b>Diretoria:</b> {membro.diretoria}</p>
            <p style={{ marginBottom: '0.5rem' }}><b>Cargo:</b> {membro.cargo}</p>
            <p style={{ marginBottom: '0.5rem' }}><b>Início:</b> {membro.inicio}</p>
            
            {/* Renderiza múltiplos parágrafos para o resumo */}
            {membro.resumo.map((paragrafo, index) => (
              <p key={index} style={{ marginBottom: '1rem' }}>{paragrafo}</p>
            ))}

            {/* Renderiza habilidades técnicas como uma lista */}
            {membro['Habilidades'] && (
              <>
                <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Habilidades Técnicas desenvolvidas na Automic:</h3>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  {membro['Habilidades'].map((habilidade, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>{habilidade}</li>
                  ))}
                </ul>
              </>
            )}

            <button
              onClick={() => window.history.back()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#FFC300',
                color: '#001330',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Voltar
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}