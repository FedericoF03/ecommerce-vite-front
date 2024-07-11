import { useContext, useDebugValue } from "react";

import checkInstanceIrequest from "../utils/checkInstanceIrequest";

import requestOptions from "../consts/requestOptions";
import URLS from "../consts/URLS";

import { SiteContext } from "../context/SiteContext";

import useFetch from "../hooks/useFetch";
import useRandomNumberByArray from "../hooks/useRandomNumberByArray";

import HeaderAndFooter from "../components/HeaderAndFooter/HeaderAndFooter";
import ProductSections from "../pages/Home/ProductSections/ProductSections";
import AdivceNoResults from "../components/AdivceNoResults";

const Home = () => {
  const site = useContext(SiteContext);
  const siteCategoriesListResponse = site.categoriesList.data.response;
  const randomNumber = useRandomNumberByArray(siteCategoriesListResponse);

  const randomCategoryBySite = useFetch({
    url:
      randomNumber.item > 0
        ? URLS.itemsCategories +
          `?category=${
            siteCategoriesListResponse[randomNumber.item].id
          }&limit=10`
        : "",
    options: requestOptions.getBodyEncoded,
  });

  const categoryTendency = useFetch({
    url: checkInstanceIrequest(site.googleAnalyticsTendency.data)
      ? URLS.itemsCategories +
        `?category=${site.googleAnalyticsTendency.data.response.value}&limit=10`
      : "",
    options: requestOptions.getBodyEncoded,
  });

  return (
    <>
      <HeaderAndFooter>
        <main className="background-color--w background-size--100vh">
          {!randomCategoryBySite.isLoading &&
            checkInstanceIrequest(randomCategoryBySite.data) && (
              <>
                {randomCategoryBySite.data.response.results.length > 0 ? (
                  <ProductSections
                    products={randomCategoryBySite.data.response.results}
                    title={
                      randomCategoryBySite.data.response.filters.find(
                        (filter) => filter.id === "category"
                      ).values[0].name
                    }
                  />
                ) : (
                  <AdivceNoResults />
                )}
              </>
            )}
          {!categoryTendency.isLoading &&
            checkInstanceIrequest(categoryTendency.data) && (
              <>
                {categoryTendency.data.response.results.length > 0 ? (
                  <ProductSections
                    products={categoryTendency.data.response.results}
                    title={
                      categoryTendency.data.response.filters.find(
                        (filter) => filter.id === "category"
                      ).values[0].name
                    }
                  />
                ) : (
                  <AdivceNoResults />
                )}
              </>
            )}
        </main>
      </HeaderAndFooter>
    </>
  );
};

export default Home;
