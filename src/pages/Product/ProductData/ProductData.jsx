import "./ProductData.css";

import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";

import requestOptions from "../../../consts/requestOptions";
import URLS from "../../../consts/URLS";

import useFetch from "../../../hooks/useFetch";

import checkInstanceIrequest from "../../../utils/checkInstanceIrequest";

const ProductData = ({ product }) => {
  const [intersecting, setIntersecting] = useState({});
  const inputRef = useRef(null);

  const description = useFetch({
    url: URLS.description + `?id=${product.id}`,
    options: requestOptions.getBodyEncoded,
  });

  useEffect(() => {
    const intersectionFunc = (entries) => {
      entries.forEach(
        (entry) =>
          entry.boundingClientRect.top > 0 &&
          setIntersecting(entry.isIntersecting)
      );
    };

    let observer = new IntersectionObserver(intersectionFunc, {
      rootMargin: "0px",
      threshold: 0.5,
    });

    const input = inputRef.current;
    if (
      input &&
      checkInstanceIrequest(description.data) &&
      description.data.plain_text
    )
      observer.observe(input);
    return () => {
      if (input) observer.unobserve(input);
    };
  }, [inputRef, description.data]);

  const isHidden = !intersecting ? "hidden" : "";

  return (
    <section className="product-data">
      <div className="product-data__caracteristic">
        <p>Caracteristic</p>
        <ol style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {product.attributes.map((attribute) => (
            <li
              style={{
                textAlign: "left",
                display: "flex",
                boxSizing: "border-box",
                wordBreak: "break-word",
              }}
              key={uuid()}
              className="justify-content--s-a display--flex"
            >
              <p style={{ width: "50%" }}>{attribute.name}:</p>
              <p
                style={{
                  width: "50%",
                  display: "flex",
                  alignproducts: "center",
                }}
              >
                {attribute.value_name}
              </p>
            </li>
          ))}
        </ol>
      </div>
      {checkInstanceIrequest(description.data) &&
        description.data.response.plain_text && (
          <div className={isHidden} ref={inputRef}>
            <div className="product-data__description">
              <p className="product-data__description-title ">Description</p>
              <p>{description.data.response.plain_text}</p>
            </div>
          </div>
        )}
    </section>
  );
};

ProductData.propTypes = {
  product: PropTypes.object,
};

export default ProductData;
