// ! Открытие и закрытие popup'a
let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.edit-btn');
let closeBtn = document.querySelector('.popup__close-btn');

function showPopup () {
  popup.classList.add('popup_opened');
}

editBtn.addEventListener('click', showPopup);

function closePopup () {
  popup.classList.remove('popup_opened');
}

closeBtn.addEventListener('click', closePopup);
