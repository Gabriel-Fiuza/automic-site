import { useEffect, useState } from 'react';
import { certificados } from '../assets/certificados/certificadosData';
import Footer from './Footer';
import Header from './Header';
import '../styles/index.css';

const DADOS_RESPONSAVEL = {
  razao: 'EMPRESA JÚNIOR DE ENGENHARIA DE CONTROLE E AUTOMAÇÃO DA UNIVERSIDADE FEDERAL DE OURO PRETO',
  cnpj: '25.969.088/0001-85',
  dataHora: '23/06/2025 às 20h34',
};

export default function Certificado() {
  const [codigo, setCodigo] = useState('');
  const [dados, setDados] = useState(null);

  useEffect(() => {
    if (window.location.hash) {
      const cod = window.location.hash.replace('#', '').toUpperCase();
      setCodigo(cod);
      setDados(certificados[cod] || null);
    } else {
      setCodigo('');
      setDados(null);
    }
    // Atualiza ao mudar o hash
    const onHashChange = () => {
      const cod = window.location.hash.replace('#', '').toUpperCase();
      setCodigo(cod);
      setDados(certificados[cod] || null);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: "url('/Imagem de fundo curso controllogix2.jpg') center/cover no-repeat",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Camada de desfoco */}
      <div style={{
        position: 'fixed',
        zIndex: 0,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backdropFilter: 'blur(12px) brightness(0.85)',
        WebkitBackdropFilter: 'blur(12px) brightness(0.85)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header className="cert-header" />
        <main className="main-content" style={{ maxWidth: 1300, margin: '0 auto', padding: '2rem 1rem', display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {codigo ? (
          dados ? (
            <>
              <div style={{ flex: '0 1 800px', minWidth: 320, maxWidth: 900, position: 'relative' }}>
                <iframe
                  src={dados.pdf}
                  width="100%"
                  height="650px"
                  style={{ minHeight: 600, height: 650, border: 'none', borderRadius: 8, boxShadow: '0 2px 8px #0001', background: '#f2f2f2', display: 'block' }}
                  title="Certificado PDF"
                />
                <a href={dados.pdf} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: 12, right: 12, background: 'var(--azul-escuro)', color: 'white', padding: '6px 14px', borderRadius: 6, textDecoration: 'none', fontSize: 14, boxShadow: '0 1px 4px #0002' }}>Abrir em nova aba</a>
                {/* Barra de navegação abaixo do PDF */}
                <nav style={{
                  width: '100%',
                  maxWidth: 900,
                  margin: '0 auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.97)',
                  borderRadius: '0 0 8px 8px',
                  boxShadow: '0 2px 8px #0001',
                  padding: '0.5rem 1.5rem',
                  gap: 16,
                  position: 'relative',
                  top: 0,
                  zIndex: 2,
                }}>
                  {/* Botão Download */}
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button
                      style={{
                        background: 'var(--azul-escuro)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 6,
                        padding: '8px 18px',
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                      onClick={e => {
                        e.preventDefault();
                        const dropdown = e.currentTarget.nextSibling;
                        if (dropdown) {
                          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                        }
                      }}
                    >
                      ⬇️ Download
                    </button>
                    <div
                      style={{
                        display: 'none',
                        position: 'absolute',
                        left: 0,
                        top: '110%',
                        background: 'white',
                        border: '1px solid #ddd',
                        borderRadius: 6,
                        boxShadow: '0 2px 8px #0002',
                        minWidth: 120,
                        zIndex: 10,
                      }}
                    >
                      <button
                        style={{ width: '100%', background: 'none', border: 'none', padding: '8px', cursor: 'pointer', textAlign: 'left' }}
                        onClick={() => {
                          window.open(dados.pdf, '_blank');
                        }}
                      >PDF</button>
                      <button
                        style={{ width: '100%', background: 'none', border: 'none', padding: '8px', cursor: 'pointer', textAlign: 'left' }}
                        onClick={() => {
                          if (dados.jpg) {
                            window.open(dados.jpg, '_blank');
                          } else {
                            alert('Arquivo JPG não disponível.');
                          }
                        }}
                      >JPG</button>
                    </div>
                  </div>
                  {/* Botão LinkedIn */}
                  <button
                    style={{
                      background: '#0077b5',
                      color: 'white',
                      border: 'none',
                      borderRadius: 6,
                      padding: '8px 18px',
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                    onClick={() => {
                      const url = window.location.href;
                      const summary = encodeURIComponent(
                        'Acabei de concluir o Treinamento de programação e manutenção do Controllogix, rede Ethernet, rede Devicenet e desenvolvimento de Sistema Supervisório em Excel ministrado por Luiz da Matta. Agradeço a Automic Jr.(Empresa Júnior de Engenharia de Controle e Automação da Escola de Minas de Ouro Preto) pelo apoio e organização, e a A3EM(Associação de Antigos Alunos da Escola de Minas) pelo espaço disponibilizado sendo ambas essenciais para melhor aproveitamento do curso. Obrigado também ao Luiz Mata e a Matta Automação. #automação #engenharia #certificado\n' + url
                      );
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${summary}`,
                        '_blank'
                      );
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginRight: 6 }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 2.001 3.597 4.601v5.595z"/></svg>
                    Compartilhar no LinkedIn
                  </button>
                  {/* Botão Âncora */}
                  <button style={{
                    background: 'var(--azul-escuro)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 18px',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                    onClick={() => {
                      const el = document.getElementById('conteudo_programático');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    📚 Conteúdo Programático
                  </button>
                </nav>
              </div>
              <div style={{ flex: 1, minWidth: 320, lineHeight: 1.5 }}>
                {/* Bloco fixo para dados do responsável e do participante, acima do blur */}
                <div style={{
                  background: 'rgba(255,255,255,0.97)',
                  borderRadius: 10,
                  boxShadow: '0 2px 8px #0002',
                  padding: '1.5rem 2rem',
                  marginBottom: 24,
                  position: 'relative',
                  zIndex: 10,
                  maxWidth: 600,
                  lineHeight: 1.8,
                }}>
                  <section style={{ marginBottom: 18 }}>
                    <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 8 }}>Dados do responsável pela emissão:</h3>
                    <p><b>Data e hora:</b> 23/06/2025 às 20h34</p>
                    <p><b>Razão social:</b> EMPRESA JÚNIOR DE ENGENHARIA DE CONTROLE E AUTOMAÇÃO DA UNIVERSIDADE FEDERAL DE OURO PRETO</p>
                    <p><b>CNPJ:</b> 25.969.088/0001-85</p>
                  </section>
                  <section id="infogeral">
                    <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 8 }}>Dados informados pelo emissor do certificado:</h3>
                    <b>Nome do participante/aluno:</b>
                    <p>
                      <span style={{ fontSize: '1.45rem', color: '#1a237e', fontWeight: 800, letterSpacing: 1 }}>{'Matheus Henrique da Costa Baldez'}</span>
                    </p>
                    <p><b>Curso:</b>  Especialização Técnica do Sistema ControlLogix e Redes Industriais, com ênfase prática em DeviceNet e desenvolvimento supervisório Excel.</p>
                    <p><b>Nome do professor/instrutor:</b> Luiz da Matta</p>
                    <p><b>Data de realização:</b> 29 de junho de 2025</p>
                    <p><b>Local de realização:</b> Ouro Preto/MG</p>
                    <p><b>Carga horária:</b> 40 horas</p><br />
                    <p><b>O curso ocorreu nos dias:</b> 17/05/2025, 18/05/2025, 14/06/2025, 15/06/2025 e 29/06/2025</p>
                    <p><b>O curso foi realizado na modalidade:</b> Presencial</p>
                    <p><b>O curso foi realizado no endereço:</b> Sede da A3EM(Associação dos Antigos Alunos da Escola de Minas) - Rua Henri Gorceix, número 96, em Ouro Preto, Minas Gerais </p>
                  </section>
                </div>
              </div>


              {/* Bloco: Atividades + SobreA3EM lado a lado, fundo igual, responsivo */}
              <div id="atividades-sobreA3EM-wrapper" style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 32,
                maxWidth: 1200,
                margin: '32px auto 0 auto',
                justifyContent: 'center',
                alignItems: 'stretch',
              }}>
                <section
                  id="atividades"
                  style={{
                    flex: 2,
                    minWidth: 320,
                    background: 'var(--cinza-claro)',
                    borderRadius: 8,
                    boxShadow: '0 1px 4px #0001',
                    padding: '2rem',
                    lineHeight: 1.6,
                    marginBottom: 0,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                  }}
                >
                  <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Vídeo de exemplo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ marginBottom: 16, borderRadius: 8, boxShadow: '0 1px 4px #0002' }}
                  ></iframe>
                  <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 12, textAlign: 'left' }}>Descrição das Atividades:</h3>
                  <ul style={{ margin: 0, paddingLeft: 0, fontSize: '1rem', display: 'inline-block', textAlign: 'left' }}>
                    <li>Instalação e configuração de ambientes de desenvolvimento.</li>
                    <li>Programação de controladores ControlLogix.</li>
                    <li>Configuração de redes Ethernet e DeviceNet.</li>
                    <li>Desenvolvimento de telas supervisórias no Excel.</li>
                    <li>Exercícios práticos de automação industrial.</li>
                    <li>Parametrização de inversores de frequência.</li>
                    <li>Simulações de operação de sistemas industriais utilizando o emulador.</li>
                    <li>Diagnóstico e manutenção de módulos e controladores.</li>
                    <li>Treinamento em manutenção de sistemas de automação.</li>
                  </ul>
                </section>
                <section
                  id="sobreA3EM"
                  style={{
                    flex: 1,
                    minWidth: 320,
                    background: 'var(--cinza-claro)',
                    borderRadius: 8,
                    boxShadow: '0 1px 4px #0001',
                    padding: '2rem',
                    lineHeight: 1.6,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 12 }}>Sobre a A³EM:</h3>
                  <p><b>Sobre a A³EM:</b> Fundada em 12 de Outubro de 1942 a A³EM vem, desde então, atuando como entidade que promove ações em prol do desenvolvimento acadêmico da Escola de Minas, além de estimular relações de integração entre os profissionais nela formados. Promove, apoia e realiza eventos (sessões solenes, palestras, simpósios, encontros, publicações, confraternizações, ). Mantém estreito intercâmbio com as Sociedades de Ex-Alunos da Escola de Minas de Ouro Preto (SEMOP´s) sediadas em várias cidades do país.</p>
                  <p>É uma entidade sem fins lucrativos filiada à Federação Brasileira de Associações de Engenheiros (FEBRAE) com representação no CREA. Está sediada na Rua Henri Gorceix, no. 96 , em Ouro Preto – MG, imóvel onde residiu, por quinze anos, o fundador e primeiro Diretor da Escola de Minas – Professor Claude-Henri Gorceix. O quadro de associados da A³EM é formado por efetivos, cooperadores, honorários e contribuintes.</p>
                </section>
              </div>

              {/* Conteúdo Programático abaixo, mesma cor de fundo */}
              <section id="conteudo_programático" style={{
                maxWidth: 1200,
                margin: '32px auto 0 auto',
                background: 'var(--cinza-claro)',
                borderRadius: 8,
                boxShadow: '0 1px 4px #0001',
                padding: '2rem',
                lineHeight: 2.1,
                minHeight: 320,
              }}>
                <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 12 }}>Conteúdo Programático</h3>
                <ul style={{ margin: 0, paddingLeft: 24, columns: 2, columnGap: 32, fontSize: '1rem' }}>
                  <li>Módulo 1: Apresentação</li>
                  <li>Módulo 2: Instalação da Máquina Virtual</li>
                  <li>Módulo 3: Ethernet</li>
                  <li>Módulo 4: Detalhes da Plataforma de Teste</li>
                  <li>Módulo 5: Início da Automação Industrial</li>
                  <li>Módulo 6: RSLinx</li>
                  <li>Módulo 7: Conceitos de um CLP</li>
                  <li>Módulo 8: Sistema de Numeração</li>
                  <li>Módulo 9: Exercícios</li>
                  <li>Módulo 10: Instrumentação Básica</li>
                  <li>Módulo 11: Características do ControlLogix</li>
                  <li>Módulo 12: Configuração de um Projeto</li>
                  <li>Módulo 13: Configuração do Controlador para um Novo Projeto</li>
                  <li>Módulo 14: Configuração do Rack Remoto</li>
                  <li>Módulo 15: Configuração do Inversor de Frequência PowerFlex 40 na Ethernet</li>
                  <li>Módulo 16: Parametrização do Inversor de Frequência PowerFlex 40</li>
                  <li>Módulo 17: Download de Dispositivos no site da Rockwell</li>
                  <li>Módulo 18: Explorando o Controller Tags</li>
                  <li>Módulo 19: Detalhes dos Módulos Instalados</li>
                  <li>Módulo 20: Criando a Primeira Tarefa</li>
                  <li>Módulo 21: Criando os Arquivos</li>
                  <li>Módulo 22: Configurando User Defined para Típicos de Equipamentos</li>
                  <li>Módulo 23: Blocos Avançados de Programação</li>
                  <li>Módulo 24: Criando o Primeiro Equipamento no Controller Tags</li>
                  <li>Módulo 25: Criando os Tags Alias for Baseado na Lista de Mnemônicos de I/O</li>
                  <li>Módulo 26: Premissas para Programar Equipamentos</li>
                  <li>Módulo 27: Forces em Programas</li>
                  <li>Módulo 28: Consideração ao Utilizar a Função Force</li>
                  <li>Módulo 29: Como Utilizar a Função Force</li>
                  <li>Módulo 30: Programação da TC01</li>
                  <li>Módulo 31: Trabalhando os Recursos</li>
                  <li>Módulo 32: Criando um Segundo Equipamento</li>
                  <li>Módulo 34: Utilizando Bloco Add ON</li>
                  <li>Módulo 35: Teoria da Programação FBD</li>
                  <li>Módulo 36: Ativando Rotinas</li>
                  <li>Módulo 37: Download e Upload de Programas</li>
                  <li>Módulo 38: Recursos de Navegação do Software Logix5000/Studio 5000</li>
                  <li>Módulo 39: Diagnóstico do Controlador e Módulos</li>
                  <li>Módulo 40: Tratamento do Sinal Analógico (Entrada e Saída)</li>
                  <li>Módulo 41: Módulos Analógicos e Digitais</li>
                  <li>Módulo 42: Emulador</li>
                  <li>Módulo 43: Utilização da Função SSV/GSV</li>
                  <li>Módulo 44: Comunicação entre Controladores (Produtor/Consumidor)</li>
                  <li>Módulo 45: Comunicação entre Controladores ControlLogix via MSG</li>
                  <li>Módulo 46: Comunicação entre Controladores ControlLogix e CompactLogix via MSG</li>
                  <li>Módulo 47: Conceitos Básicos do PID</li>
                  <li>Módulo 48: Usando ControlFlash</li>
                  <li>Módulo 49: Teste Final</li>
                </ul>
              </section>
              
            </>
          ) : (
            <div style={{ color: 'crimson', textAlign: 'center', marginTop: 40 }}>
              <h2>Certificado não encontrado!</h2>
              <p>O código informado não corresponde a nenhum certificado válido.</p>
            </div>
          )
        ) : (
          <div style={{ color: '#555', textAlign: 'center', marginTop: 40 }}>
            <h2>Informe o código do certificado na URL</h2>
            <p>Exemplo: /certificado#SEUCODIGO</p>
          </div>
        )}
        </main>
        <Footer id="footer" />
      </div>
    </div>
  );
}
