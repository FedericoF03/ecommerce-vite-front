import { useEffect } from "react";

const useDependency = (dep, setter) => {
  useEffect(() => {
    if (dep.data.status === "failed")
      setter((c) => ({ ...c, status: "failed" }));
    else if (dep.data.status === "authorized")
      setter((c) => ({ ...c, status: dep.initStateFetch.status }));
  }, [setter, dep.data.status, dep.initStateFetch.status]);
};

export default useDependency;
