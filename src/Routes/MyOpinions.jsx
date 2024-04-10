import uuid from "react-uuid";

import Opinion from "../components/Opinion";

import { useFetch } from "../hooks/useFetch";

import requests from "../assets/consts/request";

const MyOpinions = () => {
  const { data } = useFetch({
    url: `http://localhost:3005/user/myopinion`,
    config: requests.getURLencoded,
  });
  return (
    <main className="background-color--o background-size--100vh background--user-form">
      {data.result &&
        data.result.length > 0 &&
        data.result.map((el) => <Opinion key={uuid()} opinion={el} />)}
    </main>
  );
};

export default MyOpinions;
