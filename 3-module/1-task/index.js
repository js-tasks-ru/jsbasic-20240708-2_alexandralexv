function namify(users) {
  let arr = [];
  for (const i in users) {
    arr.push(users[i].name);
  }
  return arr;
}
