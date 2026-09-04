import { swatchColor } from "../constants";

function ColorSwatches({ variants, selectedVariant, onSelectColor }) {
  const uniqueColors = [];
  variants.forEach((variant) => {
    if (!uniqueColors.some((v) => v.color === variant.color)) {
      uniqueColors.push(variant);
    }
  });

  return (
    <div className="option-group">
      <p className="option-label">
        Color <span className="option-value">{selectedVariant.color}</span>
      </p>

      <div className="swatch-row">
        {uniqueColors.map((variant) => (
          <button
            key={variant.color}
            type="button"
            className={`swatch ${
              selectedVariant.color === variant.color ? "swatch-selected" : ""
            }`}
            style={{ backgroundColor: swatchColor(variant.color) }}
            title={variant.color}
            aria-label={variant.color}
            aria-pressed={selectedVariant.color === variant.color}
            onClick={() => onSelectColor(variant.color)}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorSwatches;