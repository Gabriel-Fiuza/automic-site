import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

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

async function atualizarDatas() {
  console.log("Atualizando datas de emissão no banco de dados...");
  
  try {
    // Adiciona a data no documento de Automação
    await updateDoc(doc(db, "detalhes_cursos", "automacao-2025"), {
      dataEmissao: "30/06/2025 às 08h34"
    });
    console.log("✅ Curso de Automação: 30/06/2025 às 08h34");

    // Adiciona a data no documento de Front-End
    await updateDoc(doc(db, "detalhes_cursos", "frontend-2026"), {
      dataEmissao: "09/02/2026 às 12h00"
    });
    console.log("✅ Curso de Front-End: 09/02/2026 às 12h00");

  } catch (error) {
    console.error("❌ Erro ao atualizar:", error);
  }
  process.exit(0);
}

atualizarDatas();