export const API_URL = "http://localhost:3000/api/products";

// Rough color-name to swatch-hex map so the color picker can render an
// actual dot instead of plain text. Falls back to a neutral grey dot
// with the first letter of the name if a color isn't listed here.
export const COLOR_SWATCHES = {
  black: "#1c1c1e",
  white: "#f5f5f0",
  silver: "#d6d6d6",
  gold: "#d9c08a",
  "space grey": "#565358",
  "space gray": "#565358",
  graphite: "#54524f",
  blue: "#2c5faa",
  "sky blue": "#8fc0e0",
  navy: "#1b2245",
  green: "#3f6b4f",
  "midnight green": "#3c4b47",
  red: "#a23b3b",
  purple: "#7a6a9e",
  yellow: "#e0b83e",
  pink: "#e3aeb9",
  titanium: "#8a8886",
};

export function swatchColor(name = "") {
  return COLOR_SWATCHES[name.trim().toLowerCase()] || "#9b9890";
}

export function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}