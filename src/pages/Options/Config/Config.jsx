import { Link } from "react-router-dom";
import uuid from "react-uuid";
import { useContext } from "react";

import requestOptions from "../../../consts/requestOptions";
import URLS from "../../../consts/URLS";

import { AuthContext } from "../../../context/AuthenticationContext";

import useFetchInClick from "../../../hooks/useFetchInClick";

import InfoPrint from "../InfoPrint/InfoPrint";
import { Question } from "../../Product/Question";
import Reputation from "../../../components/Reputation/Reputation";
import checkInstanceIrequest from "../../../utils/checkInstanceIrequest";

const Config = () => {
  const { user } = useContext(AuthContext);

  const ajust = useFetchInClick({
    url: URLS.userProfile,
    options: requestOptions.getBodyEncoded,
  });

  const myQuestions = useFetchInClick({
    url: URLS.myQuestion,
    options: requestOptions.getBodyEncoded,
  });
  const myReputationOptions = requestOptions.postBodyAppJson;
  myReputationOptions.body = JSON.stringify({ id: user.data.id });
  const myReputation = useFetchInClick({
    url: URLS.userProfileSeller,
    options: myReputationOptions,
  });

  return (
    <>
      <li key={uuid()}>
        <button data-name={"ajust"} onClick={ajust.userMeFetch}>
          Ajust
        </button>
        {checkInstanceIrequest(ajust.data) && (
          <InfoPrint info={ajust.data.response} />
        )}
      </li>
      <button data-name={"questions"} onClick={myQuestions.userMeFetch}>
        Questions
      </button>
      {
        <>
          {checkInstanceIrequest(myQuestions.data) &&
            myQuestions.data.response.questions.map((question) => (
              <Question key={uuid()} question={question} />
            ))}
          <p>No questions</p>
        </>
      }
      <li>
        <Link to={"/cart"}>Cart</Link>
      </li>
      <li>
        <Link to={"/boughts"}>Boughts</Link>
      </li>
      <li>
        <Link to={"/favorites"}>Favorites</Link>
      </li>
      <li>
        <Link to={"/myopinions"}>Opinions</Link>
      </li>
      <li>
        <button data-name={"reputation"} onClick={myReputation.userMeFetch}>
          Reputation
        </button>
        {checkInstanceIrequest(myReputation.data) && (
          <Reputation reputation={myReputation.data.response} />
        )}
      </li>
    </>
  );
};

Config.propTypes = {};

export default Config;
