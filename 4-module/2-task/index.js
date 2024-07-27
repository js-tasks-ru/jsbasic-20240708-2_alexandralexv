function makeDiagonalRed(table) {
  for (let i = 0; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[0].cells.length; j++) {
      let td = table.rows[i].cells[j].textContent.split(":");
      if (td[0] == td[1]) {
        table.rows[i].cells[j].style.backgroundColor = "red";
      }
    }
  }
}
