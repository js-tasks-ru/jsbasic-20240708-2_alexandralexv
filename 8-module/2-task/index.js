import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid extends ProductCard {
  constructor(products) {
    super(products[0]);
    this.products = products;
    this.filters = {};
    this.elem = this.createGrid(products);
    this.obj = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4,
      category: "",
    };
  }
  createGrid(products) {
    const grid = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          ${products
            .map((product) => new ProductCard(product).elem.outerHTML)
            .join("")}
        </div>
      </div>
    `);

    return grid;
  }

  updateFilter(filters) {
    Object.assign(this.obj, filters);

    // console.log(this.obj);
    // console.log(product);

    let filteredProducts = this.products.slice();
    // console.log(filteredProducts);

    filteredProducts = filteredProducts.filter((item) => {
      if (this.obj.category && item.category !== this.obj.category) {
        return false;
      }
      if (item.spiciness && item.spiciness > this.obj.maxSpiciness) {
        return false;
      }
      if (this.obj.noNuts && item.nuts) {
        return false;
      }
      if (this.obj.vegeterianOnly && !item.vegeterian) {
        return false;
      }
      return true;
    });

    const containerEl = document.querySelector("#container");
    containerEl.innerHTML = "";

    this.elem = this.createGrid(filteredProducts);
    containerEl.append(this.elem);

    // console.log(filteredProducts);
  }
}
