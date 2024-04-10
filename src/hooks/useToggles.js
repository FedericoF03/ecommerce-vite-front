import { useState } from "react";
import { fetchingListOnClick } from "../utils/fetchingListOnClick";

const useToggles = (iniToggles) => {
  const [list, setList] = useState(iniToggles || []);


  const handlerList = ({ e, url, config, attribute }) => {
    const attributeToUse = e.target.attributes[attribute || "data-name"].value;

    list[attributeToUse]?.data || !url
      ? setList((c) => ({
          ...c,
          [attributeToUse]: {
            ...c[attributeToUse],
            display: !c[attributeToUse]?.display,
          },
        }))
      : fetchingListOnClick({
          attributeToUse,
          url,
          setter: setList,
          data: list,
          config,
        });
  };
  return { list, setList, handlerList };
};

export default useToggles;
