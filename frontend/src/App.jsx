import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;