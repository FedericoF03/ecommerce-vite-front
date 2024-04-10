import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ListOrder = ({ filters, handleToggleFilters }) => {
  const search = useLocation().search;

  const [filtersArray, filtersArraySet] = useState();

  const act = (el, list) => {
    const query = new URLSearchParams(search);
    query.set(list.id, el.id);
    return query;
    ///No usado pero dejado por orgullo
    // if (search === "") return;
    // `${list.id}=${el.id}`;
    // if (search.includes(list.id)) {
    //   const test2 = search.split("&").map((t) => {
    //     return t.includes(list.id) ? t.replace(t, `${list.id}=${el.id}`) : t;
    //   });
    //   console.log(test2);
    //   return test2;
    // } else {
    //   console.log(search);
    //   return `${search}&${list.id}=${el.id}`;
    // }
  };
  return (
    <ul>
      {filtersArray.map((list) => (
        <Fragment key={list.id}>
          <li onClick={(e) => filtersArraySet(e)} data-id={list.id}>
            {list.name}
          </li>
          {list.open &&
            list.values.map((el) => (
              <Link
                onClick={() => {
                  handleToggleFilters();
                }}
                to={`?${act(el, list)}`}
                key={el.id}
              >
                {el.name}
              </Link>
            ))}
        </Fragment>
      ))}
    </ul>
  );
};

ListOrder.propTypes = {
  filters: PropTypes.array,
  handleToggleFilters: PropTypes.func,
};
export default ListOrder;
