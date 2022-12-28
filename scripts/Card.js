// Класс Card
class Card {
  constructor(cardData, templateSelector) {
    this._title = cardData.name;
    this._image = cardData.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._title;
    this._element.querySelector(".card__img").src = this._image;
    this._element.querySelector(".card__img").alt = this._title;

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
  }

  _closeByEsc(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      openedPopup.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._closeByEsc);
    }
  }

  _popupOpen(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => this._closeByEsc(evt));
  }

  _handlePopupCardOpen() {
    const popupShowCardImg = document.querySelector(".popup_type_card-open");

    const cardImgPopup = popupShowCardImg.querySelector(".popup__img");
    const cardDescriptionPopup =
      popupShowCardImg.querySelector(".popup__img-desc");

    cardImgPopup.src = this._image;
    cardImgPopup.alt = this._title;
    cardDescriptionPopup.textContent = this._title;
    this._popupOpen(popupShowCardImg);
  }
}

export { Card };
