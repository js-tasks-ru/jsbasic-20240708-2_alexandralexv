import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let findProduct = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (!findProduct) {
      this.cartItems.push({ product, count: 1 });
    } else {
      findProduct.count++;
    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    if (!this.cartItems.length) {
      return;
    }

    let product = this.cartItems.find((item) => item.product.id === productId);

    if (product.count > 0) {
      product.count += amount;
    }

    if (product.count === 0) {
      this.cartItems = this.cartItems.filter(
        (item) => item.product.id !== productId
      );
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return this.cartItems.reduce(
      (totalAmountProduct, item) => (totalAmountProduct += item.count),
      0
    );
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (totalPriceProduct, item) =>
        (totalPriceProduct += item.product.price * item.count),
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();

    this.modal.setTitle("YOUR ORDER");

    const basket = document.querySelector(".cart-icon");
    const divEl = document.createElement("DIV");

    for (const i in this.cartItems) {
      divEl.append(
        this.renderProduct(this.cartItems[i].product, this.cartItems[i].count)
      );
    }

    divEl.addEventListener("click", (e) => {
      const productId = e.target.closest(".cart-product");

      if (e.target.closest(".cart-counter__button_plus")) {
        this.updateProductCount(productId.getAttribute("data-product-id"), 1);
      } else if (e.target.closest(".cart-counter__button_minus")) {
        this.updateProductCount(productId.getAttribute("data-product-id"), -1);
      }

      basket.classList.remove("cart-icon_visible");
    });

    divEl.append(this.renderOrderForm());

    this.modal.setBody(divEl);
    this.modal.open();

    const cartForm = document.querySelector(".cart-form");

    cartForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.onSubmit(e.target);
    });

    this.modal.modalElement.addEventListener("modal-close", () => {
      if (!this.isEmpty()) {
        basket.classList.add("cart-icon_visible");
      }
    });
    this.onProductUpdate(this.cartItems);
    basket.classList.remove("cart-icon_visible");
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains("is-modal-open")) {
      return;
    }

    const modalBody = document.querySelector(".modal__body");

    for (const item of cartItem) {
      const productId = item.product.id;
      const productCard = modalBody.querySelector(
        `[data-product-id="${productId}"]`
      );
      const productCount = modalBody.querySelector(
        `[data-product-id="${productId}"] .cart-counter__count`
      );
      const productPrice = productCard.querySelector(`.cart-product__price`);

      if (productCount && productPrice) {
        if (item.count > 0) {
          productCount.innerHTML = item.count;
          productPrice.innerHTML = `€${(
            item.product.price * item.count
          ).toFixed(2)}`;
        } else {
          productCard.remove();
        }
      }
    }

    const infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
    if (infoPrice) {
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }

    if (this.isEmpty()) {
      this.modal.close();
    }
  }

  async onSubmit(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.classList.add("is-loading");

    const formData = new FormData(form);

    try {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        this.cartItems = [];
        this.cartIcon.update(this);
        this.modal.setTitle("Success!");
        this.modal.setBody(
          createElement(`
            <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>
          `)
        );
      } else {
        console.error("Failed:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // В любом случае убираем класс "is-loading" с кнопки
      submitButton.classList.remove("is-loading");
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
