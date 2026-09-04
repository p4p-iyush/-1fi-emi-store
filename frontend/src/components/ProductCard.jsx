import { Link } from "react-router-dom";
import { formatINR } from "../constants";

function lowestMonthlyEmi(variant) {
  if (!variant?.emi_plans?.length) return null;
  return variant.emi_plans.reduce((min, plan) =>
    Number(plan.monthly_emi) < Number(min.monthly_emi) ? plan : min
  );
}

function ProductCard({ product }) {
  const variant = product.variants[0];
  const cheapestPlan = lowestMonthlyEmi(variant);

  return (
    <Link to={`/products/${product.slug}`} className="product-card">
      <div className="product-card-image">
        <img src={variant?.image_url} alt={product.name} loading="lazy" />
      </div>

      <div className="product-card-body">
        <h2>{product.name}</h2>
        <p className="product-card-variant">
          {variant?.color}, {variant?.storage}
        </p>

        <div className="product-card-price-row">
          <span className="price">{formatINR(variant?.price)}</span>
          {variant?.mrp && Number(variant.mrp) > Number(variant.price) && (
            <span className="mrp">{formatINR(variant.mrp)}</span>
          )}
        </div>

        {cheapestPlan && (
          <p className="product-card-emi">
            or {formatINR(cheapestPlan.monthly_emi)}/mo for{" "}
            {cheapestPlan.tenure} months
          </p>
        )}

        <span className="product-card-cta">View EMI plans</span>
      </div>
    </Link>
  );
}

export default ProductCard;