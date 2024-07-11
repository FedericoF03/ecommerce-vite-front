const iteratorInfo = (infoData) => {
  console.log(" \n \n \n run \n \n \n");
  for (const key in infoData) {
    console.log(key, infoData[key]);
    if (infoData[key] instanceof Object && !Array.isArray(infoData[key])) {
      iteratorInfo(infoData[key]);
    } else if (Array.isArray(infoData[key])) {
      infoData[key].forEach((element) => {
        if (element instanceof Object && !Array.isArray(element)) {
          iteratorInfo(element);
        } else console.log(element);
      });
    }
  }
};

export default iteratorInfo;
