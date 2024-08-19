function initCarousel() {
  const carouselEl = document.querySelector(".carousel__inner");
  const buttonRightEl = document.querySelector(".carousel__arrow_right");
  const buttonLeftEl = document.querySelector(".carousel__arrow_left");

  buttonLeftEl.style.display = "none";

  let widthOfEl = 0;

  buttonRightEl.addEventListener("click", function () {
    widthOfEl += -carouselEl.offsetWidth;
    carouselEl.style.transform = `translateX(${widthOfEl}px)`;
    if (widthOfEl == -(carouselEl.offsetWidth * 3)) {
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
