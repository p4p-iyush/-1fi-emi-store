function VariantPills({ variants, selectedVariant, onSelectStorage }) {
  const storageOptions = variants.filter(
    (variant) => variant.color === selectedVariant.color
  );

  return (
    <div className="option-group">
      <p className="option-label">Storage</p>

      <div className="pill-row">
        {storageOptions.map((variant) => (
          <button
            key={variant.id}
            type="button"
            className={`pill ${
              selectedVariant.id === variant.id ? "pill-selected" : ""
            }`}
            onClick={() => onSelectStorage(variant.storage)}
          >
            {variant.storage}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VariantPills;