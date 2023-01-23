export default class UserInfo {
  constructor(userSelectors) {
    this._userName = document.querySelector(userSelectors.userName);
    this._userDescription = document.querySelector(userSelectors.userJob);
  }

  getUserInfo() {
    this._userInfo = {
      userName: this._userName.textContent,
      userJob: this._userDescription.textContent,
    };

    return this._userInfo;
  }

  setUserInfo(formData) {
    this._userName.textContent = formData.userName;
    this._userDescription.textContent = formData.userJob;
  }
}
