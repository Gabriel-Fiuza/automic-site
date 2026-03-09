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

async function testarInsercao() {
  try {
    console.log("Adicionando novo certificado de teste...");
    
    // 1. Adicionando um NOVO CERTIFICADO
    const novoCodigoCertificado = "TESTE001";
    const dadosCertificado = {
      nome: "Aluno Teste Firebase",
      funcao: "Aluno(a)",
      titulo: "Curso de Teste de Banco de Dados",
      professor: "Automic Jr.",
      dataRealizacao: "02 de Março de 2026",
      local: "Ouro Preto/MG",
      cargaHoraria: "10 horas",
      pdf: "/certificados/TESTE001.pdf" 
    };

    // setDoc cria ou sobrescreve o documento com o ID especificado
    await setDoc(doc(db, "certificados", novoCodigoCertificado), dadosCertificado);
    console.log(`✅ Certificado ${novoCodigoCertificado} criado com sucesso!`);


    console.log("\nAdicionando novo membro de teste...");
    
    // 2. Adicionando um NOVO MEMBRO
    const idNovoMembro = "membro-teste";
    const dadosMembro = {
      nome: "Membro Teste Firebase",
      diretoria: "Diretoria de Projetos",
      cargo: "Trainee",
      inicio: "03/2026",
      foto: "/fotosmembros/Icone.jpg",
      introdução: "Membro adicionado via script para testar o Firebase.",
      resumo: ["Testando a inserção de arrays de texto no Firestore."],
      Habilidades: ["React", "Firebase", "Node.js"],
      email: "teste@automic.com.br",
      linkedin: ""
    };

    await setDoc(doc(db, "membros", idNovoMembro), dadosMembro);
    console.log(`✅ Membro ${idNovoMembro} criado com sucesso!`);

  } catch (error) {
    console.error("❌ Erro ao inserir dados:", error);
  } finally {
    console.log("\nTeste finalizado.");
    process.exit(0);
  }
}

testarInsercao();