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

const cardListElement = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-element').content.querySelector('.card');

const cardsList = [
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


// ! Создание карточки
const createElement = function(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like-btn');
  const cardDeleteBtn = cardElement.querySelector('.card__del-btn');
  const cardImg = cardElement.querySelector('.card__img');

  cardLikeBtn.addEventListener('click', likeActive);
  cardDeleteBtn.addEventListener('click', removeCard);

  cardImg.src = item.link;
  cardTitle.textContent = item.name;

  return cardElement;
}

// ! функции кнопок удаления и лайка
const likeActive = function (evt) {
  evt.target.classList.toggle('card__like-btn_active');
}

const removeCard = function(evt) {
  evt.target.closest('.card').remove()
}

// ! функция создает элемент и добавляет его
const renderElement = (item, wrapElement) => {
  const element = createElement(item);
  wrapElement.append(element);
}

cardsList.forEach(function(item) {
  renderElement(item, cardListElement);
})

// ! функция добавления карточки
const cardAdd = function(evt) {
  evt.preventDefault();
  const cardElement = {
    name: popupCard.querySelector('.popup__input_type_card-name').value,
    link: popupCard.querySelector('.popup__input_type_card-link').value
  };
  cardListElement.insertBefore(createElement(cardElement), cardListElement.firstChild);
  closePopup();
}


// ! Попап карточки
const popupCardOpen = document.querySelector('.popup_type_card-open');
const cardsImg = document.querySelectorAll('.card__img');
const showCardPopupImg = function(evt) {
  popupCardOpen.classList.add('popup_opened');
  const srcImg = evt.target.getAttribute('src');
  const ImgDescr = evt.target.closest('.card').querySelector('.card__title').textContent
  popupCardOpen.querySelector('.popup__img').setAttribute('src', srcImg);
  popupCardOpen.querySelector('.popup__img-desc').textContent = ImgDescr
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


// ! Слушатели событий
editBtn.addEventListener('click', showPopup);
popupForm.addEventListener('submit', formSubmitHandler);
closeBtns.forEach(button => {
  button.addEventListener('click', closePopup);
});
addBtn.addEventListener('click', showCardPopup);
popupCard.addEventListener('submit', cardAdd);

cardsImg.forEach(card => {
  card.addEventListener('click', showCardPopupImg)
});


