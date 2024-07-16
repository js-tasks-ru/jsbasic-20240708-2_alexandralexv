function sumSalary(salaries) {
  return Object.values(salaries).filter((item) => typeof(item) == "number" && !isNaN(item) && isFinite(item)).reduce((sum, item) => sum + item, 0)
}
