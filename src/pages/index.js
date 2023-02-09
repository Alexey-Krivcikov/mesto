import {
  buttonOpenProfilePopup,
  buttonAddCard,
  buttonAddAvatar,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  validationConfig,
} from "../utils/constants.js";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import "./../pages/index.css";
import { data } from "autoprefixer";

/**
 * Функция открытия попапа
 * @param {object} popup - Попап
 * @param {object} popupForm - Форма попапа
 */
const handlePopupOpen = (popup, popupForm) => {
  popupForm.disableSubmitButton();
  popupForm.hideInputErrors();
  popup.open();
};

// Функция включения валидатора
const enableValidation = (settings, formElement) => {
  const validator = new FormValidator(settings, formElement);
  return validator;
};

// функция создания карточки
const createCard = (cardData) => {
  const card = new Card(
    cardData,
    userId,
    "#card-element",
    addLike,
    deleteLike,
    handleDelete,
    handleCardClick
  );
  const cardElement = card.generateCard();
  cardsSection.addItem(cardElement);
  function handleCardClick(cardData) {
    popupImageObj.open(cardData);
  }
  function handleDelete(cardData) {
    popupDeleteCard.setFormSubmitHandler(() => {
      popupDeleteCard.renderLoading(true, "Удаление...", "Да");
      api
        .deleteCard(cardData._id)
        .then(() => {
          card.deleteCard();
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupDeleteCard.renderLoading(false, "Удаление...", "Да");
        });
    });
    popupDeleteCard.open();
  }
  function addLike(cardId) {
    api
      .addLike(cardId)
      .then((data) => {
        // console.log(data.likes);
        card.updateLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteLike(cardId) {
    api
      .deleteLike(cardId)
      .then((data) => {
        // console.log(data.likes);
        card.updateLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "13de05b0-eaab-40cb-aa9f-faea16b25706",
    "Content-Type": "application/json",
  },
});

// данные пользователя
const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__subtitle",
  avatar: ".profile__avatar",
});

// Попап карточки на весь экран
const popupImageObj = new PopupWithImage(".popup_type_card-open");
popupImageObj.setEventListeners();

// попап подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirmation({
  popupSelector: ".popup_type_delete",
});
popupDeleteCard.setEventListeners();

// попап добавления новой карточки
const popupCardAdd = new PopupWithForm(".popup_type_card-add", (cardData) => {
  popupCardAdd.renderLoading(true);
  api
    .addNewCard(cardData)
    .then((cardData) => {
      createCard(cardData);
      popupCardAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCardAdd.renderLoading(false);
    });
});
popupCardAdd.setEventListeners();

// попап изменения профиля
const popupProfileEdit = new PopupWithForm(
  ".popup_type_profile-info",
  (formData) => {
    popupProfileEdit.renderLoading(true);
    api
      .setUserInfo(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
        popupProfileEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupProfileEdit.renderLoading(false));
  }
);
popupProfileEdit.setEventListeners();

// попап аватара
const popupAvatar = new PopupWithForm(".popup_type_avatar", (avatarData) => {
  popupAvatar.renderLoading(true);
  api
    .setAvatar(avatarData)
    .then((avatarData) => {
      userInfo.setUserInfo(avatarData);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
});
popupAvatar.setEventListeners();

// добавление карточек на страницу
const cardsSection = new Section(
  {
    renderer: (cardData) => {
      createCard(cardData);
    },
  },
  ".cards__list"
);

// валидация добавления карточки
const formAddCardValidation = enableValidation(validationConfig, formAddCard);
formAddCardValidation.enableValidation();

// Валидация попапа изменения профиля
const formEditProfiledValidation = enableValidation(
  validationConfig,
  formEditProfile
);
formEditProfiledValidation.enableValidation();

const formEditAvatarValidation = enableValidation(
  validationConfig,
  formEditAvatar
);
formEditAvatarValidation.enableValidation();

let userId = "";

// получаем от сервера карточки и данные пользователя
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardsSection.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

// слушатель попапа добавления карточки
buttonAddCard.addEventListener("click", () => {
  handlePopupOpen(popupCardAdd, formAddCardValidation);
});

// слушатель попапа изменения профиля
buttonOpenProfilePopup.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  popupProfileEdit.setInputValues(userData);
  handlePopupOpen(popupProfileEdit, formEditProfiledValidation);
});

// слушатель попапа аватара
buttonAddAvatar.addEventListener("click", () => {
  handlePopupOpen(popupAvatar, formEditAvatarValidation);
});
