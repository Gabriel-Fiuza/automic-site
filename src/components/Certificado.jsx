import { useEffect, useState } from 'react';
import { certificados } from '../assets/certificados/certificadosData';
import Footer from './Footer';
import Header from './Header';
import '../styles/index.css';
import CarrosselMidia from './CarrosselMidia';

const DADOS_RESPONSAVEL = {
  razao: 'EMPRESA JÚNIOR DE ENGENHARIA DE CONTROLE E AUTOMAÇÃO DA UNIVERSIDADE FEDERAL DE OURO PRETO',
  cnpj: '25.969.088/0001-85',
  dataHora: '30/06/2025 às 08h34',
};

export default function Certificado() {
  const [codigo, setCodigo] = useState('');
  const [dados, setDados] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [pdfError, setPdfError] = useState(false);

  useEffect(() => {
    // Função para extrair o código do certificado
    const extractCertCode = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.replace('#', '').toUpperCase();
      
      // Caso 1: Rota específica de certificado
      if (path.includes('/certificado') && hash) {
        return hash;
      }
      // Caso 2: Hash na raiz (compatibilidade)
      else if (hash) {
        return hash;
      }
      
      return null;
    };

    // Carrega os dados do certificado
    const loadCertData = () => {
      const cod = extractCertCode();
      if (cod) {
        setCodigo(cod);
        setDados(certificados[cod] || null);
      } else {
        setCodigo('');
        setDados(null);
      }
    };

    // Carrega inicialmente
    loadCertData();

    // Atualiza quando o hash muda
    const handleHashChange = () => loadCertData();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setPdfError(false);
  }, [dados?.pdf]);

  return (
    <div style={{
      minHeight: '100vh',
      background: "url('/Imagem de fundo curso controllogix2.jpg') center/cover no-repeat",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Camada de desfoco */}
      <div id="background" className="cert-blur-bg" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header className="cert-header" />
        <main
  className="main-content certificado-main"
  style={{
    maxWidth: 1300,
    margin: '0 auto',
    padding: '2rem 1rem',
    display: 'flex',
    gap: 32,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row', // fallback para desktop
  }}
>
  {codigo ? (
    dados ? (
      <>
        <div
          className="certificado-pdf-col"
          style={{
            flex: '0 1 800px',
            minWidth: 320,
            maxWidth: 900,
            position: 'relative',
            width: '100%',
          }}
        >
          {/* Botão fixo, sempre absoluto no topo */}
          {isMobile ? (
  <a
    href={dados.pdf}
    target="_blank"
    rel="noopener noreferrer"
    className="cert-link-mobile cert-link-mobile-destaque"
    style={{
      position: 'absolute',
      top: 12,
      left: 12,
      right: 12,
      zIndex: 10,
      background: '#e3f0ff', // azul bem claro
      color: '#1a237e',
      fontWeight: 700,
      fontSize: '1.1rem',
      borderRadius: 8,
      padding: '12px 18px',
      boxShadow: '0 2px 8px #0002',
      textAlign: 'center',
      border: '2px solid #1976d2', // azul médio
      letterSpacing: 0.5,
      textDecoration: 'none',
      display: 'block'
    }}
  >
    Visualize <b>AQUI</b> o certificado
  </a>
) : (
  <a
    href={dados.pdf}
    target="_blank"
    rel="noopener noreferrer"
    className="cert-link"
    style={{
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 10,
    }}
  >
    Abrir em nova aba
  </a>
)}
          <div
            id='div_do_iframe'
            style={{
              width: '100%',
              minHeight: 650,
              height: 650,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              position: 'relative',
            }}
          >
            {(isMobile || pdfError) ? (
              <div className="pdf-placeholder">
                <img
                  src="/pdf-placeholder.png"
                  alt="PDF não pôde ser carregado"
                />
                <p>
                  {pdfError
                    ? 'Não foi possível carregar o PDF neste dispositivo ou navegador.'
                    : 'Caso queira visualizar o certificado direto nesta página visite o link em um computador.'}
                </p>
              </div>
            ) : (
              <iframe
                src={dados.pdf}
                width="100%"
                height="650px"
                className="cert-iframe"
                title="Certificado PDF"
                style={{ display: 'block', minHeight: 650 }}
                onError={() => setPdfError(true)}
              />
            )}
          </div>
          {/* Apenas desktop: */}
          {!isMobile && (
            <a href={dados.pdf} target="_blank" rel="noopener noreferrer" className="cert-link">
              Abrir em nova aba
            </a>
          )}
          {/* Barra de navegação abaixo do PDF */}
          <nav className="cert-nav">
            {/* Botão Download */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button
                className="cert-btn"
                onClick={e => {
                  e.preventDefault();
                  const dropdown = e.currentTarget.nextSibling;
                  if (dropdown) {
                    dropdown.classList.toggle('open');
                  }
                }}
              >
                ⬇️ Download
              </button>
              <div className="cert-dropdown">
                <button
                  className="cert-dropdown-btn"
                  onClick={() => {
                    window.open(dados.pdf, '_blank');
                  }}
                >PDF</button>
                <button
                  className="cert-dropdown-btn"
                  onClick={() => {
                    window.alert(
                      'A opção de download em JPG ainda não está disponível.\n\nPara obter o certificado em imagem, baixe o PDF e utilize o site https://www.ilovepdf.com/pt/pdf_para_jpg para converter.\n\nClique em PDF para baixar.'
                    );
                  }}
                >JPG</button>
              </div>
            </div>
            {/* Botão LinkedIn */}
            <button
              className="cert-btn linkedin"
              onClick={() => {
                const publicPageUrl = `https://automic.vercel.app/certificado#${codigo}`;
                const publicPdfUrl = `https://automic.vercel.app/certificados/${codigo}.pdf`;

                const textoSugestao = `Acabei de concluir o Treinamento de programação e manutenção do Controllogix, rede Ethernet, rede Devicenet e desenvolvimento de Sistema Supervisório em Excel ministrado por Luiz da Matta. Agradeço a Automic Jr.(Empresa Júnior de Engenharia de Controle e Automação da Escola de Minas de Ouro Preto) pelo apoio e organização, e a A3EM(Associação de Antigos Alunos da Escola de Minas) pelo espaço disponibilizado sendo ambas essenciais para melhor aproveitamento do curso. Obrigado também ao Luiz Mata e a Matta Automação. #automação #engenharia #certificado

                Veja meu certificado: ${publicPageUrl}
                Baixe o PDF: ${publicPdfUrl}`;

                if (navigator.clipboard) {
                  navigator.clipboard.writeText(textoSugestao);
                  alert('Texto sugerido copiado! Ao abrir o LinkedIn, cole o texto na publicação.');
                } else {
                  alert('Copie o texto sugerido manualmente:\n' + textoSugestao);
                }
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicPageUrl)}`,
                  '_blank'
                );
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginRight: 6 }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 2.001 3.597 4.601v5.595z"/></svg>
              Compartilhar no LinkedIn
            </button>
            {/* Botão Âncora */}
            <button
              className="cert-btn anchor"
              onClick={() => {
                const el = document.getElementById('conteudo_programático');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              📚 Conteúdo Programático
            </button>
          </nav>
        </div>
        <div
          className="certificado-info-col"
          style={{
            flex: '1 1 0',
            position: 'relative',
            maxWidth: 600,
            minWidth: 320,
            marginLeft: 0,
          }}
        >
          {/* Bloco fixo para dados do responsável e do participante, acima do blur */}
          <div className="cert-card">
            <section style={{ marginBottom: 18 }}>
              <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 8 }}>Dados do responsável pela emissão:</h3>
              <p><b>Data e hora:</b> 30/06/2025 às 08h34</p>
              <p><b>Razão social:</b> EMPRESA JÚNIOR DE ENGENHARIA DE CONTROLE E AUTOMAÇÃO DA UNIVERSIDADE FEDERAL DE OURO PRETO</p>
              <p><b>CNPJ:</b> 25.969.088/0001-85</p>
            </section>
            <section id="infogeral">
              <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 8 }}>Dados informados pela Automic Júnior, emissora do certificado:</h3>
              <b>Nome do(a) {dados.funcao}:</b>
              <p>
                <span style={{ fontSize: '1.45rem', color: '#1a237e', fontWeight: 800, letterSpacing: 1 }}>
                  {dados.nome}
                </span>
              </p>
              <p><b>Curso:</b> {dados.titulo}</p>
              {/* Só mostra o professor/instrutor se não for palestrante (case-insensitive) */}
              {dados.funcao && dados.funcao.toLowerCase() !== 'palestrante' && (
                <p><b>Nome do professor/instrutor:</b> {dados.professor}</p>
              )}
              <p><b>Data de conclusão:</b> {dados.dataRealizacao}</p>
              <p><b>Local de realização:</b> {dados.local}</p>
              <p><b>Carga horária:</b> {dados.cargaHoraria}</p>
              {/* Novo campo: tempo de experiência na área */}
              {dados.tempoExperiencia && (
                <p><b>Tempo de experiência na área:</b> {dados.tempoExperiencia}</p>
              )}
            </section>
          </div>
        </div>

        {/* Nova div para datas e localidade - movida para abaixo dos botões */}
        <div id="datasLocalidades" style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px #0001', marginTop: 18, padding: '18px 22px', width: '100%' }}>
          <p style={{ margin: 0, fontSize: '1.05rem', color: '#222' }}><b>O curso ocorreu nos dias:</b> 17/05/2025, 18/05/2025, 14/06/2025, 15/06/2025 e 29/06/2025</p>
          <p style={{ margin: 0, fontSize: '1.05rem', color: '#222' }}><b>O curso foi realizado na modalidade:</b> Presencial</p>
          <p style={{ margin: 0, fontSize: '1.05rem', color: '#222' }}><b>O curso foi realizado no endereço:</b> Sede da A3EM(Associação dos Antigos Alunos da Escola de Minas) - Rua Henri Gorceix, número 96, em Ouro Preto, Minas Gerais</p>
        </div>


        {/* Bloco: Atividades + SobreA3EM lado a lado, fundo igual, responsivo */}
        <div id="atividades-sobreA3EM-wrapper" className="cert-atividades-wrapper">
          <section
            id="atividades"
            className="cert-section"
            style={{ flex: 2.5, minWidth: 320, minHeight: 600, justifyContent: 'flex-start', maxWidth: '100%' }}
          >
            {/* Carrossel de imagens e vídeos */}
            <div style={{ marginBottom: 16 }}>
              <CarrosselMidia />
            </div>
            <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 12, textAlign: 'left' }}>Descrição das Atividades:</h3>
            <ul style={{ margin: 0, paddingLeft: 0, fontSize: '1rem', display: 'inline-block', textAlign: 'left', minHeight: 260 }}>
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
            className="cert-section center"
            style={{ flex: 1, minWidth: 320 }}
          >
            <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 12 }}>Sobre a A³EM:</h3>
            <p><b>Associação de Antigos Alunos da Escola de Minas:</b> Fundada em 12 de Outubro de 1942 a A³EM vem, desde então, atuando como entidade que promove ações em prol do desenvolvimento acadêmico da Escola de Minas, além de estimular relações de integração entre os profissionais nela formados. Promove, apoia e realiza eventos (sessões solenes, palestras, simpósios, encontros, publicações, confraternizações, ). Mantém estreito intercâmbio com as Sociedades de Ex-Alunos da Escola de Minas de Ouro Preto (SEMOP´s) sediadas em várias cidades do país.</p>
            <p>É uma entidade sem fins lucrativos filiada à Federação Brasileira de Associações de Engenheiros (FEBRAE) com representação no CREA. Está sediada na Rua Henri Gorceix, no. 96 , em Ouro Preto – MG, imóvel onde residiu, por quinze anos, o fundador e primeiro Diretor da Escola de Minas – Professor Claude-Henri Gorceix. O quadro de associados da A³EM é formado por efetivos, cooperadores, honorários e contribuintes.</p>
          </section>
        </div>

        {/* Conteúdo Programático abaixo, mesma cor de fundo */}
        <section id="conteudo_programático" className="cert-program">
          <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 12 }}>Conteúdo Programático da Primeira Apostila (Total: 4)</h3>
          <ul className="cert-list">
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
            <li>Módulo 25: Criando os Tags Alias for Baseado Na Lista de Mnemônicos de I/O</li>
            <li>Módulo 26: Premissas para Programar Equipamentos</li>
            <li>Módulo 27: Forces em Programas</li>
            <li>Módulo 28: Consideração ao Utilizar a Função Force</li>
            <li>Módulo 29: Como Utilizar a Função Force</li>
            <li>Módulo 30: Programação da TC01</li>
            <li>Módulo 31: Trabalhando os Recursos</li>
            <li>Módulo 32: Criando um Segundo Equipamento</li>
            <li>Módulo 33: Utilizando Bloco Add ON</li>
            <li>Módulo 34: Teoria da Programação FBD</li>
            <li>Módulo 35: Ativando Rotinas</li>
            <li>Módulo 36: Download e Upload de Programas</li>
            <li>Módulo 37: Recursos de Navegação do Software Logix5000/Studio 5000</li>
            <li>Módulo 38: Diagnóstico do Controlador e Módulos</li>
            <li>Módulo 39: Tratamento do Sinal Analógico (Entrada e Saída)</li>
            <li>Módulo 40: Módulos Analógicos e Digitais</li>
            <li>Módulo 41: Emulador</li>
            <li>Módulo 42: Utilização da Função SSV/GSV</li>
            <li>Módulo 43: Comunicação entre Controladores (Produtor/Consumidor)</li>
            <li>Módulo 44: Comunicação entre Controladores ControlLogix via MSG</li>
            <li>Módulo 45: Comunicação entre Controladores ControlLogix e CompactLogix via MSG</li>
            <li>Módulo 46: Conceitos Básicos do PID</li>
            <li>Módulo 47: Usando ControlFlash</li>
            <li>Módulo 48: Teste Final</li>
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
