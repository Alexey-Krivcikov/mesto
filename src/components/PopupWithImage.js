import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__img");
    this._description = this._popup.querySelector(".popup__img-desc");
  }

  open({ name, link }) {
    super.open();
    this._image.src = link;
    this._description.textContent = name;
    this._image.alt = name;
  }
}
