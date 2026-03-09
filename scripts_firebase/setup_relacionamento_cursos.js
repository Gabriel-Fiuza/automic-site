import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, getDocs, updateDoc } from "firebase/firestore";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAhQq8gNJ-ILs3VGN0VEyrntd5BoUMTfWw",
  authDomain: "automic-site.firebaseapp.com",
  projectId: "automic-site",
  storageBucket: "automic-site.firebasestorage.app",
  messagingSenderId: "336395313611",
  appId: "1:336395313611:web:e14b956773ce2d13a9564e",
  measurementId: "G-7Q6F7ZJVE1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const detalhesDosCursos = {
  "automacao-2025": {
    id: "automacao-2025",
    diasOcorridos: "17/05/2025, 18/05/2025, 14/06/2025, 15/06/2025 e 29/06/2025",
    modalidade: "Presencial",
    endereco: "Sede da A3EM (Associação dos Antigos Alunos da Escola de Minas) - Rua Henri Gorceix, número 96, em Ouro Preto, Minas Gerais",
    bgSite: "/curso29062025/Imagem de fundo curso controllogix2.jpg",
    bgCarrossel: "/curso29062025/foto5carrossel.jpg",
    pdfPlaceholder: "/curso29062025/pdf-placeholder.png",
    tituloConteudo: "Conteúdo Programático da Primeira Apostila (Total: 4)",
    atividades: [
      "Instalação e configuração de ambientes de desenvolvimento.",
      "Programação de controladores ControlLogix.",
      "Configuração de redes Ethernet e DeviceNet.",
      "Desenvolvimento de telas supervisórias no Excel.",
      "Exercícios práticos de automação industrial.",
      "Parametrização de inversores de frequência.",
      "Simulações de operação de sistemas industriais utilizando o emulador.",
      "Diagnóstico e manutenção de módulos e controladores.",
      "Treinamento em manutenção de sistemas de automação."
    ],
    conteudoProgramatico: [
      "Módulo 1: Apresentação", "Módulo 2: Instalação da Máquina Virtual", "Módulo 3: Ethernet", "Módulo 4: Detalhes da Plataforma de Teste",
      "Módulo 5: Início da Automação Industrial", "Módulo 6: RSLinx", "Módulo 7: Conceitos de um CLP", "Módulo 8: Sistema de Numeração",
      "Módulo 9: Exercícios", "Módulo 10: Instrumentação Básica", "Módulo 11: Características do ControlLogix", "Módulo 12: Configuração de um Projeto",
      "Módulo 13: Configuração do Controlador para um Novo Projeto", "Módulo 14: Configuração do Rack Remoto", "Módulo 15: Configuração do Inversor de Frequência PowerFlex 40 na Ethernet",
      "Módulo 16: Parametrização do Inversor de Frequência PowerFlex 40", "Módulo 17: Download de Dispositivos no site da Rockwell", "Módulo 18: Explorando o Controller Tags",
      "Módulo 19: Detalhes dos Módulos Instalados", "Módulo 20: Criando a Primeira Tarefa", "Módulo 21: Criando os Arquivos", "Módulo 22: Configurando User Defined para Típicos de Equipamentos",
      "Módulo 23: Blocos Avançados de Programação", "Módulo 24: Criando o Primeiro Equipamento no Controller Tags", "Módulo 25: Criando os Tags Alias for Baseado Na Lista de Mnemônicos de I/O",
      "Módulo 26: Premissas para Programar Equipamentos", "Módulo 27: Forces em Programas", "Módulo 28: Consideração ao Utilizar a Função Force", "Módulo 29: Como Utilizar a Função Force",
      "Módulo 30: Programação da TC01", "Módulo 31: Trabalhando os Recursos", "Módulo 32: Criando um Segundo Equipamento", "Módulo 33: Utilizando Bloco Add ON",
      "Módulo 34: Teoria da Programação FBD", "Módulo 35: Ativando Rotinas", "Módulo 36: Download e Upload de Programas", "Módulo 37: Recursos de Navegação do Software Logix5000/Studio 5000",
      "Módulo 38: Diagnóstico do Controlador e Módulos", "Módulo 39: Tratamento do Sinal Analógico (Entrada e Saída)", "Módulo 40: Módulos Analógicos e Digitais", "Módulo 41: Emulador",
      "Módulo 42: Utilização da Função SSV/GSV", "Módulo 43: Comunicação entre Controladores (Produtor/Consumidor)", "Módulo 44: Comunicação entre Controladores ControlLogix via MSG",
      "Módulo 45: Comunicação entre Controladores ControlLogix e CompactLogix via MSG", "Módulo 46: Conceitos Básicos do PID", "Módulo 47: Usando ControlFlash", "Módulo 48: Teste Final"
    ],
    midia: [
      { type: 'image', src: '/curso29062025/foto1carrosel.jpg' }, { type: 'image', src: '/curso29062025/foto2carrosel.jpg' },
      { type: 'image', src: '/curso29062025/foto3carrossel.jpg' }, { type: 'image', src: '/curso29062025/foto4carrossel.jpg' },
      { type: 'image', src: '/curso29062025/foto5carrossel.jpg' }, { type: 'image', src: '/curso29062025/foto6carrossel.jpg' },
      { type: 'image', src: '/curso29062025/foto7carrossel.jpg' }, { type: 'video', src: '/curso29062025/video1carrossel.mp4' },
      { type: 'video', src: '/curso29062025/video2carrossel.mp4' }, { type: 'video', src: '/curso29062025/video3carrossel.mp4' },
      { type: 'video', src: '/curso29062025/video4carrossel.mp4' }
    ]
  },
  "frontend-2026": {
    id: "frontend-2026",
    diasOcorridos: "07/02/2026 e 08/02/2026",
    modalidade: "Presencial",
    endereco: "Escola de Minas - UFOP, Ouro Preto, Minas Gerais",
    bgSite: "/curso07022026/foto5carrossel.jpeg",
    bgCarrossel: "/curso07022026/foto5carrossel.jpeg",
    pdfPlaceholder: "/curso29062025/pdf-placeholder.png",
    tituloConteudo: "Conteúdo Programático (Total: 22 módulos)",
    atividades: [
      "Instalação e configuração do editor de código (VS Code) e extensões.",
      "Inspeção e alteração de elementos em tempo real utilizando o DevTools do navegador.",
      "Estruturação semântica de uma página web utilizando tags HTML5.",
      "Criação de um formulário de contato com diversos tipos de entrada de dados.",
      "Estilização de páginas web utilizando CSS.",
      "Desenvolvimento de layouts complexos e alinhamentos utilizando Flexbox e CSS Grid.",
      "Criação e aplicação de um 'Dark Mode' (Tema Escuro) utilizando Variáveis CSS.",
      "Implementação de animações e micro-interações em botões e links (Hover e Transições).",
      "Adaptação de layouts para dispositivos móveis e desktops utilizando Media Queries (Responsividade).",
      "Desenvolvimento completo de um site de Portfólio Pessoal (Projeto Final).",
      "Versionamento básico e hospedagem do projeto na internet de forma gratuita via GitHub Pages."
    ],
    conteudoProgramatico: [
      "Módulo 1: Apresentação e Configuração do Ambiente (VS Code e Extensões)", "Módulo 2: Estrutura de Pastas e Boas Práticas de Nomenclatura",
      "Módulo 3: Fundamentos da Web: Front-end vs Back-end", "Módulo 4: Introdução ao HTML: Estrutura Básica e Tags Essenciais",
      "Módulo 5: Links, Imagens e Formatação de Texto", "Módulo 6: Criação de Formulários (Inputs, Checkbox, Select e Textarea)",
      "Módulo 7: Tabelas e Incorporação de Mídias (iFrame)", "Módulo 8: Acessibilidade Básica e HTML Semântico",
      "Módulo 9: Introdução ao CSS: Sintaxe e Formas de Inserção", "Módulo 10: Seletores CSS e Cascata/Especificidade",
      "Módulo 11: O Box Model (Margin, Padding, Border e Box-sizing)", "Módulo 12: Cores, Transparências (RGBA) e Efeitos Visuais",
      "Módulo 13: Unidades de Medida Relativas e Absolutas (px, rem, %, vh/vw)", "Módulo 14: Variáveis CSS e Criação de Temas (Dark Mode)",
      "Módulo 15: Tipografia e Importação do Google Fonts", "Módulo 16: Propriedades de Display (Block, Inline, None)",
      "Módulo 17: Layouts Unidimensionais com Flexbox", "Módulo 18: Layouts Bidimensionais com CSS Grid",
      "Módulo 19: Interatividade: Pseudo-classes, Pseudo-elementos e Transições", "Módulo 20: Design Responsivo (Mobile First e Media Queries)",
      "Módulo 21: Ferramentas de Produtividade Front-end (Figma, Uiverse, CodePen)", "Módulo 22: Publicação do Projeto (Deploy) no GitHub Pages"
    ],
    midia: [
      { type: 'image', src: '/curso07022026/foto1carrossel.jpeg' }, { type: 'image', src: '/curso07022026/foto2carrossel.jpeg' },
      { type: 'image', src: '/curso07022026/foto3carrossel.jpeg' }, { type: 'image', src: '/curso07022026/foto4carrossel.jpeg' },
      { type: 'image', src: '/curso07022026/foto5carrossel.jpeg' }, { type: 'image', src: '/curso07022026/foto6carrossel.jpeg' },
      { type: 'image', src: '/curso07022026/foto7carrossel.jpeg' }, { type: 'image', src: '/curso07022026/foto8carrossel.jpeg' },
      { type: 'image', src: '/curso07022026/foto9carrossel.jpeg' }
    ]
  }
};

