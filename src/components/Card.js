export default class Card {
  constructor(
    cardData,
    userId,
    templateSelector,
    addLike,
    deleteLike,
    handleDelete,
    handleCardClick
  ) {
    this._data = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._userId = userId;
    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._deleteLike = deleteLike;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDelete;
    this._addLike = addLike;
    this._element = this._getTemplate();
    this._counter = this._element.querySelector(".card__like-counter");
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
    if (this._ownerId === this._userId) {
      this._cardDelBtn.classList.add("card__del-btn_visible");
    }
    this.isLiked();
    this._counter.textContent = this._likes.length;
    this._cardDescription.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  isLiked() {
    if (this._likes.some((like) => like._id === this._userId)) {
      this._cardLikeBtn.classList.add("card__like-btn_active");
    }
  }

  _handleLike() {
    if (event.target.classList.contains("card__like-btn_active")) {
      event.target.classList.remove("card__like-btn_active");
      this._counter.textContent = this._likes.length -= 1;
      this._deleteLike(this._cardId);
    } else {
      event.target.classList.add("card__like-btn_active");
      this._counter.textContent = this._likes.length += 1;
      this._addLike(this._cardId);
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener("click", () => {
      this._handleLike();
    });
    if (this._ownerId === this._userId) {
      this._cardDelBtn.addEventListener("click", () => {
        this._handleDeleteCard(this._data);
      });
    }
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });
  }
}
