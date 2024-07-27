function makeFriendsList(friends) {
  const ulEl = document.createElement("UL");

  for (const i of friends) {
    const liEl = document.createElement("LI");
    liEl.textContent = i.firstName + " " + i.lastName;
    ulEl.appendChild(liEl);
  }

  return ulEl;
}
