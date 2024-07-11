import { useState } from "react";

const useSlider = () => {
  const [imgSlider, setImgSlider] = useState(0);

  const handlerImgSlider = (action, item) => {
    if (action === "rest")
      setImgSlider((imgPosition) => (imgPosition > 0 ? imgPosition - 1 : 0));
    else if (action === "sum")
      setImgSlider((imgPosition) =>
        item.pictures.length - 1 > imgPosition
          ? imgPosition + 1
          : item.pictures.length - 1
      );
    else setImgSlider(() => action);
  };
  return { imgSlider, handlerImgSlider };
};

export default useSlider;
