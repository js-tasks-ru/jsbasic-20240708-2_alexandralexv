function factorial(n) {
  let s = 1;

  for (let i = 2; i <= n; i++) {
    s *= i;
  }
  return s;
}
