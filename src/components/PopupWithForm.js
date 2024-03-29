import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._submitBtn = this._popup.querySelector(".popup__btn");
    this._submitBtnDefaultMessage = this._submitBtn.textContent;
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  renderLoading(loadingMessage = "Сохранение...") {
    if (this._submitBtn.textContent === loadingMessage) {
      this._submitBtn.textContent = this._submitBtnDefaultMessage;
    } else {
      this._submitBtn.textContent = loadingMessage;
    }
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
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
