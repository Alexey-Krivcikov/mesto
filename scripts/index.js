const popup = document.querySelector('.popup');
const editBtn = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');
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

// ! Добавление карточек
for (let i = 0; i < initialCards.length; i++) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').setAttribute('src', initialCards[i].link);
  cardElement.querySelector('.card__title').textContent = initialCards[i].name;
  cardList.append(cardElement);
}

// ! Открытие и закрытие popup'a
function showPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// ! Редактирование и сохранение данных в popup'e
function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup();
}

editBtn.addEventListener('click', showPopup);
closeBtn.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
