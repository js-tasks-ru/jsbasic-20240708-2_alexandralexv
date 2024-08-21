import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.offsetHeight || !this.elem.offsetWidth) {
      return;
    }

    let container = document.querySelector(".container");
    let containerRect = container.getBoundingClientRect();
    let windowWidth = document.documentElement.clientWidth;

    if (windowWidth <= 767) {
      this.elem.style.position = "";
      this.elem.style.top = "";
      this.elem.style.left = "";
      this.elem.style.zIndex = "";
      return;
    }

    let cartTopCoord = this.elem.getBoundingClientRect().top;
    let scrollY = window.scrollY;

    let leftOffset = containerRect.right + 20;
    let maxRightOffset = windowWidth - this.elem.offsetWidth - 10;

    if (cartTopCoord < 50 || this.elem.style.position === "fixed") {
      this.elem.style.position = "fixed";
      this.elem.style.top = "50px";
      this.elem.style.zIndex = 1000;

      this.elem.style.left = `${Math.min(leftOffset, maxRightOffset)}px`;
    } else {
      let topRelativeToContainer = Math.min(
        scrollY - containerRect.top + 50,
        containerRect.bottom - this.elem.offsetHeight
      );

      this.elem.style.position = "absolute";
      this.elem.style.top = `${topRelativeToContainer}px`;
      this.elem.style.left = `${Math.min(leftOffset, maxRightOffset)}px`;
      this.elem.style.zIndex = "";
    }
  }
}
