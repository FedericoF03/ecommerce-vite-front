import { useContext, useMemo } from "react";

import ProductSections from "../components/ProductSections/ProductSections";

import { SiteContext } from "../context/SiteContext";

import { useFetch } from "../hooks/useFetch";
import useDependency from "../hooks/useDependency";

import requests from "../assets/consts/request";

import emptyOrFull from "../utils/emptyOrFull";

const Home = () => {
  const site = useContext(SiteContext);

  const categoryAnalytic =
    site.analyticProductTendency.data.status === "authorized" &&
    site.analyticProductTendency.data.result.value;

  const tendency = useFetch({
    url: `http://localhost:3005/products/items?category=${categoryAnalytic}&limit=10`,
    config: requests.getURLencoded,
    status: "depend waiting",
  });

  useDependency(site.analyticProductTendency, tendency.setData);

  const categoryAnalytics = emptyOrFull(tendency, ["results"]);

  const numberRandom = useMemo(
    () =>
      site.data.status === "authorized" && {
        id: site.data.result[
          Math.floor(Math.random() * site.data.result.length)
        ].id,
        site,
      },
    [site]
  );

  const randomCategory = useFetch({
    url: `http://localhost:3005/products/items?category=${
      numberRandom.id
    }&limit=10${site.country && `&site=${site.country}`}`,
    config: requests.getURLencoded,
    status: "depend waiting",
  });

  const randomCategorySetter = randomCategory.setData;

  useDependency(site, randomCategorySetter);

  const categoryRandom = emptyOrFull(randomCategory, ["results"]);

  return (
    <>
      <main className="background-color--w background-size--100vh">
        {categoryAnalytics.full && (
          <ProductSections dep={tendency.data} currency={site.currency} />
        )}
        {categoryAnalytics.empty && <p>No results</p>}
        {categoryRandom.full && (
          <ProductSections dep={randomCategory.data} currency={site.currency} />
        )}
        {categoryRandom.empty && <p>No results</p>}
      </main>
    </>
  );
};

export default Home;
