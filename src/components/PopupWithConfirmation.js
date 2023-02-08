import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
  }

  setFormSubmitHandler(handle) {
    this._handleSubmit = handle;
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
