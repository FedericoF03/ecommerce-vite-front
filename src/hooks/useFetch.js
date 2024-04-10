import { useEffect, useState } from "react";
const initStateFetch = {
  result: null,
  error: null,
  status: "wait",
  config: null,
  aborter: null,
};
export const useFetch = ({ url, config, status }) => {
  const [data, setData] = useState({
    ...initStateFetch,
    status: status ? status : initStateFetch.status,
    config,
  });

  useEffect(() => {
    const aborter = new AbortController();
    if (data.status === "wait") {
      setData((antState) => ({ ...antState, aborter }));
      (async () => {
        try {
          const getData = await fetch(url, {
            ...data.config,
            signal: aborter.signal,
          });

          if (getData.status > 400) {
            const error = new Error(getData.statusText);
            error.code = getData.status;
            throw error;
          }
          await getData.json().then((res) => {
            if (res.error || res.code || res.status > 400) {
              const error = new Error(res.error || res.msg);
              error.code = res.code;
              throw error;
            }
            setData((antState) => ({ ...antState, result: res, status: "authorized" }));
          });
        } catch (error) {
          if (!aborter.signal.aborted)
            setData((antState) => ({
              ...antState,
              status: "failed",
              error: { code: error.code, msg: error.message },
            }));
        }
      })();
    }

    return () => aborter.abort();
  }, [data.status, data.config, url]);

  const aborterClick = () => data.aborter && data.aborter.abort();
  return { data, setData, aborterClick, initStateFetch };
};
