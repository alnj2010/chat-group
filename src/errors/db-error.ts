export default class DBError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "DBError";
  }
}
