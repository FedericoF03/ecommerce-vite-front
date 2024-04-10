import { Link } from "react-router-dom";
import uuid from "react-uuid";
import { useContext } from "react";
import { PropTypes } from "prop-types";

import InfoPrint from "../InfoPrint/InfoPrint";
import { Question } from "../Question";

import { AuthContext } from "../../context/AuthenticationContext";

import requests from "../../assets/consts/request";
import Reputation from "../Reputation/Reputation";

const Config = ({ list, handlerList }) => {
  const auth = useContext(AuthContext);
  return (
    list.account?.display && (
      <>
        <li key={uuid()}>
          <button
            data-name={"ajust"}
            onClick={(e) =>
              handlerList({ e, url: `http://localhost:3005/user/me` })
            }
          >
            Config
          </button>
          {list.ajust && (
            <>
              {list.ajust.display && <InfoPrint info={list.ajust.data} />}
              {list.ajust.loading && <p>charge</p>}
            </>
          )}
        </li>
        <button
          data-name={"questions"}
          onClick={(e) =>
            !auth.data.loading &&
            handlerList({
              e,
              url: `http://localhost:3005/user/myquestion`,
              config: requests.getURLencoded,
            })
          }
        >
          Questions
        </button>
        {list.questions && (
          <>
            {list.questions.data &&
              list.questions.display &&
              list.questions.data.questions.length > 0 &&
              list.questions.data.questions.map((el) => (
                <Question key={uuid()} question={el} />
              ))}
            {!list.questions.loading &&
              list.questions.data &&
              list.questions.data.questions.length <= 0 && <p>No questions</p>}
          </>
        )}
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
          <Link to={"/opinion"}>Opinions</Link>
        </li>
        {auth.data && (
          <li>
            <button
              data-name={"reputation"}
              onClick={(e) =>
                handlerList({
                  e,
                  url: "http://localhost:3005/user/seller/profile",
                  config: {
                    ...requests.postAppJson,
                    body: JSON.stringify({ id: auth.data.result.id }),
                  },
                })
              }
            >
              Reputation
            </button>
            {list.reputation &&
              list.reputation.data &&
              list.reputation.display && <Reputation list={list} />}
          </li>
        )}
      </>
    )
  );
};

Config.propTypes = {
  list: PropTypes.object,
  handlerList: PropTypes.func,
};

export default Config;
