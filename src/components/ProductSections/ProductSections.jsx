import "./ProductSections.css";
import PropTypes from "prop-types";

import ProductCard from "../ProductCard/ProductCard";

const ProductSections = ({ dep, currency }) => {
  const [category] = dep.result.filters.map(
    (el) => el.id === "category" && el.values[0].name
  );

  return (
    <section className="products-slider">
      <h3 className="products-slider__title">{category}</h3>
      <article className="products-slider__conteiner-product-cards">
        {dep.result.results.map((el) => (
          <ProductCard currency={currency} data={el} key={el.id} />
        ))}
      </article>
    </section>
  );
};

ProductSections.propTypes = {
  dep: PropTypes.object,

  currency: PropTypes.object,
};

export default ProductSections;
