export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
