let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.edit-btn');
let closeBtn = document.querySelector('.popup__close-btn');

let popupForm = document.querySelector('.popup__form');
let nameInput = popupForm.querySelector('.popup__input_type_name');
let jobInput = popupForm.querySelector('.popup__input_type_job');

let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__subtitle');

nameInput.value = userName.textContent;
jobInput.value = userJob.textContent;

// ! Открытие и закрытие popup'a
function showPopup () {
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

editBtn.addEventListener('click', showPopup);
closeBtn.addEventListener('click', closePopup);

// ! Редактирование и сохранение данных в popup'e
function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameInputValue = nameInput.value;
  let nameInputJob = jobInput.value;

  userName.textContent = nameInputValue;
  userJob.textContent = nameInputJob;

  popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', formSubmitHandler);
