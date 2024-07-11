import { useContext } from "react";
import uuid from "react-uuid";

import { BoughtContext } from "../context/BoughtContext";

import checkInstanceIrequest from "../utils/checkInstanceIrequest";

import Cards from "../components/Cards/Cards";

const Boughts = () => {
  const { boughts } = useContext(BoughtContext);

  return (
    <div className="conteiner-data-carts">
      {checkInstanceIrequest(boughts.data) &&
        boughts.data.response.orders.map((bought) => (
          <Cards bought={bought} key={uuid()} />
        ))}
    </div>
  );
};

export default Boughts;
