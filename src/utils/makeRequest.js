import { HandlerErrorStrategy } from "../test/components/models/HandlerError/HandlerErrorStrategy";
import { Requester } from "../test/components/models/Requester/Requester";

const makeRequest = async (fetcher, handlerError) =>
  await new Requester(
    fetcher,
    new HandlerErrorStrategy(handlerError)
  ).makeRequest();

export default makeRequest;
