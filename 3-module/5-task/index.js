function getMinMax(str) {
  let arr = str
    .split(" ")
    .filter((item) => parseFloat(item))
    .map((item) => parseFloat(item));
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  };
}
