import { PropTypes } from "prop-types";

const Reputation = ({ reputation }) => {
  return (
    <>
      <a href={reputation.permalink}>
        <p>{reputation.nickname}</p>
      </a>
      <p>{reputation.country_id}</p>
      <div>
        {reputation.seller_reputation.transactions.total > 0 && (
          <>
            <p>{reputation.seller_reputation.transactions.total}</p>
            <p>{reputation.seller_reputation.level_id}</p>
          </>
        )}
        {reputation.seller_reputation.transactions.total <= 0 && (
          <p>NO REPUTATION COLLECTED</p>
        )}
      </div>
    </>
  );
};

Reputation.propTypes = {
  reputation: PropTypes.object,
};

export default Reputation;
