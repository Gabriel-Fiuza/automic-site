import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configuração de diretórios
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const qrCodeDir = path.resolve(__dirname, "../src/assets/imagesqrcode");

// Cria a pasta se ela não existir
if (!fs.existsSync(qrCodeDir)) {
  fs.mkdirSync(qrCodeDir, { recursive: true });
}

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

// Função idêntica à sua para gerar código (sem O, I, 0, 1)
function gerarCodigoAleatorio(length = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function gerarCodigos() {
  const rl = readline.createInterface({ input, output });

  try {
    console.log("Conectando ao banco de dados para buscar códigos existentes...");
    const snapshot = await getDocs(collection(db, "certificados"));
    
    // Armazena os códigos que já existem no banco para evitar duplicatas
    const codigosExistentes = new Set();
    snapshot.forEach(doc => codigosExistentes.add(doc.id));

    console.log(`✅ ${codigosExistentes.size} códigos encontrados na base.\n`);

    const respostaQtd = await rl.question("Quantos novos códigos de certificados você deseja gerar? ");
    const qtd = parseInt(respostaQtd);

    if (isNaN(qtd) || qtd <= 0) {
      console.error("❌ Quantidade inválida.");
      process.exit(1);
    }

    const novosCodigos = [];
    
    // Gera os códigos garantindo que são únicos
    while (novosCodigos.length < qtd) {
      const novoCodigo = gerarCodigoAleatorio(8);
      if (!codigosExistentes.has(novoCodigo) && !novosCodigos.includes(novoCodigo)) {
        novosCodigos.push(novoCodigo);
      }
    }

    console.log(`\nGerando ${qtd} QR Codes...`);

    // Cria os QR Codes para os novos códigos
    for (const codigo of novosCodigos) {
      const link = `https://automic.vercel.app/certificado#${codigo}`;
      const filepath = path.join(qrCodeDir, `${codigo}.png`);

      // Gera a imagem do QR code com 1024px de largura (mesmo padrão do seu script em Python)
      await QRCode.toFile(filepath, link, {
        width: 1024,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      
      console.log(`- Código: ${codigo} | QR Code salvo em: src/assets/imagesqrcode/${codigo}.png`);
    }

    console.log(`\n🎉 Processo concluído! Copie os códigos acima para associá-los aos alunos de Front-End.`);

  } catch (error) {
    console.error("❌ Erro durante a execução:", error);
  } finally {
    rl.close();
    process.exit(0);
  }
}

gerarCodigos();