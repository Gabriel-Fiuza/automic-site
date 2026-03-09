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

// Dados base do curso de Front-end
const dadosCurso = {
  titulo: 'Fundamentos de Front end (HTML, CSS e GITHUB).',
  professor: 'Gabriel Paulinelli Fiuza',
  dataRealizacao: '08 de fevereiro de 2026',
  local: 'Ouro Preto/MG',
  cargaHoraria: '15 horas'
};

// Lista de participantes e seus códigos
const participantes = [
  { codigo: 'MQUZZEXM', nome: 'Gabriel Paulinelli Fiuza', funcao: 'Palestrante' },
  { codigo: 'RKVLAZB8', nome: 'Davi Figueiredo Mourão', funcao: 'Aluno(a)' },
  { codigo: 'GNXJC6UR', nome: 'Fabio Daniel Miranda Pedrosa', funcao: 'Aluno(a)' },
  { codigo: '2UZTMGXR', nome: 'Gustavo Henrique Pinto Reis', funcao: 'Aluno(a)' },
  { codigo: 'RTTY7Z8Z', nome: 'João Paulo Rocha Andrade', funcao: 'Aluno(a)' },
  { codigo: 'JPBCATKD', nome: 'Leandro Wagnner Teixeira Gonçalves', funcao: 'Aluno(a)' },
  { codigo: 'VBMPZY5Q', nome: 'Matheus Henrique da Costa Baldez', funcao: 'Aluno(a)' }, // Corrigido maiúsculas
  { codigo: 'KZUPPV34', nome: 'Michel Alessandro Borges Pereira', funcao: 'Aluno(a)' },
  { codigo: '7Q9K42LB', nome: 'Nicolas Conrado de Campos Braga', funcao: 'Aluno(a)' },
  { codigo: '97L2PPE7', nome: 'Pedro Braga', funcao: 'Aluno(a)' },
  { codigo: '3HQDR4BK', nome: 'Ricardo Maroca de Avelar Rivelli de Oliveira', funcao: 'Aluno(a)' },
  { codigo: 'VRDXU2HU', nome: 'Vilker Rocha Alves Pereira', funcao: 'Aluno(a)' },
  { codigo: 'TZSWXPPM', nome: 'Felipe Vieira Arcanjo Freitas', funcao: 'Aluno(a)' }
];

async function adicionarCertificados() {
  console.log("Iniciando o cadastro dos certificados do curso de Front-End no Firebase...\n");
  let sucesso = 0;

  for (const participante of participantes) {
    const dadosCertificado = {
      nome: participante.nome,
      funcao: participante.funcao,
      titulo: dadosCurso.titulo,
      professor: dadosCurso.professor,
      dataRealizacao: dadosCurso.dataRealizacao,
      local: dadosCurso.local,
      cargaHoraria: dadosCurso.cargaHoraria,
      pdf: `/certificados/${participante.codigo}.pdf` // Link dinâmico do PDF
    };

    try {
      await setDoc(doc(db, "certificados", participante.codigo), dadosCertificado);
      console.log(`✅ Certificado de ${participante.nome} (${participante.codigo}) cadastrado!`);
      sucesso++;
    } catch (error) {
      console.error(`❌ Erro ao cadastrar certificado de ${participante.nome}:`, error);
    }
  }

  console.log(`\n🎉 Concluído! ${sucesso} de ${participantes.length} certificados foram adicionados com sucesso.`);
  process.exit(0);
}

adicionarCertificados();