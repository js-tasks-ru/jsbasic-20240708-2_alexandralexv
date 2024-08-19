import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.createSlider();
    this.segments = steps - 1;
    this.setValue(value);
    this.ClickOnSlider();
  }

  createSlider() {
    this.elem = createElement(`
      <!--Корневой элемент слайдера-->
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: 50%;">
          <span class="slider__value">2</span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress" style="width: 50%;"></div>

        <!--Шаги слайдера-->
        <div class="slider__steps">
          <span></span>
          <span></span>
          <span class="slider__step-active"></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `);
  }

  ClickOnSlider() {
    this.elem.addEventListener("slider-change", () => {});

    this.elem.addEventListener("click", (event) => {
      // расстояние от начала элемента слайдера до места, на котором находился курсор в момент клика
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      // рассчитаем относительное значение, взяв за основу ширину слайдера
      let leftRelative = left / this.elem.offsetWidth;
      // возьмем полученное значение  и умножим его на количество сегментов
      let approximateValue = leftRelative * this.segments;
      // округлим
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

  setValue(value) {
    const percentage = (value / this.segments) * 100;

    const thumbEl = this.elem.querySelector(`.slider__thumb`);
    const progressEl = this.elem.querySelector(`.slider__progress`);
    const valueEl = this.elem.querySelector(`.slider__value`);
    const stepsEl = this.elem.querySelector(`.slider__steps`);
    const stepsActiveEl = this.elem.querySelector(`.slider__step-active`);

    thumbEl.style.left = `${percentage}%`;
    progressEl.style.width = `${percentage}%`;
    valueEl.innerHTML = value;

    stepsActiveEl.classList.remove("slider__step-active");
    stepsEl.children[value].classList.add("slider__step-active");
  }
}
