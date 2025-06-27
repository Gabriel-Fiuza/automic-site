// Script para converter todos os PDFs em JPG usando pdf2pic
// Instale antes: npm install pdf2pic

import { fromPath } from "pdf2pic";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfsDir = path.resolve(__dirname, "../../../public/certificados"); // Pasta onde estão os PDFs
const outputDir = path.resolve(__dirname, "../../../public/JPGcertificados"); // Pasta de saída

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Lista todos os arquivos PDF na pasta
const pdfFiles = fs.readdirSync(pdfsDir).filter((f) => f.toLowerCase().endsWith(".pdf"));

console.log("Procurando PDFs em:", pdfsDir);
console.log("Arquivos encontrados:", pdfFiles);

if (pdfFiles.length === 0) {
  console.log("Nenhum PDF encontrado na pasta.");
  process.exit(0);
}

const convertAll = async () => {
  for (const file of pdfFiles) {
    const pdfPath = path.join(pdfsDir, file);
    const outputName = path.parse(file).name;
    const converter = fromPath(pdfPath, {
      density: 200,
      saveFilename: outputName,
      savePath: outputDir,
      format: "jpg",
      width: 1200,
      height: 850,
    });
    try {
      const result = await converter(1);
      console.log(`Imagem gerada para ${file}:`, result.path);
    } catch (err) {
      console.error(`Erro ao converter ${file}:`, err);
    }
  }
};

convertAll();
