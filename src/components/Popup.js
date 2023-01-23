export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector(".popup__close-btn");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close = () => {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  setEventListeners() {
    this._popup.addEventListener("click", this._handleCloseByOverlay);
    this._popupCloseBtn.addEventListener("click", this.close);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleCloseByOverlay = (evt) => {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  };
}
