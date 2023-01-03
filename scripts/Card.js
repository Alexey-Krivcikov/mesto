import { openPopup } from "./utils.js";

const popupShowCardImg = document.querySelector(".popup_type_card-open");
const cardImgPopup = popupShowCardImg.querySelector(".popup__img");
const cardDescriptionPopup = popupShowCardImg.querySelector(".popup__img-desc");

// Класс Card
class Card {
  constructor(cardData, templateSelector) {
    this._title = cardData.name;
    this._image = cardData.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImgElement = this._element.querySelector(".card__img");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._title;
    this._cardImgElement.src = this._image;
    this._cardImgElement.alt = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-btn")
      .addEventListener("click", () => {
        this._handleToggleLike();
      });
    this._element
      .querySelector(".card__del-btn")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._element.querySelector(".card__img").addEventListener("click", () => {
      this._handlePopupCardOpen();
    });
  }

  _handleToggleLike() {
    this._element
      .querySelector(".card__like-btn")
      .classList.toggle("card__like-btn_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handlePopupCardOpen() {
    cardImgPopup.src = this._image;
    cardImgPopup.alt = this._title;
    cardDescriptionPopup.textContent = this._title;
    openPopup(popupShowCardImg);
  }
}

export { Card };
