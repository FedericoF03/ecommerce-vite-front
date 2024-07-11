import "./ProductSections.css";

import uuid from "react-uuid";
import PropTypes from "prop-types";

import ProductCard from "../../../components/ProductCard/ProductCard";

const ProductSections = ({ title, products }) => {
  return (
    <section className="products-slider">
      <h3 className="products-slider__title">{title}</h3>
      <article className="products-slider__conteiner-product-cards">
        {products.map((product) => (
          <ProductCard data={product} key={uuid()} />
        ))}
      </article>
    </section>
  );
};

ProductSections.propTypes = {
  title: PropTypes.string,
  products: PropTypes.array,
};

export default ProductSections;
