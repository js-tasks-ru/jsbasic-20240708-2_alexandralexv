function camelize(str) {
  let arr = str.split("-");
  let world = arr[0];
  for (let i = 1; i < arr.length; i++) {
    world += arr[i][0].toUpperCase() + arr[i].slice(1);
  }
  return world;
}
