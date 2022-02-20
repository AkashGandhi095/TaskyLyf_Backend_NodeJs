module.exports = class UserAuthData {
  constructor(userName, password, userId) {
    this.userName = userName;
    this.password = password;
    this.userId = userId;
  }

  printUserDetails() {
    console.log(this.userName, this.password, this.userId);
  }
};
