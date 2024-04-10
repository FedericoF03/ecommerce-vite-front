import "./PanelOpinionProduct.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import PropTypes from "prop-types";

import Opinion from "../Opinion";


import { AuthContext } from "../../context/AuthenticationContext";

import { useFetch } from "../../hooks/useFetch";
import usePagination from "../../hooks/usePagination";
import useDependency from "../../hooks/useDependency";

import requests from "../../assets/consts/request";

const PanelOpinionProduct = ({ item }) => {
  const auth = useContext(AuthContext);
  const { query, handlerPaginationOffset } = usePagination({
    limitSet: 3,
  });
  const [message, setMessage] = useState([]);

  const opinions = useFetch({
    url: `http://localhost:3005/products/item/opinions${query}&id=${item.id}`,
    config: requests.getURLencoded,
    status: "depend waiting",
  });
  const opinionsSetter = opinions.setData;

  useDependency(auth, opinionsSetter);

  useEffect(() => setMessage([]), [item.id]);

  useEffect(
    () => opinionsSetter((c) => ({ ...c, status: "wait" })),
    [query, opinionsSetter, item.id]
  );

  useEffect(() => {
    opinions.data.status === "authorized" &&
      setMessage((opinionsNow) => {
        if (opinionsNow.length <= opinions.data.result.paging.offset)
          return [...opinionsNow, ...opinions.data.result.reviews];
        else return opinionsNow;
      });
  }, [opinions.data.status, opinions.data.result]);

  const SeeOpinions =
    message.length > 0 &&
    opinions.data.status === "authorized" &&
    message.length < opinions.data.result.paging.total &&
    message.length < 20;

  return (
    <section className="panel-opinion-product">
      <ol>
        {message.length > 0 &&
          message.map((el) => <Opinion key={uuid()} opinion={el} />)}
        {opinions.data.status === "failed" && (
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
        )}
      </ol>
      {SeeOpinions && (
        <button
          onClick={() =>
            handlerPaginationOffset("sum", opinions.data.result.total)
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
  item: PropTypes.object,
};

export default PanelOpinionProduct;
