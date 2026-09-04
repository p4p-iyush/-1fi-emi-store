import { Link } from "react-router-dom";

function Breadcrumb({ productName }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Shop</Link>
      <span>/</span>
      <span>Smartphones</span>
      <span>/</span>
      <span aria-current="page">{productName}</span>
    </nav>
  );
}

export default Breadcrumb;  