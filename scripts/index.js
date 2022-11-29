import listCards from './cards.js';

const popupEditProfile = document.querySelector('.popup_type_profile-info');
const popupAddCard = document.querySelector('.popup_type_card-add')
const popupShowCardImg = document.querySelector('.popup_type_card-open');

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



