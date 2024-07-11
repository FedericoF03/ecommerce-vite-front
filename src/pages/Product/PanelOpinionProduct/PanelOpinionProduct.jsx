import "./PanelOpinionProduct.css";

import { useContext, useEffect, useState } from "react";
import uuid from "react-uuid";
import PropTypes from "prop-types";

import checkInstanceIrequest from "../../../utils/checkInstanceIrequest";

import URLS from "../../../consts/URLS";
import requestOptions from "../../../consts/requestOptions";

import useFetch from "../../../hooks/useFetch";
import usePagination from "../../../hooks/usePagination";

import { AuthContext } from "../../../context/AuthenticationContext";

import Opinion from "../Opinion";

const PanelOpinionProduct = ({ product }) => {
  const { user } = useContext(AuthContext);
  const { queryPagination, handlerPaginationOffset } = usePagination([3]);
  const [message, setMessage] = useState([]);

  const opinions = useFetch({
    url: user.isAuth
      ? URLS.opinions + `?${queryPagination}&id=${product.id}`
      : "",
    options: requestOptions.getURLencoded,
  });

  useEffect(() => {
    checkInstanceIrequest(opinions.data) &&
      setMessage((opinionsNow) => {
        if (opinionsNow.length <= opinions.data.response.paging.offset)
          return [...opinionsNow, ...opinions.data.response.reviews];
        else return opinionsNow;
      });
  }, [opinions.data]);

  const SeeOpinions =
    message.length > 0 &&
    checkInstanceIrequest(opinions.data) &&
    message.length < opinions.data.response.paging.total &&
    message.length < 20;

  return (
    <section className="panel-opinion-product">
      <ol>
        {message.length > 0 &&
          message.map((el) => <Opinion key={uuid()} opinion={el} />)}
        {/* {opinions.data instanceof IHandlerError && (
          <div
            style={{
              position: "relative",
            }}
          >
            <Link
              to={"/register"}
              style={{
                color: "black",
                backgroundColor: "buttonface",
                width: "100%",
                filter: "blur(10px)",
              }}
            >
              <li>
                <div className="panel-opinion-product__box-opinion-data">
                  <div>lorem</div>
                  <p>lorem</p>
                </div>
                <p className="panel-opinion-product__box-opinion">lorem</p>
                <p className="panel-opinion-product__box-opinion">lorem</p>
              </li>
            </Link>
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
        )} */}
      </ol>
      {SeeOpinions && (
        <button
          onClick={() =>
            handlerPaginationOffset("sum", opinions.data.response.total)
          }
          className="panel-opinion-product__more-opinion"
        >
          Ver mas...
        </button>
      )}
    </section>
  );
};

PanelOpinionProduct.propTypes = {
  product: PropTypes.object,
};

export default PanelOpinionProduct;
