export class ConversationIdLocalStorage {
  static keyName = "conversationId";

  static get() {
    const userLocalId = localStorage.getItem(this.keyName);
    return userLocalId;
  }

  static set() {
    const id = crypto.randomUUID();
    localStorage.setItem(this.keyName, id);

    return id;
  }
}
