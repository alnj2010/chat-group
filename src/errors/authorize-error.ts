export default class AuthorizeError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "AuthorizeError";
  }
}
