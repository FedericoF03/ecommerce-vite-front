import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ListSubcategories = ({ subcategories, handleToggleCateogires }) => {
  return (
    <ul>
      {subcategories &&
        subcategories.map((el) => (
          <NavLink onClick={handleToggleCateogires} key={el.id} to={`/categories/${el.id}`}>
            {el.name}
          </NavLink>
        ))}
    </ul>
  );
};

ListSubcategories.propTypes = {
  subcategories: PropTypes.array,
  handleToggleCateogires: PropTypes.func
};
export default ListSubcategories;
