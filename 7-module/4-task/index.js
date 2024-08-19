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
    this.elem.addEventListener("slider-change", () => {});

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

      const onPointerMove = (event) => {
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = Math.max(
          0,
          Math.min(left / this.elem.offsetWidth, 1)
        );
        let value = Math.round(leftRelative * this.segments);

        this.setValue(value);

        this.elem.dispatchEvent(
          new CustomEvent("slider-change", {
            detail: value,
            bubbles: true,
          })
        );
      };

      const onPointerUp = () => {
        this.elem.classList.remove("slider_dragging");
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    });
  }

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
