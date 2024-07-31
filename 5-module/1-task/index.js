function hideSelf() {
  const buttonEl = document.querySelector(".hide-self-button");
  buttonEl.addEventListener("click", function () {
    buttonEl.hidden = true;
  });
}
