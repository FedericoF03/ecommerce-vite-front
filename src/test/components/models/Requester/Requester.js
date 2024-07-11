export class Requester {
  #classRequest;
  #classHandlerError;
  constructor(request, classHandlerError) {
    this.#classRequest = request;
    this.#classHandlerError = classHandlerError;
  }

  async makeRequest() {
    try {
      return await this.#classRequest.create().then((response) => {
        if (response.code > 400) throw response;
        
        this.#classRequest.setResponse(response);
        return this.#classRequest;
      });
    } catch (error) {
      return this.#classHandlerError.execute(error);
    }
  }
}
