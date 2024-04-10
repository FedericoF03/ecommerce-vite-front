import "./ProductData.css";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";

import { useFetch } from "../../hooks/useFetch";

import requests from "../../assets/consts/request";

const ProductData = ({ item }) => {
  const [intersecting, setIntersecting] = useState({});
  const inputRef = useRef(null);

  const description = useFetch({
    url: `http://localhost:3005/products/item/description?id=${item.id}`,
    config: requests.getURLencoded,
  });

  const descriptionSetter = description.setData;

  useEffect(
    () =>
      descriptionSetter((c) => ({
        ...c,
        status: "wait",
      })),
    [item.id, descriptionSetter]
  );

  useEffect(() => {
    const intersectionFunc = (entries) =>
      entries.forEach(
        (entry) =>
          entry &&
          entry.boundingClientRect.top > 0 &&
          setIntersecting(entry.isIntersecting)
      );

    let observer = new IntersectionObserver(intersectionFunc, {
      rootMargin: "0px",
      threshold: 0.5,
    });
    const input = inputRef.current;
    if (
      input &&
      description.data.status === "authorized" &&
      description.data.result.plain_text
    )
      observer.observe(input);
    return () => {
      if (input) observer.unobserve(input);
    };
  }, [inputRef, description.data.status, description.data.result]);

  return (
    <section className="product-data">
      <div className="product-data__caracteristic">
        <p>Caracteristic</p>
        <ol style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {item.attributes.map((el) => (
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
              <p style={{ width: "50%" }}>{el.name}:</p>
              <p
                style={{ width: "50%", display: "flex", alignItems: "center" }}
              >
                {el.value_name}
              </p>
            </li>
          ))}
        </ol>
      </div>
      {description.data.status === "authorized" &&
        description.data.result.plain_text && (
          <div className={!intersecting ? "hidden" : ""} ref={inputRef}>
            <div className="product-data__description">
              <p className="product-data__description-title ">Description</p>
              <p>{description.data.result.plain_text}</p>
            </div>
          </div>
        )}
    </section>
  );
};

ProductData.propTypes = {
  item: PropTypes.object,
};

export default ProductData;
