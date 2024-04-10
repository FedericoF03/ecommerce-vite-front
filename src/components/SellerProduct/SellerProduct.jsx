import { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "../../context/AuthenticationContext";

import { useFetch } from "../../hooks/useFetch";
import useDependency from "../../hooks/useDependency";

import requests from "../../assets/consts/request";

const SellerProduct = ({ item }) => {
  const auth = useContext(AuthContext);
  const seller = useFetch({
    url: `http://localhost:3005/products/item/seller?id=${item.seller_id}`,
    config: requests.getURLencoded,
    status: "depend waiting",
  });
  const sellerSetter = seller.setData;

  useEffect(
    () =>
      sellerSetter((c) => {
        console.log(c)
        return {
          ...c,
          status: "wait",
        };
      }),
    [item.seller_id, sellerSetter]
  );
  useDependency(auth, sellerSetter);
  return (
    <>
      {seller.data.status === "authorized" && (
        <div
          style={{
            color: "black",
            backgroundColor: "ButtonFace",
            width: "80%",
            filter: seller.data.status === "failed" && "blur(10px)",
          }}
        >
          <a href={seller.data.result?.permalink}>
            <p>{seller.data.result?.nickname}</p>
            <p>{seller.data.result?.seller_reputation.level_id}</p>
            <p>{seller.data.result?.seller_reputation.power_seller_status}</p>
            <div className="display--flex justify-content--s-a">
              <p>{seller.data.result?.seller_reputation.transactions.period}</p>
              <p>{seller.data.result?.seller_reputation.transactions.total}</p>
            </div>
          </a>
        </div>
      )}
      {seller.data.status === "failed" && (
        <div
          style={{
            width: "80%",
            position: "relative",
          }}
        >
          <div
            style={{
              color: "black",
              backgroundColor: "ButtonFace",
              width: "100%",
              filter: seller.data.status === "failed" && "blur(10px)",
            }}
          >
            <p>lorem</p>
            <p>lorem</p>
            <p>lorem</p>
            <div className="display--flex justify-content--s-a">
              <p>lorem</p>
              <p>lorem</p>
            </div>
          </div>
          <p
            style={{
              color: "white",
              position: "absolute",
              top: "0",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            Autenticarse para recibir datos
          </p>
        </div>
      )}
    </>
  );
};

SellerProduct.propTypes = {
  item: PropTypes.object,
};

export default SellerProduct;
