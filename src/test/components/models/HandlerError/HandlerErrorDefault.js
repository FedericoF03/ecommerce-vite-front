import { IHandlerError } from "./IHandlerError";

export class HandlerErrorDefault extends IHandlerError {
  #error;

  constructor(error) {
    super();
    this.#error = error;
  }

  getError() {
    return this;
  }

  setError(error) {
    this.#error = error;
  }

  execute = () => this;
}
