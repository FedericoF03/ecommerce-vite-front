import { IRequest } from "./Request";

export class Fetcher extends IRequest {
  #url = "empty";
  #options = {};
  response = {};

  constructor(url, options) {
    super();
    this.#url = url;
    this.#options = options;
  }

  setResponse = (response) => (this.response = response);

  create = async () => await (await fetch(this.#url, this.#options)).json();
}
