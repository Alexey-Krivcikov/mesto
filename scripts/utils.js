// ! Закрытие попапа на Esc
const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

// ! Функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
};

// ! Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
};

export { openPopup, closePopup };
