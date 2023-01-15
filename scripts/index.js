import {
  buttonOpenProfilePopup,
  buttonAddCard,
  formEditProfile,
  formAddCard,
  inputUserName,
  inputUserDescription,
  validationConfig,
  listCards,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// Функция создания валидатора
const createValidation = (settings, formElement) => {
  const validator = new FormValidator(settings, formElement);
  return validator;
};

// Попап изменения профиля
const formEditProfiledValidation = createValidation(
  validationConfig,
  formEditProfile
);
formEditProfiledValidation.enableValidation();

const userInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__subtitle",
});

const popupProfileEdit = new PopupWithForm(".popup_type_profile-info", () => {
  userInfo.setUserInfo(inputUserName, inputUserDescription);
});

popupProfileEdit.setEventListeners();

buttonOpenProfilePopup.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  inputUserName.value = userData.name;
  inputUserDescription.value = userData.description;

  formEditProfiledValidation.disableSubmitButton();
  formEditProfiledValidation.hideInputErrorWithOpening();

  popupProfileEdit.open();
});

// Попап добавление карточки
const popupImageObj = new PopupWithImage(".popup_type_card-open");
// функция создания карточки
const createCard = (item) => {
  return new Card(
    {
      cardData: item,
      handleCardClick: () => {
        popupImageObj.open(item);
      },
    },
    "#card-element"
  );
};

const cardArr = new Section(
  {
    items: listCards,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardArr.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardArr.renderItems();

const formAddCardValidation = createValidation(validationConfig, formAddCard);
formAddCardValidation.enableValidation();

const popupCardAdd = new PopupWithForm(".popup_type_card-add", (items) => {
  const card = createCard(items);
  const cardElement = card.generateCard();
  cardArr.addItem(cardElement);
});

buttonAddCard.addEventListener("click", () => {
  formAddCardValidation.disableSubmitButton();
  formAddCardValidation.hideInputErrorWithOpening();
  popupCardAdd.open();
});
