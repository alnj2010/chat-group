export default class FormValidationError extends Error {
  constructor(public messages: Array<string>) {
    super(messages.toString());
    this.name = "FormValidationError";
  }
}
