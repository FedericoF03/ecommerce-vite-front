import "./Filter.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import emptyOrFull from "../../utils/emptyOrFull";

const Filter = ({
  filtersData,
  handlerSearchParams,
  deleteSearchParams,
  loading,
}) => {
  const [modal, setModal] = useState({ sort: false, filter: false });
  const [filterLists, setFilterLists] = useState(
    filtersData.data.result.available_filters.map((avaibleFilter) => {
      const filter = filtersData.data.result.filters.find(
        (filterInUse) => filterInUse.id === avaibleFilter.id
      );
      return {
        ...avaibleFilter,
        values: avaibleFilter.values,
        selected: filter ? filter.values[0].id : null,
        open: false,
      };
    })
  );
  const navigate = useNavigate();
  const toggleFilter = (e) =>
    setFilterLists((antState) =>
      antState.map((el) =>
        el.id === e.target.attributes["data-id"].value
          ? { ...el, open: !el.open }
          : { ...el, open: false }
      )
    );

  const handlerModal = (e) => {
    const dataModalValue = e.target.attributes["data-modal"].value;
    setModal((c) => ({
      sort: false,
      filter: false,
      [dataModalValue]: !c[dataModalValue],
    }));
  };

  const sorts = [
    ...filtersData.data.result.available_sorts,
    { ...filtersData.data.result.sort, status: true },
  ];

  const spacefilterState = emptyOrFull(filtersData, ["filters"]);

  const liDynamic = (el, values) => {
    if (el.id === "category")
      return (
        <li
          onClick={() => navigate(`/products/${values.id}`)}
          key={values.id}
          style={{
            color: values.id === el.selected ? "blue" : "black",
          }}
          data-id={values.id}
          data-filter={el.id}
        >
          {values.name}
        </li>
      );
    else
      return (
        <li
          onClick={(e) => handlerSearchParams(e)}
          key={values.id}
          style={{
            color: values.id === el.selected ? "blue" : "black",
          }}
          data-id={values.id}
          data-filter={el.id}
        >
          {values.name}
        </li>
      );
  };

  return (
    <div className="filter">
      <button
        data-modal="sort"
        disabled={loading}
        onClick={(e) => handlerModal(e)}
      >
        Sort
      </button>
      {modal.sort && (
        <ul>
          {sorts.map((el) => (
            <li
              onClick={(e) => handlerSearchParams(e)}
              key={el.id}
              style={{ color: el.status && "blue" }}
              data-id={el.id}
              data-filter={"sort"}
            >
              {el.name}
            </li>
          ))}
        </ul>
      )}
      <button
        data-modal="filter"
        disabled={filtersData.loading && true}
        onClick={(e) => handlerModal(e)}
      >
        Filter
      </button>
      {modal.filter &&
        filterLists.map((el) => (
          <li
            onClick={(e) => toggleFilter(e)}
            key={el.id}
            style={{ color: el.selected && "blue" }}
            data-id={el.id}
          >
            <ol>
              {el.values.map((values) => el.open && liDynamic(el, values))}
            </ol>
            {el.name}
          </li>
        ))}
      <ol>
        {spacefilterState.full && (
          <>
            {<p>Delete</p>}
            {filtersData.data.result.filters.map(
              (el) =>
                el.id !== "category" && (
                  <li
                    data-filter={el.id}
                    onClick={(e) => deleteSearchParams(e)}
                    key={el.id}
                  >
                    {el.values[0].name}
                  </li>
                )
            )}
          </>
        )}
      </ol>
    </div>
  );
};

Filter.propTypes = {
  loading: PropTypes.bool,
  category: PropTypes.string,
  filtersData: PropTypes.object,
  handlerSearchParams: PropTypes.func,
  deleteSearchParams: PropTypes.func,
};
export default Filter;
