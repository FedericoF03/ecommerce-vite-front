import { useEffect, useState } from "react";

const useRandomNumberByArray = (array) => {
  const [item, setItem] = useState(-1);

  useEffect(() => {
    if (array) {
      let numeroAleatorio =
        Math.floor(Math.random() * (array.length - 1 + 1)) + 0;
      setItem(numeroAleatorio);
    }

    return () => {
      setItem(-1);
    };
  }, [array]);

  return { item };
};

export default useRandomNumberByArray;
