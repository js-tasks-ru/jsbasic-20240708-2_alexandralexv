import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.createInner();
  }

  createInner() {
    const carousel = createElement(`
      <div class="carousel">

        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
        </div>
      </div>
    `);

    this.createCard(carousel);
    this.carouselShift(carousel);
    this.addToBascet(carousel);
    return carousel;
  }

  createCard(carousel) {
    const innerEl = carousel.querySelector(".carousel__inner");

    for (let i = 0; i < this.slides.length; i++) {
      let slide = this.slides[i];

      const card = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${
            slide.image
          }" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      innerEl.appendChild(card);
    }
  }
  addToBascet(carousel) {
    const carouselList = carousel.querySelector(".carousel__inner");

    carouselList.addEventListener("product-add", (event) => {
      let dish = event.detail;
    });

    carouselList.addEventListener("click", ({ target }) => {
      let btn = target.closest("button");

      if (btn) {
        let product = btn.closest("div[data-id]").getAttribute("data-id");

        const ce = new CustomEvent("product-add", {
          detail: product,
          bubbles: true,
        });

        carouselList.dispatchEvent(ce);
      }
    });
  }

  carouselShift(carousel) {
    let countSlide = this.slides.length - 1;

    const carouselEl = carousel.querySelector(".carousel__inner");
    const buttonRightEl = carousel.querySelector(".carousel__arrow_right");
    const buttonLeftEl = carousel.querySelector(".carousel__arrow_left");

    buttonLeftEl.style.display = "none";

    let widthOfEl = 0;

    buttonRightEl.addEventListener("click", function () {
      widthOfEl += -carouselEl.offsetWidth;
      carouselEl.style.transform = `translateX(${widthOfEl}px)`;
      if (widthOfEl == -(carouselEl.offsetWidth * countSlide)) {
        buttonRightEl.style.display = "none";
      } else {
        buttonRightEl.style.display = "";
        buttonLeftEl.style.display = "";
      }
    });

    buttonLeftEl.addEventListener("click", function () {
      widthOfEl += carouselEl.offsetWidth;
      carouselEl.style.transform = `translateX(${widthOfEl}px)`;
      if (widthOfEl == 0) {
        buttonLeftEl.style.display = "none";
      } else {
        buttonLeftEl.style.display = "";
        buttonRightEl.style.display = "";
      }
    });
  }
}
