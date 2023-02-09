import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._submitBtn = this._popup.querySelector(".popup__btn");
  }

  setFormSubmitHandler(handle) {
    this._handleSubmit = handle;
  }

  renderLoading(
    isLoading,
    loadingMessage = "Сохранение...",
    defaultMessage = "Сохранить"
  ) {
    if (isLoading) {
      this._submitBtn.textContent = loadingMessage;
    } else {
      this._submitBtn.textContent = defaultMessage;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector(".popup__form");
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
