import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase'; 

import Footer from './Footer';
import Header from './Header';
import '../styles/index.css';
import '../styles/Certificado.css';
import CarrosselMidia from './CarrosselMidia';

const DADOS_RESPONSAVEL = {
  razao: 'EMPRESA JÚNIOR DE ENGENHARIA DE CONTROLE E AUTOMAÇÃO DA UNIVERSIDADE FEDERAL DE OURO PRETO',
  cnpj: '25.969.088/0001-85',
};

export default function Certificado() {
  const [codigo, setCodigo] = useState('');
  const [dados, setDados] = useState(null);
  const [detalhesCurso, setDetalhesCurso] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [pdfError, setPdfError] = useState(false);

  useEffect(() => {
    const extractCertCode = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.replace('#', '').toUpperCase();
      if (path.includes('/certificado') && hash) return hash;
      else if (hash) return hash;
      return null;
    };

    const loadCertData = async () => {
      const cod = extractCertCode();
      if (cod) {
        setCodigo(cod);
        setLoading(true); 
        
        try {
          const docRef = doc(db, "certificados", cod);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const certData = docSnap.data();
            setDados(certData); 

            if (certData.cursoId) {
              const cursoRef = doc(db, "detalhes_cursos", certData.cursoId);
              const cursoSnap = await getDoc(cursoRef);
              if (cursoSnap.exists()) {
                setDetalhesCurso(cursoSnap.data());
              }
            }
          } else {
            setDados(null); 
            setDetalhesCurso(null);
          }
        } catch (error) {
          console.error("Erro ao buscar dados no Firebase:", error);
          setDados(null);
          setDetalhesCurso(null);
        } finally {
          setLoading(false); 
        }
      } else {
        setCodigo('');
        setDados(null);
        setDetalhesCurso(null);
      }
    };

    loadCertData();

    const handleHashChange = () => loadCertData();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    setPdfError(false);
  }, [dados?.pdf]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--azul-escuro)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header className="cert-header" />
        
        <main className="certificado-main">
          {loading ? (
            <div className="cert-loading">
              <h2>Buscando certificado na base de dados...</h2>
              <p>Por favor, aguarde um instante.</p>
            </div>
          ) : codigo ? (
            dados && detalhesCurso ? (
              <>
                {/* COLUNA ESQUERDA: PDF, NAVEGAÇÃO E CAIXA DE DATAS */}
                <div className="certificado-pdf-col">
                  
                  {/* MUDANÇA AQUI: Renderiza o PDF para todos (Mobile e Desktop) */}
                  <div className="cert-iframe-wrapper">
                    <a href={dados.pdf} target="_blank" rel="noopener noreferrer" className="cert-link-external">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      Abrir PDF
                    </a>
                    
                    {pdfError ? (
                      <div className="pdf-placeholder">
                        <img src={detalhesCurso.pdfPlaceholder} alt="PDF não pôde ser carregado" />
                        <p>Seu navegador bloqueou a pré-visualização. Clique no botão "Abrir PDF" acima.</p>
                      </div>
                    ) : (
                      <iframe src={dados.pdf} className="cert-iframe" title="Certificado PDF" onError={() => setPdfError(true)} />
                    )}
                  </div>

                  <nav className="cert-nav">
                    <div className="dropdown-container">
                      <button className="cert-btn" onClick={e => { e.preventDefault(); const dropdown = e.currentTarget.nextSibling; if (dropdown) dropdown.classList.toggle('open'); }}>
                        ⬇️ Download
                      </button>
                      <div className="cert-dropdown">
                        <button className="cert-dropdown-btn" onClick={() => window.open(dados.pdf, '_blank')}>Baixar em PDF</button>
                        <button className="cert-dropdown-btn" onClick={() => { window.alert('A opção de download em JPG ainda não está disponível.\n\nPara obter o certificado em imagem, baixe o PDF e utilize o site https://www.ilovepdf.com/pt/pdf_para_jpg para converter.\n\nClique em PDF para baixar.'); }}>Baixar em JPG</button>
                      </div>
                    </div>
                    <button className="cert-btn linkedin" onClick={() => {
                        const publicPageUrl = `https://automic.vercel.app/certificado#${codigo}`;
                        const textoSugestao = `Acabei de concluir o curso de ${dados.titulo} ministrado por ${dados.professor}. Agradeço a Automic Jr. (Empresa Júnior de Engenharia de Controle e Automação da Escola de Minas de Ouro Preto) pelo apoio e organização. #engenharia #certificado\n\nVeja meu certificado: ${publicPageUrl}`;
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(textoSugestao);
                          alert('Texto sugerido copiado! Ao abrir o LinkedIn, cole o texto na publicação.');
                        } else { alert('Copie o texto sugerido manualmente:\n' + textoSugestao); }
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicPageUrl)}`, '_blank');
                      }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 2.001 3.597 4.601v5.595z"/></svg>
                      Compartilhar no LinkedIn
                    </button>
                    <button className="cert-btn anchor" onClick={() => { const el = document.getElementById('conteudo_programatico'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>
                      📚 Conteúdo Programático
                    </button>
                  </nav>

                  <div className="cert-datas-box">
                    <p><b>O curso ocorreu nos dias:</b> {detalhesCurso.diasOcorridos}</p>
                    <p><b>O curso foi realizado na modalidade:</b> {detalhesCurso.modalidade}</p>
                    <p><b>O curso foi realizado no endereço:</b> {detalhesCurso.endereco}</p>
                  </div>
                </div>

                {/* COLUNA DIREITA: INFORMAÇÕES */}
                <div className="certificado-info-col">
                  <div className="cert-card">
                    <section className="cert-info-section">
                      <h3>Dados do responsável pela emissão:</h3>
                      <p><b>Data e hora:</b> {detalhesCurso.dataEmissao || "Data não registrada"}</p>
                      <p><b>Razão social:</b> {DADOS_RESPONSAVEL.razao}</p>
                      <p><b>CNPJ:</b> {DADOS_RESPONSAVEL.cnpj}</p>
                    </section>
                    
                    <section className="cert-info-section" id="infogeral">
                      <h3>Dados informados pela Automic Júnior, emissora do certificado:</h3>
                      <b>Nome do(a) {dados.funcao}:</b>
                      <p><span className="nome-destaque">{dados.nome}</span></p>
                      <p><b>Curso:</b> {dados.titulo}</p>
                      {dados.funcao && dados.funcao.toLowerCase() !== 'palestrante' && (
                        <p><b>Nome do professor/instrutor:</b> {dados.professor}</p>
                      )}
                      <p><b>Data de conclusão:</b> {dados.dataRealizacao}</p>
                      <p><b>Local de realização:</b> {dados.local}</p>
                      <p><b>Carga horária:</b> {dados.cargaHoraria}</p>
                      {dados.tempoExperiencia && (
                        <p><b>Tempo de experiência na área:</b> {dados.tempoExperiencia}</p>
                      )}
                    </section>
                  </div>
                </div>

                {/* SEÇÕES DE RODAPÉ (ATIVIDADES E SOBRE) */}
                <div className="cert-atividades-wrapper">
                  <section className="cert-section atividades-section">
                    <div className="carrossel-wrapper">
                      <CarrosselMidia midia={detalhesCurso.midia} backgroundImage={detalhesCurso.bgCarrossel} />
                    </div>
                    <h3>Descrição das Atividades:</h3>
                    <ul className="cert-atividades-list">
                      {detalhesCurso.atividades?.map((atividade, index) => (
                        <li key={index}>{atividade}</li>
                      ))}
                    </ul>
                  </section>
                  
                  <section className="cert-section sobre-section">
                    <h3>Sobre a A³EM:</h3>
                    <p><b>Associação de Antigos Alunos da Escola de Minas:</b> Fundada em 12 de Outubro de 1942 a A³EM vem, desde então, atuando como entidade que promove ações em prol do desenvolvimento acadêmico da Escola de Minas, além de estimular relações de integração entre os profissionais nela formados. Promove, apoia e realiza eventos (sessões solenes, palestras, simpósios, encontros, publicações e confraternizações ). Mantém estreito intercâmbio com as Sociedades de Ex-Alunos da Escola de Minas de Ouro Preto (SEMOP´s) sediadas em várias cidades do país.</p>
                    <p>É uma entidade sem fins lucrativos filiada à Federação Brasileira de Associações de Engenheiros (FEBRAE) com representação no CREA. Está sediada na Rua Henri Gorceix, no. 96 , em Ouro Preto – MG, imóvel onde residiu, por quinze anos, o fundador e primeiro Diretor da Escola de Minas – Professor Claude-Henri Gorceix. O quadro de associados da A³EM é formado por efetivos, cooperadores, honorários e contribuintes.</p>
                  </section>
                </div>

                <section id="conteudo_programatico" className="cert-program">
                  <h3>{detalhesCurso.tituloConteudo}</h3>
                  <ul className="cert-list">
                    {detalhesCurso.conteudoProgramatico?.map((modulo, index) => (
                      <li key={index}>{modulo}</li>
                    ))}
                  </ul>
                </section>
              </>
            ) : (
              <div className="cert-error-msg">
                <h2>Certificado não encontrado ou dados incompletos!</h2>
                <p>Verifique se o código informado está correto ou se o curso possui os detalhes devidamente cadastrados no sistema.</p>
              </div>
            )
          ) : (
            <div className="cert-empty-msg">
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