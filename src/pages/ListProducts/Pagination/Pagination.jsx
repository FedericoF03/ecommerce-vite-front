import PropTypes from "prop-types";

const Pagination = ({ pagination, total, handlerPaginationOffset }) => {
  const page = Math.round(pagination.offset / pagination.limit + 1);

  return (
    <div className="list__conteiner-list-pag">
      {
        <button
          onClick={() => handlerPaginationOffset("rest", total)}
          className="list__buttons-list-pag list__buttons-list-pag--left"
          style={{ visibility: page <= 1 && "hidden" }}
        >
          {"<"}
        </button>
      }
      <p className="list__quantity-input">{page}</p>
      <button
        onClick={() => {
          window.scrollTo(0, 0);
          handlerPaginationOffset("sum", total);
        }}
        className="list__buttons-list-pag list__buttons-list-pag--right"
        style={{
          visibility: total - pagination.limit <= pagination.offset && "hidden",
        }}
      >
        {">"}
      </button>
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number,
  pagination: PropTypes.object,
  handlerPaginationOffset: PropTypes.func,
};

export default Pagination;
