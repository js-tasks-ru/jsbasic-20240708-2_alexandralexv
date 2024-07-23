function showSalary(users, age) {
  let world = "";
  for (const i of users) {
    if (i.age <= age) {
      world += `${i.name + ", " + i.balance}\n`;
    }
  }
  return world.slice(0, world.length - 1); // Убираем перенос, сам в шоке, как я до такого додумался :)
}
// В прошлый раз делал это задание через filter и map ^)
