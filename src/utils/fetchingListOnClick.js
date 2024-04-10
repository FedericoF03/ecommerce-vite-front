import requests from "../assets/consts/request";

export const fetchingListOnClick = async ({
  attributeToUse,
  url,
  setter,
  data,
  config: obj,
}) => {
  data[attributeToUse]?.cancel.signal && data[attributeToUse].cancel.abort();

  const aboutController = new AbortController();
  setter((data) => ({
    ...data,
    [attributeToUse]: {
      ...data[attributeToUse],
      cancel: aboutController,
      loading: true,
    },
  }));

  const req = await fetch(url, {
    ...requests.getURLencoded,
    signal: aboutController.signal,
    ...obj,
  });
  await req
    .json()
    .then((el) => {
      setter((data) => ({
        ...data,
        [attributeToUse]: {
          ...data[attributeToUse],
          display: !data[attributeToUse].display,
          data: el,
          loading: false,
        },
      }));
    })
    .catch((el) => setter({ error: el.error, loading: false }));
};
