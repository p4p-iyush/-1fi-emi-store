import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { API_URL } from "../constants.js";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <Header />

      {loading && <p className="loading">Loading phones…</p>}

      {!loading && products.length === 0 && (
        <p className="empty-state">No products available right now.</p>
      )}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;