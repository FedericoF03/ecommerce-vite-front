import { useState } from "react";

import makeRequest from "../utils/makeRequest";
import checkInstanceIrequest from "../utils/checkInstanceIrequest";

import { Fetcher } from "../test/components/models/Request/Fetcher";
import { HandlerErrorDefault } from "../test/components/models/HandlerError/HandlerErrorDefault";

let abortController = {};
// const errorInitState = {};
const isLoadingInitState = true;

const useFetchInClick = ({ url, options }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(isLoadingInitState);
  // const [error, setError] = useState(errorInitState);

  const userMeFetch = async () => {
    if (!checkInstanceIrequest(data)) {
      setIsLoading(isLoadingInitState);
      abortController.abort && abortController.abort();
      abortController = new AbortController();
      const requestOption = options;
      requestOption.signal = abortController.signal;
      await makeRequest(
        new Fetcher(url, requestOption),
        new HandlerErrorDefault()
      ).then((data) => {
        if (checkInstanceIrequest(data)) {
          setData(data);
        }
        setIsLoading(false);
      });
    }
  };
  return {
    data,
    isLoading,
    // error,
    userMeFetch,
  };
};

export default useFetchInClick;
