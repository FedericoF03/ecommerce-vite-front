import "./Filter.css";

import PropTypes from "prop-types";
import uuid from "react-uuid";

const Filter = ({
  avaibleFilters,
  filters,
  deleteSearchParams,
  handlerInsertSearchParams,
}) => {
  return (
    <div className="filter">
      <ul>
        {filters.map((filter) => (
          <li
            data-filter={filter.id}
            onClick={(e) => deleteSearchParams(e)}
            style={{ color: "red" }}
            key={uuid()}
          >
            {`${filter.name}: ${filter.values[0].name}`}
          </li>
        ))}
      </ul>
      <ul>
        {avaibleFilters.map((Avaiblefilter) => (
          <li key={uuid()}>
            {Avaiblefilter.name}
            <ul>
              {Avaiblefilter.values.map((value) => (
                <li
                  data-filter={Avaiblefilter.id}
                  data-filter-id={value.id}
                  onClick={(e) => handlerInsertSearchParams(e)}
                  style={{ color: "green" }}
                  key={uuid()}
                >
                  {value.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

Filter.propTypes = {
  avaibleFilters: PropTypes.array,
  filters: PropTypes.array,
  handlerInsertSearchParams: PropTypes.func,
  deleteSearchParams: PropTypes.func,
};
export default Filter;
