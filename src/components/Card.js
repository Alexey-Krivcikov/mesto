export default class Card {
  constructor({ cardData, handleCardClick }, templateSelector) {
    this._title = cardData.name;
    this._image = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardLikeBtn = this._element.querySelector(".card__like-btn");
    this._cardImage = this._element.querySelector(".card__img");
    this._cardDescription = this._element.querySelector(".card__title");
    this._cardDelBtn = this._element.querySelector(".card__del-btn");
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
    this._cardDescription.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    return this._element;
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener("click", () => {
      this._handleToggleLike();
    });
    this._cardDelBtn.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    this._cardImage.addEventListener("click", this._handleCardClick);
  }

  _handleToggleLike() {
    this._cardLikeBtn.classList.toggle("card__like-btn_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}
