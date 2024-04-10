import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useFetch } from "../hooks/useFetch";

import requests from "../assets/consts/request";

export const SiteContext = createContext();

const configSiteAnalytics = JSON.stringify({
  dateRanges: [
    {
      startDate: "2020-09-03",
      endDate: "today",
    },
  ],
  dimensions: [
    {
      name: "customEvent:itemCategoryTendency",
    },
  ],
  metrics: [
    {
      name: "eventCount",
    },
  ],
});

export const SiteProvider = ({ children }) => {
  const [country, setCountry] = useState("");

  const { data, setData, initStateFetch } = useFetch({
    url: `http://localhost:3005/site/categories?${
      country && `site=${country}`
    }`,
    config: requests.getURLencoded,
  });

  const currency = useFetch({
    url: `http://localhost:3005/site/currency?currency=ARS`,
    config: requests.getURLencoded,
  });

  const analyticProductTendency = useFetch({
    url: "http://localhost:3005/site/analytic",
    config: {
      ...requests.postAppJson,
      body: configSiteAnalytics,
    },
  });

  const handlerCountry = (value) => setCountry(value);

  useEffect(() => {
    setData((c) => ({ ...c, status: "wait" }));
  }, [country, setData]);

  return (
    <SiteContext.Provider
      value={{
        data,
        analyticProductTendency,
        country,
        handlerCountry,
        currency,
        initStateFetch,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

SiteProvider.propTypes = {
  children: PropTypes.element,
};
