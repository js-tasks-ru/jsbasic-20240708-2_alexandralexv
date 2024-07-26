function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    const tableRowsEl = table.rows[i];
    if (!tableRowsEl.cells[3].hasAttribute("data-available")) {
      tableRowsEl.setAttribute("hidden", true);
    }

    if (tableRowsEl.cells[3].getAttribute("data-available") == "true") {
      tableRowsEl.classList.add("available");
    } else if (tableRowsEl.cells[3].getAttribute("data-available") == "false") {
      tableRowsEl.classList.add("unavailable");
    }

    if (tableRowsEl.cells[2].textContent == "m") {
      tableRowsEl.classList.add("male");
    } else if (tableRowsEl.cells[2].textContent == "f") {
      tableRowsEl.classList.add("female");
    }

    if (parseInt(tableRowsEl.cells[1].textContent) < 18) {
      tableRowsEl.style.textDecoration = "line-through";
    }
  }
}
