import uuid from "react-uuid";

import requestOptions from "../consts/requestOptions";
import URLS from "../consts/URLS";

import checkInstanceIrequest from "../utils/checkInstanceIrequest";

import useFetch from "../hooks/useFetch";

import Opinion from "../pages/Product/Opinion";

const MyOpinions = () => {
  const opinions = useFetch({
    url: URLS.myOpinion,
    options: requestOptions.getBodyEncoded,
  });
  return (
    <main className="background-color--o background-size--100vh background--user-form">
      {checkInstanceIrequest(opinions.data) &&
        opinions.data.response.length > 0 &&
        opinions.data.response.map((opinion) => (
          <Opinion key={uuid()} opinion={opinion} />
        ))}
    </main>
  );
};

export default MyOpinions;
