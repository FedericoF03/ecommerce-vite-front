import { IRequest } from "../test/components/models/Request/Request";

const checkInstanceIrequest = (valueToCheckInstance) =>
  valueToCheckInstance.__proto__ instanceof IRequest;

export default checkInstanceIrequest;
