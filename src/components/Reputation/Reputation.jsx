import { PropTypes } from "prop-types";

const Reputation = ({ list }) => {
  return (
    <>
      <a href={list.reputation.data.permalink}>
        <p>{list.reputation.data.nickname}</p>
      </a>
      <p>{list.reputation.data.country_id}</p>
      <div>
        {list.reputation.data.seller_reputation.transactions.total > 0 && (
          <>
            <p>{list.reputation.data.seller_reputation.transactions.total}</p>
            <p>{list.reputation.data.seller_reputation.level_id}</p>
          </>
        )}
        {list.reputation.data.seller_reputation.transactions.total <= 0 && (
          <p>NO REPUTATION COLLECTED</p>
        )}
      </div>
    </>
  );
};

Reputation.propTypes = {
  list: PropTypes.object,
};

export default Reputation;
