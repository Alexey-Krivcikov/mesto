import listCards from "./cards.js";
import { FormValidator, validationConfig } from "./FormValidator.js";
import { Card } from "./Card.js";
import { openPopup, closePopup } from "./utils.js";

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

// ! Функция создания карточки
const createCard = (cardData, templateSelector) => {
  const card = new Card(cardData, templateSelector);
  return card;
};

// ! Функция создания валидатора
const createValidation = (settings, formElement) => {
  const validator = new FormValidator(settings, formElement);
  return validator;
};

// ! Добавление стартовых карточек
listCards.forEach((cardItem) => {
  const card = createCard(cardItem, "#card-element");
  const cardElement = card.generateCard();
  cardListElement.append(cardElement);
});

// ! Функция открытия формы добавления карточки
const handleCardFormSubmit = function (evt) {
  evt.preventDefault();
  const cardElement = {
    name: cardName.value,
    link: cardLink.value,
  };
  const newCard = createCard(cardElement, "#card-element");
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

// ! Валидация
const formProfileValidation = createValidation(
  validationConfig,
  formEditProfile
);
const formAddCardValidation = createValidation(validationConfig, formAddCard);

formProfileValidation.enableValidation();
formAddCardValidation.enableValidation();

// ! Слушатели событий
buttonOpenProfilePopup.addEventListener("click", () => {
  handleOpenPopupProfile();
  formProfileValidation.hideInputErrorWithOpening();
  formProfileValidation.disableSubmitButton();
});
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  formAddCardValidation.hideInputErrorWithOpening();
  formAddCardValidation.disableSubmitButton();
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
