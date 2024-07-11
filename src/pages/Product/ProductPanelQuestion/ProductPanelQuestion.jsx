import "./ProductPanelQuestion.css";

import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

import { AuthContext } from "../../../context/AuthenticationContext";

import useFetch from "../../../hooks/useFetch";
import usePagination from "../../../hooks/usePagination";

import { Question } from "../Question";
import URLS from "../../../consts/URLS";
import requestOptions from "../../../consts/requestOptions";
import checkInstanceIrequest from "../../../utils/checkInstanceIrequest";
import { Fetcher } from "../../../test/components/models/Request/Fetcher";
import makeRequest from "../../../utils/makeRequest";
import { HandlerErrorDefault } from "../../../test/components/models/HandlerError/HandlerErrorDefault";

const ProductPanelQuestion = ({ product }) => {
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const { queryPagination, handlerPaginationOffset } = usePagination();
  const [message, setMessage] = useState([]);

  const questions = useFetch({
    url: user.isAuth
      ? URLS.questions + `?${queryPagination}&product=${product.id}`
      : "",
    options: requestOptions.getBodyEncoded,
  });

  useEffect(() => setMessage([]), [product.id]);

  useEffect(() => {
    checkInstanceIrequest(questions.data) &&
      setMessage((messages) => {
        if (messages.length <= questions.data.response.filters.offset)
          return [...messages, ...questions.data.response.questions];
        else return messages;
      });
  }, [questions.data]);

  const handlerInput = (e) => {
    e.target.value.length <= 150
      ? setInput(e.target.value)
      : setInput((c) => c);
  };

  const postQuestion = async () => {
    const requestQuestionOptions = requestOptions.postBodyAppJson;
    requestQuestionOptions.body = JSON.stringify({
      text: input,
    });

    await makeRequest(
      new Fetcher(URLS.myQuestion, requestQuestionOptions),
      new HandlerErrorDefault()
    );
  };

  const seeMoreStatus =
    message.length > 0 &&
    checkInstanceIrequest(questions.data) &&
    message.length < questions.data.response.total &&
    message.length < 20;

  return (
    <section className="product-panel">
      <div className="product-panel__conteiner-question-input">
        <p className="product-panel__title">Questions</p>
        <div className="product-panel__conteiner-input-question">
          <input
            className="product-panel__input-question"
            contentEditable="true"
            value={input}
            onChange={(e) => handlerInput(e)}
          ></input>
        </div>
        <p style={{ color: "black" }}>{input.length}/150</p>
        <button
          className="product-panel__button-question"
          onClick={postQuestion}
          type="button"
        >
          Question
        </button>
      </div>
      <div className="product-panel__list-questions">
        <p>Recent Questions:</p>
        <div>
          {message && (
            <ol>
              {message.map((el) => (
                <Question key={uuid()} question={el} />
              ))}
            </ol>
          )}
        </div>
        {seeMoreStatus && (
          <button
            className="product-panel__more-questions"
            onClick={() =>
              handlerPaginationOffset("sum", questions.data.response.total)
            }
          >
            ver mas...
          </button>
        )}
        {message.length >= 20 && (
          <Link to={"/message/"}>comments Sections</Link>
        )}
        {user.isAuth && user.isLoading && <p>Need Auth</p>}
      </div>
    </section>
  );
};
ProductPanelQuestion.propTypes = {
  product: PropTypes.object,
};
export default ProductPanelQuestion;
