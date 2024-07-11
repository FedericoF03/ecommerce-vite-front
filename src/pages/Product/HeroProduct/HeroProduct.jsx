import "./HeroProduct.css";

import PropTypes from "prop-types";

import useSlider from "../../../hooks/useSlider";

const HeroProduct = ({ product }) => {
  const { imgSlider, handlerImgSlider } = useSlider();

  const minWidth = () => {
    if (product.pictures.length === 1) return "min-content";
    else if (product.pictures.length === 2) return "50%";
    else return "33%";
  };

  const valueRight = () => {
    if (product.pictures.length - 1 > imgSlider)
      return (imgSlider - 1) * 33 > 0 ? (imgSlider - 1) * 33 : 0;
    else if (product.pictures.length > 2) return (imgSlider - 2) * 33;
  };

  return (
    <section className="gallery-product">
      <div className="gallery-product__data-product-conteiner">
        <p className="gallery-product__data-name">{product.title}</p>
        <p className="gallery-product__data-price">{product.price}</p>
      </div>
      <div className="gallery-product__conteiner-figure">
        <img
          className="gallery-product__figure"
          src={product.pictures[imgSlider].secure_url}
          alt="figure-big"
        />
      </div>
      <div className="gallery-product__slider">
        {product.pictures.length > 1 && (
          <img
            onClick={() => handlerImgSlider("rest", product)}
            src="/slider_button.png"
            className="gallery-product__slider-buttons gallery-product__slider-buttons--left"
          />
        )}
        <div className="gallery-product__figures-conteiner">
          {product.pictures.map((el, i) => (
            <div
              onClick={() => handlerImgSlider(i, product)}
              key={el.id}
              style={{
                position: "relative",
                margin: "auto",
                minWidth: minWidth(),
                right: valueRight(),
                border: product.pictures.length > 1 ? "1px solid #000" : "",
              }}
            >
              <img className="gallery-product__figure-small" src={el.url}></img>
            </div>
          ))}
        </div>
        {product.pictures.length > 1 && (
          <img
            onClick={() => handlerImgSlider("sum", product)}
            src="/slider_button.png"
            className="gallery-product__slider-buttons"
          />
        )}
      </div>
    </section>
  );
};

HeroProduct.propTypes = {
  product: PropTypes.object,
  currency: PropTypes.object,
};
export default HeroProduct;
