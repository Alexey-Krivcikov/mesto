const popupEditProfile = document.querySelector(".popup_type_profile-info");
const popupAddCard = document.querySelector(".popup_type_card-add");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupDelete = document.querySelector(".popup_type_delete");

const buttonOpenProfilePopup = document.querySelector(".profile__edit-btn");
const buttonAddCard = document.querySelector(".profile__add-btn");
const buttonAddAvatar = document.querySelector(".profile__avatar-btn");

const formEditProfile = popupEditProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");
const formEditAvatar = popupAvatar.querySelector(".popup__form");

const editSubmitBtn = popupEditProfile.querySelector(".popup__btn");
const addCardSubmitBtn = popupAddCard.querySelector(".popup__btn");
const avatarSubmitBtn = popupAvatar.querySelector(".popup__btn");
const deleteSubmitBtn = popupDelete.querySelector(".popup__btn");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn_inactive",
  inputErrorClass: "popup__input_type_err",
  errorClass: "popup__input-err_active",
};

export {
  buttonOpenProfilePopup,
  buttonAddCard,
  formEditProfile,
  formAddCard,
  validationConfig,
  editSubmitBtn,
  addCardSubmitBtn,
  avatarSubmitBtn,
  buttonAddAvatar,
  formEditAvatar,
  deleteSubmitBtn,
};
