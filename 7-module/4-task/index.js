import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.createSlider();
    this.segments = steps - 1;
    this.setValue(value);
    this.ClickOnSlider();
    this.addDragEvent(); // Добавляем поддержку перетаскивания
  }

  createSlider() {
    this.elem = createElement(`
      <!--Корневой элемент слайдера-->
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: 0%;">
          <span class="slider__value">0</span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress" style="width: 0%;"></div>

        <!--Шаги слайдера-->
        <div class="slider__steps">
          ${"<span></span>".repeat(this.steps)}
        </div>
      </div>
    `);

    this.elem
      .querySelector(".slider__steps")
      .children[0].classList.add("slider__step-active");
  }

  ClickOnSlider() {
    this.elem.addEventListener("click", (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let approximateValue = leftRelative * this.segments;
      let value = Math.round(approximateValue);

      this.setValue(value);

      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: value,
          bubbles: true,
        })
      );
    });
  }

  addDragEvent() {
    const thumb = this.elem.querySelector(".slider__thumb");

    thumb.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      this.elem.classList.add("slider_dragging");
      document.addEventListener("pointermove", this.onPointerMove);
      document.addEventListener("pointerup", this.onPointerUp);
    });
  }

  onPointerMove = (event) => {
    event.preventDefault();

    let newLeft =
      (event.clientX - this.elem.getBoundingClientRect().left) /
      this.elem.offsetWidth;

    if (newLeft < 0) {
      newLeft = 0;
    }
    if (newLeft > 1) {
      newLeft = 1;
    }

    this.elem.querySelector(".slider__thumb").style.left = `${newLeft * 100}%`;
    this.elem.querySelector(".slider__progress").style.width = `${
      newLeft * 100
    }%`;

    this.value = Math.round(this.segments * newLeft);
    this.elem.querySelector(".slider__value").innerHTML = this.value;

    if (this.elem.querySelector(".slider__step-active")) {
      this.elem
        .querySelector(".slider__step-active")
        .classList.remove("slider__step-active");
    }

    this.elem
      .querySelector(".slider__steps")
      .children[this.value].classList.add("slider__step-active");
  };

  onPointerUp = () => {
    document.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPointerUp);

    this.elem.classList.remove("slider_dragging");

    this.elem.querySelector(".slider__thumb").style.left = `${
      (this.value / this.segments) * 100
    }%`;
    this.elem.querySelector(".slider__progress").style.width = `${
      (this.value / this.segments) * 100
    }%`;

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  };

  setValue(value) {
    const percentage = (value / this.segments) * 100;

    const thumbEl = this.elem.querySelector(`.slider__thumb`);
    const progressEl = this.elem.querySelector(`.slider__progress`);
    const valueEl = this.elem.querySelector(`.slider__value`);
    const stepsEl = this.elem.querySelector(`.slider__steps`);

    thumbEl.style.left = `${percentage}%`;
    progressEl.style.width = `${percentage}%`;
    valueEl.innerHTML = value;

    stepsEl
      .querySelector(".slider__step-active")
      ?.classList.remove("slider__step-active");
    stepsEl.children[value].classList.add("slider__step-active");
  }
}
