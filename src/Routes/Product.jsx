import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { SiteContext } from "../context/SiteContext";
import { CartContext } from "../context/CartContext";

import HeroProduct from "../components/HeroProduct/HeroProduct";
import Map from "../components/Map/Map";
import PanelOpinionProduct from "../components/PanelOpinionProduct/PanelOpinionProduct";
import PanelProduct from "../components/PanelProduct/PanelProduct";
import ProductData from "../components/ProductData/ProductData";
import ProductPanelQuestion from "../components/ProductPanelQuestion/ProductPanelQuestion";
import SellerProduct from "../components/SellerProduct/SellerProduct";
import ProductSections from "../components/ProductSections/ProductSections";

import useVisit from "../hooks/useVisit";
import useDependency from "../hooks/useDependency";
import { useFetch } from "../hooks/useFetch";

import requests from "../assets/consts/request";
import { AuthContext } from "../context/AuthenticationContext";

const Product = () => {
  const auth = useContext(AuthContext)
  const cart = useContext(CartContext);
  const { currency } = useContext(SiteContext);
  const { productParam } = useParams();

  const products = useFetch({
    url: `http://localhost:3005/products/item?id=${productParam}`,
    config: requests.getURLencoded,
  });

  const product = products.data.result;

  const productsSetter = products.setData;

  useEffect(() => {
    productsSetter((c) => ({ ...c, status: "wait" }));
    window.scrollTo(0, 0);
  }, [productParam, productsSetter]);

  useVisit(
    "event",
    "ProductViewCategory",
    {
      itemCategoryTendency: product && product.category_id,
    },
    product
  );

  const history = useFetch({
    url: "http://localhost:3005/user/history",
    status: "depend waiting",
  });
  const historySetter = history.setData;
  useEffect(() => {
    if (product)
      historySetter((data) => ({
        ...data,
        status: "wait",
        config: {
          ...requests.postAppJson,
          body: JSON.stringify({
            item_id: product.id,
            category: product.category_id,
          }),
        },
      }));
  }, [product, historySetter]);

  const tendency = useFetch({
    url: `http://localhost:3005/products/items?category=${
      product && product.category_id
    }&limit=10${product && `&site=${product.site_id}`}`,
    config: requests.getURLencoded,
    status: "depend waiting",
  });

  const tendencySetter = tendency.setData;
  useDependency(products, tendencySetter);

  useEffect(() => {
    product && tendencySetter((c) => ({ ...c, status: "wait" }));
  }, [product, tendencySetter]);

  if (product && cart.data.result) {
    if (cart.data.result.items.find((el) => el.item_id === product.id))
      product.quantity = cart.data.result.items.find(
        (el) => el.item_id === product.id
      ).quantity;
    else product.quantity = 1;
  }

  return (
    <main className="background-color--w">
      <article className="product display--flex align-items--center justify-content--center flex-direction--column">
        {product && (
          <>
            <HeroProduct item={product} currency={currency} />
            {product.quantity && <PanelProduct item={product} />}
            <SellerProduct item={product} />
            <ProductData item={product} />
            <ProductPanelQuestion item={product} />
            <Map item={product} />
            <PanelOpinionProduct item={product} />
            {!tendency.data.loading && tendency.data.result && (
              <ProductSections dep={tendency.data} currency={currency} />
            )}
          </>
        )}
      </article>
    </main>
  );
};

export default Product;
