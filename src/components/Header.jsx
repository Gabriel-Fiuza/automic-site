import logo from '../assets/Logo-Branca.png';

export default function Header() {
  return (
    <header className="header">
      <a href="https://automic.vercel.app/" style={{ display: 'inline-block' }}>
        <img src={logo} alt="Logo Automic Jr." style={{ cursor: 'pointer' }} />
      </a>
      <nav>
        <ul className="nav-menu">
          <li><a href="#" onClick={e => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Início</a></li>
          <li>
            <a href="/quem-somos" style={{ textDecoration: 'none' }}>
              Quem Somos
            </a>
          </li>
          <li><a href="#services" onClick={e => { e.preventDefault(); const el = document.getElementById('services'); if (el) el.scrollIntoView({behavior: 'smooth'}); }}>Nossos Serviços</a></li>
          <li><a href="#footer" onClick={e => { e.preventDefault(); const el = document.getElementById('footer'); if (el) el.scrollIntoView({behavior: 'smooth'}); }}>Contato</a></li>
          <li><a href="#footer" id="join-us" onClick={e => { e.preventDefault(); const el = document.getElementById('footer'); if (el) el.scrollIntoView({behavior: 'smooth'}); }}>Junte-se a Nós</a></li>
        </ul>
      </nav>
    </header>
  )
}