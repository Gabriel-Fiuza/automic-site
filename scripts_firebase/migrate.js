import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { certificados } from '../src/assets/certificados/certificadosData.js';
import { membrosData } from '../src/assets/membros/membrosData.js';

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

async function migrarDados() {
  console.log("Iniciando migração dos Certificados...");
  for (const [codigo, dados] of Object.entries(certificados)) {
    try {
      // Cria um documento na coleção 'certificados' usando o código como ID
      await setDoc(doc(db, "certificados", codigo), dados);
      console.log(`✅ Certificado ${codigo} migrado com sucesso!`);
    } catch (error) {
      console.error(`❌ Erro ao migrar certificado ${codigo}:`, error);
    }
  }

  console.log("\nIniciando migração dos Membros...");
  for (const [id, dados] of Object.entries(membrosData)) {
    try {
      // Cria um documento na coleção 'membros' usando a chave (ex: 'geovane') como ID
      await setDoc(doc(db, "membros", id), dados);
      console.log(`✅ Membro ${id} migrado com sucesso!`);
    } catch (error) {
      console.error(`❌ Erro ao migrar membro ${id}:`, error);
    }
  }

  console.log("\n🎉 Migração concluída! Verifique o painel do Firebase.");
  process.exit(0);
}

migrarDados();