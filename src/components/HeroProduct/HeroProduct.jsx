import "./HeroProduct.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const HeroProduct = ({ item, currency }) => {
  const [imgSlider, setImgSlider] = useState(0);

  useEffect(() => setImgSlider(0), [item.id]);

  const handlerImgSlider = (action) => {
    if (action === "rest")
      setImgSlider((imgPosition) => (imgPosition > 0 ? imgPosition - 1 : 0));
    else if (action === "sum")
      setImgSlider((imgPosition) =>
        item.pictures.length - 1 > imgPosition
          ? imgPosition + 1
          : item.pictures.length - 1
      );
    else setImgSlider(() => action);
  };

  const minWidth = () => {
    if (item.pictures.length === 1) return "100%";
    else if (item.pictures.length === 2) return "50%";
    else return "33%";
  };

  const valueRight = () => {
    if (item.pictures.length - 1 > imgSlider)
      return (imgSlider - 1) * 33 > 0 ? (imgSlider - 1) * 33 : 0;
    else if (item.pictures.length > 2) return (imgSlider - 2) * 33;
  };
  const valueWidthMin = minWidth();

  const valueR = valueRight();

  const price =
    currency.data?.result &&
    currency.data?.result.symbol +
      item.base_price
        .toFixed(currency.data?.result.decimal_places)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <section className="gallery-product">
      <div className="gallery-product__data-product-conteiner">
        <p className="gallery-product__data-name">{item.title}</p>
        <p className="gallery-product__data-price">{price}</p>
      </div>
      <div className="gallery-product__conteiner-figure">
        <img
          className="gallery-product__figure"
          src={item.pictures[imgSlider].secure_url}
          alt="figure-big"
        />
      </div>
      <div className="gallery-product__slider">
        <img
          onClick={() => handlerImgSlider("rest")}
          src="/slider_button.png"
          className="gallery-product__slider-buttons gallery-product__slider-buttons--left"
        />
        <div className="gallery-product__figures-conteiner">
          {item.pictures.map((el, i) => (
            <div
              onClick={() => handlerImgSlider(i)}
              key={el.id}
              style={{
                position: "relative",
                minWidth: valueWidthMin,
                right: `${valueR}%`,
                border: i === imgSlider && "1px solid #000",
              }}
            >
              <img className="gallery-product__figure-small" src={el.url}></img>
            </div>
          ))}
        </div>
        <img
          onClick={() => handlerImgSlider("sum")}
          src="/slider_button.png"
          className="gallery-product__slider-buttons"
        />
      </div>
    </section>
  );
};

HeroProduct.propTypes = {
  item: PropTypes.object,
  currency: PropTypes.object,
};
export default HeroProduct;
