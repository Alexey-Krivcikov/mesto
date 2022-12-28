import listCards from "./cards.js";
import { FormValidator, form } from "./FormValidator.js";
import { Card } from "./Card.js";

const page = document.querySelector(".page");

const popupEditProfile = document.querySelector(".popup_type_profile-info");
const popupAddCard = document.querySelector(".popup_type_card-add");
const popups = document.querySelectorAll(".popup");

const buttonOpenProfilePopup = document.querySelector(".profile__edit-btn");
const buttonAddCard = document.querySelector(".profile__add-btn");

const formEditProfile = popupEditProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");

const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_job");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__subtitle");

const cardName = popupAddCard.querySelector(".popup__input_type_card-name");
const cardLink = popupAddCard.querySelector(".popup__input_type_card-link");

const cardListElement = document.querySelector(".cards__list");

// ! Добавление стартовых карточек
listCards.forEach((cardItem) => {
  const card = new Card(cardItem, "#card-element");
  const cardElement = card.generateCard();
  document.querySelector(".cards__list").append(cardElement);
});

// ! Функция открытия формы добавления карточки
const handleCardFormSubmit = function (evt) {
  evt.preventDefault();
  const cardElement = {
    name: cardName.value,
    link: cardLink.value,
  };
  const newCard = new Card(cardElement, "#card-element");
  const newCardElement = newCard.generateCard();
  cardListElement.prepend(newCardElement);
  closePopup(popupAddCard);
  formAddCard.reset();
};

// ! Функция открытия формы редактирования профиля
const handleOpenPopupProfile = function () {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popupEditProfile);
};

// ! Функция сохранения данных пользователя
const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

// ! Закрытие попапа на Esc
const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

// ! Функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  page.addEventListener("keydown", closeByEsc);
};

// ! Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  page.removeEventListener("keydown", closeByEsc);
};

// ! Валидация
new FormValidator(form, formEditProfile).enableValidation();
new FormValidator(form, formAddCard).enableValidation();

// ! Слушатели событий
buttonOpenProfilePopup.addEventListener("click", handleOpenPopupProfile);
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  const submitBtn = popupAddCard.querySelector(".popup__btn");
  submitBtn.setAttribute("disabled", "disabled");
  submitBtn.classList.add("popup__btn_inactive");
});
formAddCard.addEventListener("submit", handleCardFormSubmit);

// ! Закрытие попапа
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-btn")) {
      closePopup(popup);
    }
  });
});
