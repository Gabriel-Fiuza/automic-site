import logo from '../assets/Logo-Branca.png';

export default function Header() {
  const homepage = 'https://automic.vercel.app';

  const goHome = (e) => {
    e.preventDefault();
    window.location.href = homepage;
  };

  const handleAnchor = (e, id) => {
    e.preventDefault();
    const onHomepage = window.location.hostname.includes(new URL(homepage).hostname) || window.location.pathname === '/';
    if (onHomepage) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      window.location.hash = `#${id}`;
      return;
    }
    window.location.href = `${homepage}/#${id}`;
  };

  return (
    <header className="header">
      <a href={homepage} onClick={goHome} style={{ display: 'inline-block' }}>
        <img src={logo} alt="Logo Automic Jr." style={{ cursor: 'pointer' }} />
      </a>
      <nav>
        <ul className="nav-menu">
          <li>
            <a href={homepage} onClick={goHome}>Início</a>
          </li>
          <li>
            <a href="/quem-somos" style={{ textDecoration: 'none' }}>Quem Somos</a>
          </li>
          <li>
            <a href={`${homepage}/#services`} onClick={(e) => handleAnchor(e, 'services')}>Nossos Serviços</a>
          </li>
          <li>
            <a href="#footer" onClick={e => { e.preventDefault(); const el = document.getElementById('footer'); if (el) el.scrollIntoView({behavior: 'smooth'}); }}>Contato</a>
          </li>
          <li>
            <a href="/cursos" style={{ textDecoration: 'none' }}>Cursos</a>
          </li>
          <li>
            <a href={`${homepage}/#footer`} id="join-us" onClick={(e) => handleAnchor(e, 'footer')}>Junte-se a Nós</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}