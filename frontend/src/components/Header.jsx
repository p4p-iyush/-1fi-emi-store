import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="wordmark">
        Emico
      </Link>
      <p className="site-tagline">Phones today, pay monthly</p>
    </header>
  );
}

export default Header;