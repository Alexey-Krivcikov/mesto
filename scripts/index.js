let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-btn');
let closeBtn = document.querySelector('.popup__close-btn');
let popupForm = document.querySelector('.popup__form');
let nameInput = popupForm.querySelector('.popup__input_type_name');
let jobInput = popupForm.querySelector('.popup__input_type_job');
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__subtitle');

// ! Открытие и закрытие popup'a
function showPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

// ! Редактирование и сохранение данных в popup'e
function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup();
}

editBtn.addEventListener('click', showPopup);
closeBtn.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
