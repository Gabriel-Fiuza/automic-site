import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

import Header from './Header';
import Footer from './Footer';

export default function MembroDetalhado() {
  const { id } = useParams(); // Obtém o ID do membro a partir da URL
  
  // 2. Criamos os estados para guardar os dados e o controle de carregamento
  const [membro, setMembro] = useState(null);
  const [loading, setLoading] = useState(true);

  // Força o scroll para o topo e busca os dados
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchMembro = async () => {
      setLoading(true);
      try {
        // Referência direta ao documento usando o ID da URL (ex: "matheus-baldez")
        const docRef = doc(db, 'membros', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMembro(docSnap.data()); // Achou o membro!
        } else {
          setMembro(null); // Documento não existe
        }
      } catch (error) {
        console.error("Erro ao buscar membro:", error);
        setMembro(null);
      } finally {
        setLoading(false); // Terminou de carregar
      }
    };

    if (id) {
      fetchMembro();
    }
  }, [id]); // O useEffect vai rodar de novo se o ID da URL mudar

  // 3. Telas de feedback (Carregando ou Não encontrado)
  if (loading) {
    return (
      <>
        <Header />
        <section style={{ padding: '2rem', backgroundColor: '#001330', minHeight: '100vh', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Carregando dados do membro...</h2>
        </section>
        <Footer />
      </>
    );
  }

  if (!membro) {
    return (
      <>
        <Header />
        <section style={{ padding: '2rem', backgroundColor: '#001330', minHeight: '100vh', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Membro não encontrado na base de dados.</h2>
        </section>
        <Footer />
      </>
    );
  }

  // 4. Renderização com os dados da nuvem
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
            backgroundColor: '#002244',
            padding: '2rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Imagem do membro */}
          <img
            src={membro.foto}
            alt={membro.nome}
            style={{
              maxWidth: '100%',
              maxHeight: '450px',
              height: 'auto',
              objectFit: 'cover',
              border: '4px solid #FFC300',
            }}
          />

          {/* Informações do membro */}
          <div style={{ maxWidth: '600px', textAlign: 'left' }}>
            <h2 style={{ marginBottom: '1rem' }}>{membro.nome}</h2>
            <p style={{ marginBottom: '0.5rem' }}><b>Diretoria:</b> {membro.diretoria}</p>
            <p style={{ marginBottom: '0.5rem' }}><b>Cargo:</b> {membro.cargo}</p>
            <p style={{ marginBottom: '0.5rem' }}><b>Início:</b> {membro.inicio}</p>
            
            {/* Renderiza o resumo com proteção caso o array esteja vazio ou não exista */}
            {(membro.resumo || []).map((paragrafo, index) => (
              <p key={index} style={{ marginBottom: '1rem' }}>{paragrafo}</p>
            ))}

            {/* Renderiza habilidades técnicas */}
            {membro['Habilidades'] && membro['Habilidades'].length > 0 && (
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
              className="btn-linkedin"
              onClick={() => {
                 if(membro.linkedin) {
                    window.open(membro.linkedin, '_blank');
                 } else {
                    alert("Este membro ainda não adicionou o LinkedIn.");
                 }
              }}
              style={{
                marginRight: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#0077b5',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '1rem',
                marginLeft: '0.5rem',
                fontSize: '1rem',
              }}
            >
              LinkedIn
            </button>
            <button
              className="btn-email"
              onClick={() => {
                 if(membro.email) {
                    window.location.href = `mailto:${membro.email}`;
                 } else {
                    alert("E-mail não disponível.");
                 }
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#d93025',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '1rem',
                marginLeft: '0.5rem',
              }}
            >
              Email
            </button>
            <button
              onClick={() => window.history.back()}
              style={{
                padding: '0.5rem 1rem ',
                backgroundColor: '#FFC300',
                color: '#000000ff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '1rem',
                marginLeft: '0.5rem',
                fontSize: '1rem',
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