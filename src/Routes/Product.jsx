import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../context/AuthenticationContext";

import URLS from "../consts/URLS";
import requestOptions from "../consts/requestOptions";

import checkInstanceIrequest from "../utils/checkInstanceIrequest";

import useVisit from "../hooks/useVisit";
import useFetch from "../hooks/useFetch";

import ProductBody from "../pages/Product/ProductBody/ProductBody";
import ProductSections from "../pages/Home/ProductSections/ProductSections";

const Product = () => {
  const { user } = useContext(AuthContext);

  const { productParam } = useParams();

  const product = useFetch({
    url: URLS.item + `?id=${productParam}`,
    options: requestOptions.getBodyEncoded,
  });

  useVisit(
    "event",
    "ProductViewCategory",
    {
      itemCategoryTendency:
        checkInstanceIrequest(product.data) &&
        product.data.response.category_id,
    },
    product.data
  );

  const historyOptions = requestOptions.postBodyAppJson;
  historyOptions.body = checkInstanceIrequest(product.data)
    ? JSON.stringify({
        item_id: product.data.response.id,
        category: product.data.response.category_id,
      })
    : {};
  useFetch({
    url: user.isAuth && checkInstanceIrequest(product.data) ? URLS.history : "",
  });

  const tendency = useFetch({
    url: checkInstanceIrequest(product.data)
      ? URLS.itemsCategories +
        `?category=${product.data.response.category_id}&limit=10`
      : "",
    options: requestOptions.getBodyEncoded,
  });

  return (
    <main className="background-color--w">
      {/* <HeaderAndFooter> */}
      <article className="product display--flex align-items--center justify-content--center flex-direction--column">
        {checkInstanceIrequest(product.data) && (
          <>
            <ProductBody product={product.data.response} />
            {checkInstanceIrequest(tendency.data) && (
              <ProductSections
                title={tendency.data.response.filters[0].values[0].name}
                products={tendency.data.response.results}
              />
            )}
          </>
        )}
      </article>
      {/* </HeaderAndFooter> */}
    </main>
  );
};

export default Product;