async function setupBanco() {
  console.log("1. Criando a coleção de Detalhes dos Cursos...");
  for (const [id, dados] of Object.entries(detalhesDosCursos)) {
    try {
      await setDoc(doc(db, "detalhes_cursos", id), dados);
      console.log(`✅ Detalhes do curso '${id}' salvos com sucesso!`);
    } catch (e) {
      console.error(`❌ Erro ao salvar curso ${id}:`, e);
    }
  }

  console.log("\n2. Atualizando certificados antigos com os seus respectivos cursoId...");
  try {
    const snapshot = await getDocs(collection(db, "certificados"));
    let atualizados = 0;

    for (const documento of snapshot.docs) {
      const dadosCertificado = documento.data();
      const titulo = dadosCertificado.titulo || "";
      
      // Se o título tem "Front end", pertence ao frontend-2026, senão automacao-2025
      const cursoId = titulo.toLowerCase().includes("front end") ? "frontend-2026" : "automacao-2025";

      await updateDoc(doc(db, "certificados", documento.id), {
        cursoId: cursoId
      });
      atualizados++;
    }
    console.log(`✅ ${atualizados} certificados atualizados com sucesso no banco de dados!`);
  } catch (e) {
    console.error("❌ Erro ao atualizar certificados:", e);
  }

  console.log("\n🎉 Tudo pronto na nuvem!");
  process.exit(0);
}

setupBanco();