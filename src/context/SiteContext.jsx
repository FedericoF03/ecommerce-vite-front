import { createContext } from "react";
import PropTypes from "prop-types";

import requestOptions from "../consts/requestOptions";

import useCountry from "../hooks/useCountry";
import useFetch from "../hooks/useFetch";

import URLS from "../consts/URLS";

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

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const { country, handlerCountry } = useCountry();

  const categoriesList = useFetch({
    url:
      country.length > 0
        ? URLS.siteCategories + `?site=${country}`
        : URLS.siteCategories,
    options: requestOptions.getBodyEncoded,
  });

  const optionsGoogleAnalytics = requestOptions.postBodyAppJson;
  optionsGoogleAnalytics.body = configSiteAnalytics;
  const googleAnalyticsTendency = useFetch({
    url: URLS.analytics,
    options: optionsGoogleAnalytics,
  });

  return (
    <SiteContext.Provider
      value={{
        country,
        handlerCountry,
        categoriesList,
        googleAnalyticsTendency,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

SiteProvider.propTypes = {
  children: PropTypes.element,
};
