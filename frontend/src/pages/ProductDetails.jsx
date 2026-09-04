import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb.jsx";
import ColorSwatches from "../components/ColorSwatches.jsx";
import VariantPills from "../components/VariantPills.jsx";
import EmiPlanList from "../components/EmiPlanList.jsx";
import { API_URL, formatINR } from "../constants";

function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const foundProduct = res.data.find((item) => item.slug === slug);

        if (!foundProduct) {
          navigate("/");
          return;
        }

        setProduct(foundProduct);
        setSelectedVariant(foundProduct.variants[0]);
        setSelectedPlan(foundProduct.variants[0]?.emi_plans[0]);
      })
      .catch((err) => console.error(err));
  }, [slug, navigate]);

  if (!product || !selectedVariant) {
    return <div className="loading">Loading…</div>;
  }

  const emiPlans = selectedVariant.emi_plans || [];

  function handleSelectColor(color) {
    const sameStorage = product.variants.find(
      (v) => v.color === color && v.storage === selectedVariant.storage
    );
    const nextVariant =
      sameStorage || product.variants.find((v) => v.color === color);

    setSelectedVariant(nextVariant);
    setSelectedPlan(nextVariant.emi_plans[0]);
  }

  function handleSelectStorage(storage) {
    const nextVariant = product.variants.find(
      (v) => v.color === selectedVariant.color && v.storage === storage
    );

    setSelectedVariant(nextVariant);
    setSelectedPlan(nextVariant.emi_plans[0]);
  }

  return (
    <div className="details-page">
      <div className="container">
        <Breadcrumb productName={product.name} />

        <div className="details-grid">
          <div className="details-media">
            <div className="details-image-frame">
              <img src={selectedVariant.image_url} alt={product.name} />
            </div>

            <ColorSwatches
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectColor={handleSelectColor}
            />

            <VariantPills
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectStorage={handleSelectStorage}
            />
          </div>

          <div className="details-purchase">
            <h1 className="details-title">{product.name}</h1>
            <p className="details-subtitle">
              {selectedVariant.color}, {selectedVariant.storage}
            </p>

            <p className="social-proof">70+ bought this week</p>

            <div className="price-block">
              <span className="details-price">
                {formatINR(selectedVariant.price)}
              </span>
              {Number(selectedVariant.mrp) > Number(selectedVariant.price) && (
                <span className="details-mrp">
                  {formatINR(selectedVariant.mrp)}
                </span>
              )}
            </div>

            <div className="emi-box">
              <h2>Choose your EMI plan</h2>

              <EmiPlanList
                plans={emiPlans}
                selectedPlan={selectedPlan}
                onSelectPlan={setSelectedPlan}
              />

              <button
                className="buy-button"
                disabled={!selectedPlan}
                onClick={() =>
                  alert(`Selected ${selectedPlan.tenure} months EMI`)
                }
              >
                Buy on {selectedPlan?.tenure}-month EMI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;