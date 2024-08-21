import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.createRibbon();
  }

  createRibbon() {
    const ribbon = createElement(`
      <!--Корневой элемент RibbonMenu-->
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <!--Ссылки на категории-->
        <nav class="ribbon__inner">
        </nav>

        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
      `);
    this.createCategories(ribbon);
    this.ribbonShift(ribbon);
    this.addToBascet(ribbon);
    return ribbon;
  }

  addToBascet(ribbon) {
    const ribbonList = ribbon.querySelector(".ribbon__inner");

    ribbonList.addEventListener("ribbon-select", (event) => {
      const ribbonActive = ribbon.querySelector(".ribbon__item_active");
      if (ribbonActive) {
        ribbonActive.classList.remove("ribbon__item_active");
      }
      const categoryEl = ribbon.querySelector(
        `.ribbon__item[data-id="${event.detail}"]`
      );
      categoryEl.classList.add("ribbon__item_active");
    });

    ribbonList.addEventListener("click", (event) => {
      const { target } = event;
      const ce = new CustomEvent("ribbon-select", {
        detail: target.dataset.id,
        bubbles: true,
      });

      ribbonList.dispatchEvent(ce);
    });
  }

  createCategories(ribbon) {
    const innerEl = ribbon.querySelector(".ribbon__inner");

    for (let i = 0; i < this.categories.length; i++) {
      let categorie = this.categories[i];

      let card;

      if (categorie.id == "") {
        card = createElement(`
          <a href="#" class="ribbon__item ribbon__item_active" data-id="${categorie.id}">${categorie.name}</a>
          `);
      } else {
        card = createElement(`
          <a href="#" class="ribbon__item" data-id="${categorie.id}">${categorie.name}</a>
          `);
      }

      innerEl.appendChild(card);
    }
  }

  ribbonShift(ribbon) {
    const ribbonEl = ribbon.querySelector(".ribbon__inner");
    const buttonRightEl = ribbon.querySelector(".ribbon__arrow_right");
    const buttonLeftEl = ribbon.querySelector(".ribbon__arrow_left");

    ribbonEl.addEventListener("scroll", function () {
      let scrollRight =
        ribbonEl.scrollWidth - ribbonEl.scrollLeft - ribbonEl.clientWidth;

      if (scrollRight < 1) {
        buttonRightEl.classList.remove("ribbon__arrow_visible");
      } else if (ribbonEl.scrollLeft == 0) {
        buttonLeftEl.classList.remove("ribbon__arrow_visible");
      } else {
        buttonRightEl.classList.add("ribbon__arrow_visible");
        buttonLeftEl.classList.add("ribbon__arrow_visible");
      }
    });

    buttonLeftEl.addEventListener("click", () => {
      ribbonEl.scrollBy(-350, 0);
    });

    buttonRightEl.addEventListener("click", () => {
      ribbonEl.scrollBy(350, 0);
    });
  }
}
