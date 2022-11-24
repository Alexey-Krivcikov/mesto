const popup = document.querySelector('.popup');
const popupCard = document.querySelector('.popup_type_card')
const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const closeBtns = document.querySelectorAll('.popup__close-btn');
const popups = document.querySelectorAll('.popup');
const popupForm = document.querySelector('.popup__form');
const nameInput = popupForm.querySelector('.popup__input_type_name');
const jobInput = popupForm.querySelector('.popup__input_type_job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__subtitle');
const cardTemplate = document.querySelector('#card-element').content;
const cardList = document.querySelector('.cards__list');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// ! Добавление карточек по умолчанию
for (let i = 0; i < initialCards.length; i++) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').setAttribute('src', initialCards[i].link);
  cardElement.querySelector('.card__title').textContent = initialCards[i].name;
  cardList.append(cardElement);
}
// ! Кнопка лайка
let likeBtns = cardList.querySelectorAll('.card__like-btn');

const likeActive = function (evt) {
  evt.target.classList.toggle('card__like-btn_active');
}

// ! Открытие и закрытие popup'a
const showPopup = function() {
  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

const showCardPopup = function() {
  popupCard.classList.add('popup_opened');
}

const closePopup = function() {
  popups.forEach(popup => {
    popup.classList.remove('popup_opened');
  });
}

// ! Редактирование и сохранение данных в popup'e
const formSubmitHandler = function (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup();
}
// ! Добавление новой карточки
const cardAdd = function(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').setAttribute('src', popupCard.querySelector('.popup__input_type_card-link').value);
  cardElement.querySelector('.card__title').textContent = popupCard.querySelector('.popup__input_type_card-name').value;
  cardList.insertBefore(cardElement, cardList.firstChild);
  closePopup();
}
// ! Слушатели событий
editBtn.addEventListener('click', showPopup);
popupForm.addEventListener('submit', formSubmitHandler);
addBtn.addEventListener('click', showCardPopup);
popupCard.addEventListener('submit', cardAdd);
closeBtns.forEach(button => {
  button.addEventListener('click', closePopup);
});
likeBtns.forEach(button => {
  button.addEventListener('click', likeActive);
})

