export const colorConverter = (colorCode) => {
  if (colorCode === "trang") {
    return "trắng";
  }
  if (colorCode === "xam") {
    return "xám";
  }
  if (colorCode === "den") {
    return "đen";
  }
  return colorCode;
}

export const colorConverterBack = (color) => {
  if (color === "trắng") {
    return "trang";
  }
  if (color === "xám") {
    return "xam";
  }
  if (color === "đen") {
    return "den";
  }
  return color;
}