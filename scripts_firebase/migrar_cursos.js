import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

// Seus cursos atuais + o novo que você comentou
const cursosData = {
  "curso-automacao-2025": {
    ordem: 1, // Usaremos isso para ordenar na tela
    titulo: "Curso de Automação Industrial",
    parceria: "Matta Automação e A3EM",
    descricao: "Aprenda os fundamentos da automação industrial com práticas reais.",
    detalhes: [
      "Introdução à automação industrial",
      "Configuração de CLPs (Controladores Lógicos Programáveis)",
      "Redes industriais: Ethernet e DeviceNet",
      "Programação de sistemas supervisórios",
      "Exercícios práticos com equipamentos reais"
    ],
    data: "01 de novembro de 2025",
    local: "Sede da A3EM, Ouro Preto/MG",
    cargaHoraria: "40 horas",
    instrutor: "Luiz da Matta",
    imagem: "/foto7carrossel.jpg" // A imagem continua lendo da sua pasta public!
  },
  "curso-frontend-2026": {
    ordem: 2,
    titulo: "Curso de Programação Web (Front-End)",
    parceria: "Start Carreiras",
    descricao: "Domine a programação web com foco em desenvolvimento front-end (React e Vite).",
    detalhes: [
      "Lógica de programação com JavaScript",
      "Criação de interfaces com React",
      "Integração com Banco de Dados em Nuvem"
    ],
    data: "A confirmar",
    local: "Escola de Minas - UFOP, Ouro Preto/MG",
    cargaHoraria: "30 horas",
    instrutor: "Automic Jr.",
    imagem: "/Icons/designer-de-web.png" // Exemplo de imagem local
  },
  "curso-redes-2026": {
    ordem: 3,
    titulo: "Curso de Redes Industriais",
    parceria: "Matta Automação",
    descricao: "Entenda como configurar e gerenciar redes industriais.",
    data: "A confirmar",
    local: "Sede da A3EM, Ouro Preto/MG",
    imagem: "/Icons/industria-40.png"
  }
};

async function migrarCursos() {
  console.log("Migrando cursos para o Firebase...");
  for (const [id, dados] of Object.entries(cursosData)) {
    try {
      await setDoc(doc(db, "cursos", id), dados);
      console.log(`✅ Curso '${dados.titulo}' salvo com sucesso!`);
    } catch (error) {
      console.error(`❌ Erro ao salvar o curso ${id}:`, error);
    }
  }
  process.exit(0);
}

migrarCursos();