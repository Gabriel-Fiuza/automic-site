import React, { useState, useEffect, useRef } from 'react';
import '../styles/Cursos.css';

function generateRealFeedbacks() {
  return [
    {
      text:
        'Avaliação Geral do Treinamento:\n' +
        'Qualidade Geral: Média de 8.9 (escala de 0 a 10)\n' +
        'Estrutura e Organização: Média de 9.5 (escala de 0 a 10)',
      author: 'Resultado Agregado'
    },
    {
      text:
        'Avaliação de Aspectos Específicos do Treinamento (Escala de 1 a 5):\n' +
        'Facilidade de Entendimento: Média de 4.9\n' +
        'Organização e Estrutura: Média de 4.5\n' +
        'Adequação ao Nível de Conhecimento: Média de 4.7\n' +
        'Horário e Duração: Média de 4.9\n' +
        'Cronograma de Aulas: Média de 4.6',
      author: 'Aspectos Específicos'
    },
    {
      text:
        'Material Didático:\n' +
        'Clareza e Objetividade: Média de 4.4\n' +
        'Atualização e Coerência: Média de 4.5\n' +
        'Atendimento às Necessidades: Média de 4.7',
      author: 'Material Didático'
    },
    {
      text:
        'Expectativas Profissionais: Média de 4.8\n' +
        'Recomendação do Curso: 100% dos participantes recomendariam o curso para outros profissionais.',
      author: 'Impacto e Recomendação'
    }
  ];
}

