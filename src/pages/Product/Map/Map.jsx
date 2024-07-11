import "./Map.css";
import PropTypes from "prop-types";

const Map = ({ product }) => {
  const ubication = `${product?.seller_address?.country?.name},${product?.seller_address?.state?.name},${product?.seller_address?.city?.name},${product?.seller_address?.search_location?.neighborhood?.name}`;

  return (
    <section>
      <p className="ubication">Ubication</p>
      <iframe
        src={`https://maps.google.com/maps?q=${ubication}&output=embed`}
        width="100%"
      ></iframe>
    </section>
  );
};

Map.propTypes = {
  product: PropTypes.object,
};

export default Map;
