import { useEffect, useState } from "react";

import { HandlerErrorDefault } from "../test/components/models/HandlerError/HandlerErrorDefault";
import { Fetcher } from "../test/components/models/Request/Fetcher";

import makeRequest from "../utils/makeRequest";
import checkInstanceIrequest from "../utils/checkInstanceIrequest";

// const errorInitState = {};

const isLoadingInitState = true;

const useFetch = ({ url, options }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(isLoadingInitState);
  // const [error, setError] = useState(errorInitState);
  const requestOptionsStringify = JSON.stringify(options);

  useEffect(() => {
    let isRaceCondition = false;
    !isRaceCondition && setIsLoading(isLoadingInitState);

    const fetchInEffect = async () => {
      if (url !== "") {
        try {
          const requestOptionsParse = JSON.parse(requestOptionsStringify);
          const response = await makeRequest(
            new Fetcher(url, requestOptionsParse),
            new HandlerErrorDefault()
          );

          if (!isRaceCondition && checkInstanceIrequest(response)) {
            setData(response);
          }
        } catch (error) {
          console.log(error, url);
        }
      }

      setIsLoading(false);
    };
    fetchInEffect();
    return () => {
      isRaceCondition = true;
    };
  }, [url, requestOptionsStringify]);

  return {
    data,
    isLoading,
    // error,
    setData,
  };
};

export default useFetch;
