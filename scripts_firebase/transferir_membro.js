import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

import '../styles/AboutSection.css';

export default function AboutSection() {
  const [filtroCargo, setFiltroCargo] = useState('');
  const [filtroPeriodo, setFiltroPeriodo] = useState('');
  const navigate = useNavigate();

  const [membrosData, setMembrosData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembros = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "membros"));
        const membrosFetch = {};
        querySnapshot.forEach((doc) => {
          membrosFetch[doc.id] = doc.data();
        });
        setMembrosData(membrosFetch);
      } catch (error) {
        console.error("Erro ao buscar a equipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembros();
  }, []);

  const membrosFiltrados = Object.entries(membrosData).filter(([id, membro]) => {
    const porCargo = filtroCargo ? membro.cargo.toLowerCase().includes(filtroCargo.toLowerCase()) : true;
    const porPeriodo = filtroPeriodo ? membro.inicio === filtroPeriodo : true;
    return porCargo && porPeriodo;
  });

  const diretorias = ['Diretoria de Presidência', 'Diretoria de Gestão Estratégica', 'Diretoria de Mercado', 'Diretoria de Projetos'];
  
  // MUDANÇA AQUI: Filtramos e ordenamos para que o Diretor fique sempre em primeiro
  const membrosPorDiretoria = diretorias.map((diretoria) => {
    const membrosDaDiretoria = membrosFiltrados.filter(([id, membro]) => membro.diretoria === diretoria);
    
    membrosDaDiretoria.sort((a, b) => {
      const cargoA = a[1].cargo.toLowerCase();
      const cargoB = b[1].cargo.toLowerCase();
      
      const isDiretorA = cargoA.includes('diretor');
      const isDiretorB = cargoB.includes('diretor');

      if (isDiretorA && !isDiretorB) return -1; // 'a' sobe na lista
      if (!isDiretorA && isDiretorB) return 1;  // 'b' sobe na lista
      return 0; // Se os dois forem gestores ou os dois diretores, mantém a ordem
    });

    return {
      diretoria,
      membros: membrosDaDiretoria,
    };
  });

  return (
    <section className="about-section">
      <div id="about-container">
        <h2 id="sobreTitulo">Sobre a Automic Jr.</h2>
        <p>A Automic Jr. é a Empresa Júnior em Engenharia de Controle e Automação da Universidade Federal de Ouro Preto (UFOP), fundada em 2016. Nosso propósito é desenvolver soluções inovadoras e de alto impacto, ao mesmo tempo em que capacitamos nossos membros para o mercado de trabalho.</p>
        <p>Somos parte do Movimento Empresa Júnior (MEJ), um dos maiores movimentos de empreendedorismo universitário do mundo, que promove a excelência e o impacto social através de projetos reais.</p>
        
        <div id="sobreCards">
          <card className="card-padrao">
            <cardHeader>
              <img src="Icons/missao.png" alt="Imagem representativa" />
              <h3>Nossa Missão</h3>
            </cardHeader>
            <p>Contribuir com a população de Ouro Preto e Região por meio de soluções em automação e formar profissionais capazes de fazer a diferença no mundo.</p>
          </card>

          <card className="card-padrao">
            <cardHeader>
              <img src="Icons/lampada-de-ideia.png" alt="Imagem representativa" />
              <h3>Nossa Visão</h3>
            </cardHeader>
            <p>Ser uma empresa autossuficiente, consolidada e que investe na vivência empresarial e práticas de seus membros.</p>
          </card>

          <card className="card-padrao">
            <cardHeader>
              <img src="Icons/valores.png" alt="Imagem representativa" />
              <h3>Nossos Valores</h3>
            </cardHeader>
            <p>Inovação, qualidade, colaboração, compromisso com a excelência técnica, desenvolvimento pessoal e impacto social.</p>
          </card>
        </div>
      </div>

      <div className='equipe-header' id='waveNossaEquipe'>
        <h1>Nossa Equipe</h1>
        <div className="wave-line"></div>
        <p>Conheça os talentos que fazem a Automic Jr. acontecer </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#fff' }}>
          <h2>Carregando equipe...</h2>
        </div>
      ) : (
        membrosPorDiretoria.map(({ diretoria, membros }) => (
          membros.length > 0 && (
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
                        onClick={(e) => {
                          e.stopPropagation();
                          if(membro.linkedin) window.open(membro.linkedin, '_blank');
                        }}
                      >
                        LinkedIn
                      </button>
                      <button
                        className="btn-email"
                        onClick={(e) => {
                          e.stopPropagation();
                          if(membro.email) window.location.href = `mailto:${membro.email}`;
                        }}
                      >
                        Email
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))
      )}
    </section>
  );
}