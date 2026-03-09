import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

// Configuração do Firebase
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

const diretorias = [
  "Diretoria de Presidência",
  "Diretoria de Gestão Estratégica",
  "Diretoria de Mercado",
  "Diretoria de Projetos"
];

async function gerenciarDiretorias() {
  const rl = readline.createInterface({ input, output });

  try {
    console.log("Conectando ao banco de dados...");
    const snapshot = await getDocs(collection(db, "membros"));
    
    if (snapshot.empty) {
      console.log("Nenhum membro encontrado na base de dados.");
      process.exit(0);
    }

    const listaMembros = [];
    snapshot.forEach(doc => {
      listaMembros.push({ id: doc.id, ...doc.data() });
    });

    // 1. Pergunta inicial
    const querProsseguir = await rl.question("\nDeseja prosseguir com a mudança de membros e diretoria? (s/n): ");
    if (querProsseguir.toLowerCase() !== 's' && querProsseguir.toLowerCase() !== 'sim') {
      console.log("Operação cancelada.");
      process.exit(0);
    }

    // 2. Selecionar a Nova Diretoria
    console.log("\n--- DIRETORIAS DISPONÍVEIS ---");
    diretorias.forEach((dir, index) => console.log(`[${index + 1}] ${dir}`));
    
    const respDiretoria = await rl.question("\nEscolha o NÚMERO da diretoria alvo: ");
    const indexDiretoria = parseInt(respDiretoria) - 1;

    if (isNaN(indexDiretoria) || indexDiretoria < 0 || indexDiretoria >= diretorias.length) {
      console.error("❌ Opção de diretoria inválida.");
      process.exit(1);
    }
    const novaDiretoria = diretorias[indexDiretoria];

    // 3. Identificar o atual diretor desta diretoria
    const atualDiretor = listaMembros.find(m => 
      m.diretoria === novaDiretoria && m.cargo.toLowerCase().includes('diretor')
    );
    const nomeAtualDiretor = atualDiretor ? atualDiretor.nome : "Nenhum diretor cadastrado atualmente";

    console.log(`\n⚠️ Você selecionou a ${novaDiretoria}. O atual diretor é o membro: ${nomeAtualDiretor}.`);
    const confirmaDiretoria = await rl.question("Deseja prosseguir? (s/n): ");
    if (confirmaDiretoria.toLowerCase() !== 's' && confirmaDiretoria.toLowerCase() !== 'sim') {
      console.log("Operação cancelada.");
      process.exit(0);
    }

    // 4. Selecionar o Membro
    console.log("\n--- LISTA DE MEMBROS ---");
    listaMembros.forEach((m, index) => {
      console.log(`[${index + 1}] ${m.nome} (${m.cargo} - ${m.diretoria})`);
    });

    const respMembro = await rl.question("\nSelecione o NÚMERO do membro que deseja transferir: ");
    const indexMembro = parseInt(respMembro) - 1;

    if (isNaN(indexMembro) || indexMembro < 0 || indexMembro >= listaMembros.length) {
      console.error("❌ Opção de membro inválida.");
      process.exit(1);
    }
    const membroSelecionado = listaMembros[indexMembro];

    // 5. Selecionar o novo cargo
    console.log(`\nO membro selecionado foi: ${membroSelecionado.nome}`);
    console.log("[1] Gestor");
    console.log("[2] Diretor");
    const respCargo = await rl.question(`Selecione o novo cargo que este membro vai ocupar na ${novaDiretoria}: `);
    
    let novoCargo = "";
    if (respCargo === '1') novoCargo = "Gestor";
    else if (respCargo === '2') novoCargo = "Diretor";
    else {
      console.error("❌ Opção de cargo inválida.");
      process.exit(1);
    }

    // Adaptação para o cargo da presidência se for o caso
    if (novoCargo === "Diretor" && novaDiretoria === "Diretoria de Presidência") {
      novoCargo = "Diretor Presidente";
    }

    // 6. Confirmação Final
    console.log(`\n--- RESUMO DA ALTERAÇÃO ---`);
    console.log(`Membro: ${membroSelecionado.nome}`);
    console.log(`DE: ${membroSelecionado.cargo} da ${membroSelecionado.diretoria}`);
    console.log(`PARA: ${novoCargo} da ${novaDiretoria}`);
    
    const confirmaFinal = await rl.question(`\nConfirma a mudança de ${membroSelecionado.nome} para a ${novaDiretoria} e para o cargo de ${novoCargo}? \n(Isso o removerá do cargo de ${membroSelecionado.cargo} da ${membroSelecionado.diretoria}.) (s/n): `);

    if (confirmaFinal.toLowerCase() !== 's' && confirmaFinal.toLowerCase() !== 'sim') {
      console.log("Operação cancelada. Nenhuma alteração foi feita.");
      process.exit(0);
    }

    // 7. Atualizar no Firestore
    console.log("\nAtualizando dados no Firebase...");
    const membroRef = doc(db, "membros", membroSelecionado.id);
    await updateDoc(membroRef, {
      diretoria: novaDiretoria,
      cargo: novoCargo
    });

    console.log(`✅ Sucesso! O membro ${membroSelecionado.nome} foi atualizado para ${novoCargo} da ${novaDiretoria}.`);

  } catch (error) {
    console.error("❌ Erro durante a execução:", error);
  } finally {
    rl.close();
    process.exit(0);
  }
}

gerenciarDiretorias();