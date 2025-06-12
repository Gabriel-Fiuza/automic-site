import logo from '../assets/Logo-Branca.png';

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo Automic Jr." />
      <nav>
        <ul className="nav-menu">
          <li><a href="#">Início</a></li>
          <li><a href="#">Quem Somos</a></li>
          <li><a href="#services">Nossos Serviços</a></li>
          <li><a href="#">Portfólio</a></li>
          <li><a href="#">Nossa Equipe</a></li>
          <li><a href="#footer">Contato</a></li>
          <li><a href="#" id="join-us">Junte-se a Nós</a></li>
        </ul>
      </nav>
    </header>
  )
}