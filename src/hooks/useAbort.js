import { useState } from "react";
import { insertAborter } from "../utils/insertAborter";

const useAbort = () => {
  const [abortController, setAbortController] = useState(insertAborter());

  const renewHandlerAborter = () => {
    setAbortController(insertAborter());
  };

  return { abortController, renewHandlerAborter };
};

export default useAbort;
