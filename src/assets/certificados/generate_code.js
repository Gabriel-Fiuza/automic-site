function generateCodes(qtd, length = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem O, I, 0, 1
  const codes = new Set();
  while (codes.size < qtd) {
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    codes.add(code);
  }
  return Array.from(codes);
}

// Exemplo: gerar 1 código de 8 caracteres
console.log(generateCodes(1, 8));