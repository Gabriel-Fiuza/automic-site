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
    <div style={{ minHeight: '100vh', background: 'var(--branco)' }}>
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
                  style={{ minHeight: 600, height: 650  , border: 'none', borderRadius: 8, boxShadow: '0 2px 8px #0001', background: '#f2f2f2', display: 'block' }}
                  title="Certificado PDF"
                />
                <a href={dados.pdf} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: 12, right: 12, background: 'var(--azul-escuro)', color: 'white', padding: '6px 14px', borderRadius: 6, textDecoration: 'none', fontSize: 14, boxShadow: '0 1px 4px #0002' }}>Abrir em nova aba</a>
              </div>
              <div style={{ flex: 1, minWidth: 320, lineHeight: 1.5 }}>
                <section style={{ marginBottom: 24 }}>
                  <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 8 }}>Dados do responsável pela emissão:</h3>
                  <p><b>Data e hora:</b> {DADOS_RESPONSAVEL.dataHora}</p>
                  <p><b>Razão social:</b> {DADOS_RESPONSAVEL.razao}</p>
                  <p><b>CNPJ:</b> {DADOS_RESPONSAVEL.cnpj}</p>
                </section>
                <section id="infogeral">
                  <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 8 }}>Dados informados pelo emissor do certificado:</h3>
                  <p><b>Nome do participante/aluno:</b> {dados.nome}</p>
                  <p><b>Curso:</b> {dados.titulo}</p>
                  <p><b>Nome do professor/instrutor:</b> {dados.professor}</p>
                  <p><b>Data de realização:</b> {dados.dataRealizacao}</p>
                  <p><b>Local de realização:</b> {dados.local}</p>
                  <p><b>Carga horária:</b> {dados.cargaHoraria}</p><br />
                  <p><b>O curso ocorreu nos dias:</b> 17/05/2025, 18/05/2025, 14/06/2025, 15/06/2025 e 29/06/2025</p>
                  <p><b>O curso foi realizado na modalidade:</b> Presencial</p>
                  <p><b>O curso foi realizado no endereço:</b> Sede da A3EM(Associação dos Antigos Alunos da Escola de Minas) - Rua Henri Gorceix, número 96, em Ouro Preto, Minas Gerais </p>
                </section>

              </div>

              <div id="Ementa do curso" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 32, maxWidth: 1200, margin: '32px auto 0 auto', flexWrap: 'wrap' }}>
                <section id="conteudo_programático" style={{ flex: 1, minWidth: 320, background: 'var(--cinza-claro)', borderRadius: 8, boxShadow: '0 1px 4px #0001', padding: '2rem', lineHeight: 1.6, minHeight: 320 }}>
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
                <section id="atividades" style={{ flex: 1, minWidth: 320, background: 'var(--branco)', borderRadius: 8, boxShadow: '0 1px 4px #0001', padding: '2rem', lineHeight: 1.6 }}>
                  <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 12 }}>Descrição das Atividades:</h3>
                  <ul style={{ margin: 0, paddingLeft: 24 }}>
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
              </div>

              <section id="sobreA3EM" style={{ maxWidth: 900, margin: '32px auto 0 auto', background: 'var(--cinza-claro)', borderRadius: 8, boxShadow: '0 1px 4px #0001', padding: '2rem', lineHeight: 1.6, textAlign: 'center' }}>
                <h3 style={{ color: 'var(--azul-escuro)', fontSize: '1.1rem', marginBottom: 12 }}>Sobre a A³EM:</h3>
                <p><b>Sobre a A³EM:</b> Fundada em 12 de Outubro de 1942 a A³EM vem, desde então, atuando como entidade que promove ações em prol do desenvolvimento acadêmico da Escola de Minas, além de estimular relações de integração entre os profissionais nela formados. Promove, apoia e realiza eventos (sessões solenes, palestras, simpósios, encontros, publicações, confraternizações, ). Mantém estreito intercâmbio com as Sociedades de Ex-Alunos da Escola de Minas de Ouro Preto (SEMOP´s) sediadas em várias cidades do país.</p>
                <p>É uma entidade sem fins lucrativos filiada à Federação Brasileira de Associações de Engenheiros (FEBRAE) com representação no CREA. Está sediada na Rua Henri Gorceix, no. 96 , em Ouro Preto – MG, imóvel onde residiu, por quinze anos, o fundador e primeiro Diretor da Escola de Minas – Professor Claude-Henri Gorceix. O quadro de associados da A³EM é formado por efetivos, cooperadores, honorários e contribuintes.</p>
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
