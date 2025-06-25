import { useEffect, useState } from 'react';
import { certificados } from '../assets/certificados/certificadosData';
import Footer from './Footer';
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
    <div style={{ minHeight: '100vh', background: 'var(--branco)' }}>
      <main className="main-content" style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
        {codigo ? (
          dados ? (
            <>
              <h2 style={{ color: 'var(--azul-escuro)', marginBottom: 24 }}>Certificado localizado</h2>
              <iframe
                src={dados.pdf}
                width="100%"
                height="600px"
                style={{ border: 'none', borderRadius: 8, marginBottom: 24, boxShadow: '0 2px 8px #0001' }}
                title="Certificado PDF"
              />
              <section style={{ marginBottom: 24 }}>
                <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 8 }}>Dados do responsável pela emissão:</h3>
                <p><b>Data e hora:</b> {DADOS_RESPONSAVEL.dataHora}</p>
                <p><b>Razão social:</b> {DADOS_RESPONSAVEL.razao}</p>
                <p><b>CNPJ:</b> {DADOS_RESPONSAVEL.cnpj}</p>
              </section>
              <section>
                <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 8 }}>Dados informados pelo emissor do certificado:</h3>
                <p><b>Nome do participante/aluno:</b> {dados.nome}</p>
                <p><b>Título palestra/curso:</b> {dados.titulo}</p>
                <p><b>Nome do professor/instrutor:</b> {dados.professor}</p>
                <p><b>Data de realização:</b> {dados.dataRealizacao}</p>
                <p><b>Local de realização:</b> {dados.local}</p>
                <p><b>Carga horária:</b> {dados.cargaHoraria}</p>
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
  );
}
