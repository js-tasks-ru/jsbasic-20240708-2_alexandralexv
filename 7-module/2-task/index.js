import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.modalElement = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
    this.esc = this.esc.bind(this);
  }

  open() {
    document.body.append(this.modalElement);
    document.body.classList.add("is-modal-open");

    this.modalElement
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());

    document.addEventListener("keydown", this.esc);
  }

  close() {
    if (this.modalElement) {
      const event = new CustomEvent("modal-close", {
        bubbles: true,
      });

      this.modalElement.dispatchEvent(event);

      this.modalElement.remove();
      document.body.classList.remove("is-modal-open");
      this.modalElement = null;
    }
    document.removeEventListener("keydown", this.esc);
  }

  setTitle(title) {
    if (this.modalElement) {
      this.modalElement.querySelector(".modal__title").textContent = title;
    }
  }

  setBody(node) {
    if (this.modalElement) {
      const modalBody = this.modalElement.querySelector(".modal__body");
      modalBody.innerHTML = "";
      modalBody.append(node);
    }
  }
  esc(event) {
    if (event.code == "Escape") {
      this.close();
    }
  }
}
