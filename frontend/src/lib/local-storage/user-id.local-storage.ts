export class UserIdLocalStorage {
  static keyName = "userLocalId";

  static get() {
    const userLocalId = localStorage.getItem(this.keyName);
    return userLocalId;
  }

  static set() {
    const id = crypto.randomUUID();
    localStorage.setItem(this.keyName, id);

    return id;
  }

  static setOnlyIfEmpty() {
    const userId = this.get();
    if (userId) return userId;

    return this.set();
  }
}