function FeedbackCarousel({ feedbacks = [], interval = 3000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (!feedbacks || feedbacks.length <= 1) return () => (mounted.current = false);
    const tick = () => setIndex((i) => (i + 1) % feedbacks.length);
    const id = setInterval(() => { if (!paused && mounted.current) tick(); }, interval);
    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, [feedbacks, interval, paused]);

  if (!feedbacks || feedbacks.length === 0) return null;

  return (
    <div
      className="feedback-carousel"
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {feedbacks.map((f, i) => (
        <div key={i} className={`feedback-slide ${i === index ? 'active' : ''}`} aria-hidden={i !== index}>
          <blockquote>{f.text}</blockquote>
          <cite>{f.author}</cite>
        </div>
      ))}

      <div className="feedback-dots" role="presentation" aria-hidden="false">
        {feedbacks.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            role="presentation"
            aria-hidden="true"
            title={i === index ? `Feedback ${i + 1} (ativo)` : `Feedback ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function MetricsGrid({ metrics = [], recommendation }) {
  return (
    <div className="metrics-wrap" aria-hidden={metrics.length === 0}>
      <div className="metrics-grid" role="list">
        {metrics.map((m) => (
          <div key={m.label} className="metric-card" role="listitem">
            <div className="metric-value">{m.value}</div>
            <div className="metric-label">{m.label}</div>
          </div>
        ))}
      </div>
      {recommendation && <div className="recommendation" aria-live="polite">{recommendation}</div>}
    </div>
  );
}

export default function Cursos() {
  const [openId, setOpenId] = useState(null);
  const panelRefs = useRef({});

  const aggregatedMetrics = {
    geral: { label: 'Qualidade Geral (0-10)', value: '8.9' },
    estrutura: { label: 'Estrutura e Organização (0-10)', value: '9.5' },
    entendimento: { label: 'Facilidade de Entendimento (1-5)', value: '4.9/5⭐' },
    material_clareza: { label: 'Material - Clareza (1-5)', value: '4.4/5⭐' },
    recomendacao: '100% dos participantes recomendariam o curso'
  };

  const toggle = (id) => {
    const prevId = openId;
    const nextId = prevId === id ? null : id;

    if (prevId && panelRefs.current[prevId]) {
      panelRefs.current[prevId].classList.remove('expanded');
    }

    if (nextId && panelRefs.current[nextId]) {
      panelRefs.current[nextId].classList.add('expanded');
    }

    setOpenId(nextId);
  };

  const setPanelRef = (id) => (el) => {
    if (el) {
      panelRefs.current[id] = el;
      if (openId === id) {
        el.classList.add('expanded');
      } else {
        el.classList.remove('expanded');
      }
    } else {
      delete panelRefs.current[id];
    }
  };

  const cursos = [
    {
      id: 1,
      titulo: 'Curso de Automação Industrial',
      parceria: 'Matta Automação e A3EM',
      descricao: 'Aprenda os fundamentos da automação industrial com práticas reais.',
      detalhes: [
        'Introdução à automação industrial',
        'Configuração de CLPs (Controladores Lógicos Programáveis)',
        'Redes industriais: Ethernet e DeviceNet',
        'Programação de sistemas supervisórios',
        'Exercícios práticos com equipamentos reais',
      ],
      data: '01 de novembro de 2025',
      local: 'Sede da A3EM, Ouro Preto/MG',
      cargaHoraria: '40 horas',
      instrutor: 'Luiz da Matta',
      imagem: '/foto7carrossel.jpg',
    },
    {
      id: 2,
      titulo: 'Curso de Programação Web',
      parceria: 'Start Carreiras',
      descricao: 'Domine a programação web com foco em desenvolvimento front-end.',
      data: 'A confirmar',
      local: 'Escola de Minas - UFOP, Ouro Preto/MG',
      imagem: '/Icons/designer-de-web.png',
    },
    {
      id: 3,
      titulo: 'Curso de Redes Industriais',
      parceria: 'Matta Automação',
      descricao: 'Entenda como configurar e gerenciar redes industriais.',
      data: 'A confirmar',
      local: 'Sede da A3EM, Ouro Preto/MG',
      imagem: '/Icons/industria-40.png',
    },
  ];

  return (
    <section className="cursos-section">
      <header className="cursos-header">
        <h1>Cursos Automic Jr. e Parceiros</h1>
        <p className="frase-efeito">
          Transforme seu futuro com conhecimento prático e inovador. Descubra o poder dos nossos cursos!
        </p>
      </header>

      <div className="cursos-content">
        {cursos.map((curso, index) => {
          const isOpen = openId === curso.id;
          const isFeedbackCourse = curso.id === 1; // apenas o primeiro curso tem feedbacks
          const feedbacks = isFeedbackCourse && isOpen ? generateRealFeedbacks() : [];

          return (
            <article
              key={curso.id}
              className={`curso-item ${index % 2 === 0 ? 'left' : 'right'}`}
              aria-expanded={isOpen}
            >
              <div className="curso-main">
                <div className="curso-meta">
                  <h3 className="curso-title">{curso.titulo}</h3>
                  <p className="curso-parceria"><strong>Parceria:</strong> {curso.parceria}</p>
                  <p className="curso-desc">{curso.descricao}</p>
                </div>

                <div className="curso-actions">
                  <button
                    className="curso-button secondary"
                    onClick={() => toggle(curso.id)}
                    aria-controls={`detalhes-${curso.id}`}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? 'Fechar' : 'Saiba mais'}
                  </button>
                  <button
                    className="curso-button primary"
                    onClick={() => { /* ação de solicitar (placeholder) */ }}
                  >
                    Solicitar Curso
                  </button>
                </div>
              </div>

              <div
                id={`detalhes-${curso.id}`}
                ref={setPanelRef(curso.id)}
                className={`expanded-panel ${isOpen ? 'expanded' : ''}`}
                aria-hidden={!isOpen}
              >
                <div className="expanded-inner">
                  <div className="expanded-top">
                    <img
                      src={curso.imagem}
                      alt={`${curso.titulo} imagem`}
                      className="expanded-image"
                      loading="lazy"
                      decoding="async"
                      width="220"
                      height="140"
                    />
                    <div className="expanded-info">
                      <p><strong>Próximo curso:</strong> {curso.data}</p>
                      {curso.local && <p><strong>Local:</strong> {curso.local}</p>}
                      {curso.cargaHoraria && <p><strong>Carga horária:</strong> {curso.cargaHoraria}</p>}
                      {curso.instrutor && <p><strong>Instrutor:</strong> {curso.instrutor}</p>}
                      {curso.detalhes && (
                        <ul>
                          {curso.detalhes.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {isFeedbackCourse && isOpen && (
                    <div className="feedback-row" aria-live="polite">
                      <MetricsGrid
                        metrics={[
                          aggregatedMetrics.geral,
                          aggregatedMetrics.estrutura,
                          aggregatedMetrics.entendimento,
                          aggregatedMetrics.material_clareza
                        ]}
                        recommendation={aggregatedMetrics.recomendacao}
                      />

                      <h4 className="feedback-title">Detalhes da Avaliação</h4>
                      <FeedbackCarousel feedbacks={feedbacks} />
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}