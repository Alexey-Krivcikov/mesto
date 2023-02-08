export default class UserInfo {
  constructor(userSelectors) {
    this._userName = document.querySelector(userSelectors.name);
    this._userDescription = document.querySelector(userSelectors.about);
    this._userAvatar = document.querySelector(userSelectors.avatar);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      about: this._userDescription.textContent,
    };

    return this._userInfo;
  }

  setUserInfo(formData) {
    this._userName.textContent = formData.name;
    this._userDescription.textContent = formData.about;
    this._userAvatar.src = formData.avatar;
  }
}
