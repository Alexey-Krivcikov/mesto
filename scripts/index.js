import listCards from './cards.js';


const page = document.querySelector('.page');

const popupEditProfile = document.querySelector('.popup_type_profile-info');
const popupAddCard = document.querySelector('.popup_type_card-add')
const popupShowCardImg = document.querySelector('.popup_type_card-open');
const popups = document.querySelectorAll('.popup');

const buttonOpenProfilePopup = document.querySelector('.profile__edit-btn');
const buttonAddCard = document.querySelector('.profile__add-btn');

const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');


const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__subtitle');

const buttonsClosePopup = document.querySelectorAll('.popup__close-btn');

const cardName = popupAddCard.querySelector('.popup__input_type_card-name');
const cardLink = popupAddCard.querySelector('.popup__input_type_card-link');

const cardImgPopup = popupShowCardImg.querySelector('.popup__img');
const cardDescriptionPopup = popupShowCardImg.querySelector('.popup__img-desc');

const cardListElement = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-element').content.querySelector('.card');


// ! Функция создает карточку
const createCard = function (cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like-btn');
  const cardDeleteBtn = cardElement.querySelector('.card__del-btn');
  const cardImg = cardElement.querySelector('.card__img');

  cardLikeBtn.addEventListener('click', () => {
    cardLikeBtn.classList.toggle('card__like-btn_active');
  });
  cardDeleteBtn.addEventListener('click', () => {
    cardDeleteBtn.closest('.card').remove();
  });
  cardImg.addEventListener('click', () => handleOpenPopupCard(cardData));

  cardImg.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImg.alt = cardTitle.textContent;

  return cardElement;
};

// ! Функция открывает попап изображения карточки
const handleOpenPopupCard = (cardData) => {
  openPopup(popupShowCardImg);
  cardImgPopup.src = cardData.link;
  cardImgPopup.alt = cardData.name;
  cardDescriptionPopup.textContent = cardData.name;
};

// ! Функция создает карточку и вставляет её
const renderCard = (cardData, wrapperElement) => {
  const cardElement = createCard(cardData);
  wrapperElement.append(cardElement);
};

// ! Добавление стартовых карточек
listCards.forEach(function (cardData) {
  renderCard(cardData, cardListElement);
});

// ! Функция открытия формы добавления карточки
const handleCardFormSubmit = function (evt) {
  evt.preventDefault();
  const cardElement = {
    name: cardName.value,
    link: cardLink.value
  };
  cardListElement.prepend(createCard(cardElement));
  closePopup(popupAddCard);
  formAddCard.reset();
};

// ! Функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

// ! Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
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

// !!! Валидация
const showInputError = (formElement, inputElement, errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_err');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-err_active');
}

const hideInputError = (formElement, inputElement) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_err');
  formError.classList.remove('popup__input-err_active');
  formError.textContent = '';
}

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__btn_inactive');
  } else {
    buttonElement.classList.remove('popup__btn_inactive');
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__btn');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach(formElement => {
    setEventListeners(formElement);
  })
}

enableValidation();

// ! Слушатели событий
buttonOpenProfilePopup.addEventListener('click', handleOpenPopupProfile);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));
formAddCard.addEventListener('submit', handleCardFormSubmit);

buttonsClosePopup.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

// ! Закрытие попапа на Esc

page.addEventListener('keydown', (evt) => {
  popups.forEach(popup => {
    if (evt.key === 'Escape') {
      closePopup(popup)
    }
  });
});

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});
