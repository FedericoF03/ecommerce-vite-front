export class HandlerErrorStrategy {
  #classStrategy;

  constructor(strategy) {
    this.#classStrategy = strategy;
  }

  setStrategy(strategy) {
    this.#classStrategy = strategy;
  }

  execute(error) {
    this.#classStrategy.setError(error);
    return this.#classStrategy.execute();
  }
}
