export default class ValidatorError extends Error {
  constructor(public messages: Array<string>) {
    super(messages.toString());
    this.name = "ValidatorError";
  }
}
