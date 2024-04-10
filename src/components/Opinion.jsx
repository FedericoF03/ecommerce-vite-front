import "./PanelOpinionProduct/PanelOpinionProduct.css";
import PropTypes from "prop-types";

const Opinion = ({ opinion }) => {
  return (
    <li>
      <div className="panel-opinion-product__box-opinion-data">
        <div>{opinion.rate}</div>
        <p>{opinion.date_created}</p>
      </div>
      <p className="panel-opinion-product__box-opinion">{opinion.title}</p>
      <p className="panel-opinion-product__box-opinion">{opinion.content}</p>
    </li>
  );
};

Opinion.propTypes = {
  opinion: PropTypes.object,
};
export default Opinion;
