import { useState } from "react";
import gtag from "../utils/gtag";
const useVisit = (event, name, params, objToListen) => {
  const [visit, setVisit] = useState(false);
  if (objToListen && !visit) {
    gtag(event, name, params);
    setVisit(true);
  }
};

export default useVisit;
