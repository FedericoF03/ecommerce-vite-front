import PropTypes from "prop-types";

import HeroProduct from "../HeroProduct/HeroProduct";
import PanelProduct from "../PanelProduct/PanelProduct";
import SellerProduct from "../SellerProduct/SellerProduct";
import ProductData from "../ProductData/ProductData";
import ProductPanelQuestion from "../ProductPanelQuestion/ProductPanelQuestion";
import Map from "../Map/Map";
import PanelOpinionProduct from "../PanelOpinionProduct/PanelOpinionProduct";

const ProductBody = ({ product }) => {
  return (
    <>
      <HeroProduct product={product} />
      <PanelProduct product={product} />
      <SellerProduct product={product} />
      <ProductData product={product} />
      <ProductPanelQuestion product={product} />
      <Map product={product} />
      <PanelOpinionProduct product={product} />
    </>
  );
};

ProductBody.propTypes = {
  product: PropTypes.object,
};

export default ProductBody;
