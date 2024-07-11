import { useEffect, useState } from "react";

import URLS from "../consts/URLS";
import options from "../consts/requestOptions";

import makeRequest from "../utils/makeRequest";
import checkInstanceIrequest from "../utils/checkInstanceIrequest";

import { Fetcher } from "../test/components/models/Request/Fetcher";
import { HandlerErrorDefault } from "../test/components/models/HandlerError/HandlerErrorDefault";

const isLoadingInitState = true;
const isAuthInitState = false;
const requestClass = new Fetcher(URLS.userStatus, options.getBodyEncoded);
// const errorInitState = {};

export const useUserAuth = () => {
  const [isLoading, setIsLoading] = useState(isLoadingInitState);
  const [isAuth, setIsAuth] = useState(isAuthInitState);
  const [data, setData] = useState();

  // const [error, setError] = useState(errorInitState);

  useEffect(() => {
    let isRaceCondition = false;
    !isRaceCondition && setIsLoading(isLoadingInitState);

    const authInEffect = async () => {
      await makeRequest(requestClass, new HandlerErrorDefault()).then(
        (response) => {
          const checkInstance = checkInstanceIrequest(response);
          if (!isRaceCondition && checkInstance) {
            setData(requestClass.response);
            setIsAuth(true);
            setIsLoading(false);
          } else if (!checkInstance) setIsLoading(false);
        }
      );
    };
    authInEffect();

    return () => {
      isRaceCondition = true;
    };
  }, []);

  return { data, isLoading, isAuth };
};
