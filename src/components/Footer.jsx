import { useEffect } from 'react'

export default function Footer({id}) {
  useEffect(() => {
    document.getElementById('current-year').textContent = new Date().getFullYear()
  }, [])

  return (
    <footer className="footer">
      <div className="footer-column">
        <h3>Automic Jr. UFOP</h3>
        <p>Empresa Júnior em Engenharia de Controle e Automação da UFOP.</p>
        <p>Desde 2016 transformando o futuro.</p>
      </div>
      <div className="footer-column" id={id}>
        <h3>Contato</h3>
        <p>Email: automicjr@gmail.com</p>
        <p>Endereço: Escola de Minas - UFOP - Ouro Preto</p>
        <div className="social-icons">
          <a href="https://www.instagram.com/jr.automic/" target="_blank" aria-label="Instagram" rel="noreferrer">
            <img src="https://img.icons8.com/ios-filled/24/FFFFFF/instagram-new.png" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/automicjr" target="_blank" aria-label="Facebook" rel="noreferrer">
            <img src="https://img.icons8.com/ios-filled/24/FFFFFF/facebook-new.png" alt="Facebook" />
          </a>
        </div>
      </div>
      <div className="footer-column">
        <h3>Links Rápidos</h3>
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#services">Nossos Serviços</a></li>
          <li><a href='#footer'>Contato</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; <span id="current-year"></span> Automic Jr. UFOP. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
// Footer.jsx