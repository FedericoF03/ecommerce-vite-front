import { useContext } from "react";
import PropTypes from "prop-types";

import checkInstanceIrequest from "../../../utils/checkInstanceIrequest";

import URLS from "../../../consts/URLS";
import requestOptions from "../../../consts/requestOptions";

import { AuthContext } from "../../../context/AuthenticationContext";

import useFetch from "../../../hooks/useFetch";

const SellerProduct = ({ product }) => {
  const { user } = useContext(AuthContext);

  const seller = useFetch({
    url: user.isAuth ? URLS.seller + `?id=${product.seller_id}` : "",
    options: requestOptions.getBodyEncoded,
  });

  return (
    <>
      {checkInstanceIrequest(seller.data) && (
        <div
          style={{
            color: "black",
            backgroundColor: "ButtonFace",
            width: "80%",
          }}
        >
          <a href={seller.data.response.permalink}>
            <p>{seller.data.response.nickname}</p>
            <p>{seller.data.response.seller_reputation.level_id}</p>
            <p>{seller.data.response.seller_reputation.power_seller_status}</p>
            <div className="display--flex justify-content--s-a">
              <p>
                {seller.data.response.seller_reputation?.transactions.period}
              </p>
              <p>{seller.data.response.seller_reputation.transactions.total}</p>
            </div>
          </a>
        </div>
      )}
      {/* {seller.data.__proto__ instanceof IHandlerError && (
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
              alignproducts: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            Autenticarse para recibir datos
          </p>
        </div>
      )} */}
    </>
  );
};

SellerProduct.propTypes = {
  product: PropTypes.object,
};

export default SellerProduct;
