import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._submitBtn = this._popup.querySelector(".popup__button");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setInputValues(formData) {
    this._inputList.forEach((input) => {
      input.value = formData[input.name];
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      evt.target.reset();
      this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
