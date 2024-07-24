function filterRange(arr, a, b) {
  return arr.filter(
    (item) => (item >= a && item <= b) || (item >= b && item <= a)
  );
}
