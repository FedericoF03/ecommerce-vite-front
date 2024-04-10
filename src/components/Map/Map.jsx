import "./Map.css";
import PropTypes from "prop-types";

const Map = ({ item }) => {
  const ubication = `${item?.seller_address?.country?.name},${item?.seller_address?.state?.name},${item?.seller_address?.city?.name},${item?.seller_address?.search_location?.neighborhood?.name}`;

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
  item: PropTypes.object,
};

export default Map;
