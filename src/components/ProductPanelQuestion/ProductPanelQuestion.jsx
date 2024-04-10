import "./ProductPanelQuestion.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

import { Question } from "../Question";

import usePagination from "../../hooks/usePagination";
import { useFetch } from "../../hooks/useFetch";

import requests from "../../assets/consts/request";

const ProductPanelQuestion = ({ item }) => {
  const [input, setInput] = useState("");
  const { query, handlerPaginationOffset } = usePagination({
    setLimit: 3,
  });
  const [message, setMessage] = useState([]);
  const questions = useFetch({
    url: `http://localhost:3005/products/item/questions${query}&item=${item.id}`,
    config: requests.getURLencoded,
  });

  const questionsSetter = questions.setData;
  
  useEffect(() => setMessage([]), [item.id]);

  useEffect(
    () => questionsSetter((c) => ({ ...c, status: "wait" })),
    [query, questionsSetter, item.id]
  );

  useEffect(() => {
    questions.data.status === "authorized" &&
      setMessage((messages) => {
        if (messages.length <= questions.data.result.filters.offset)
          return [...messages, ...questions.data.result.questions];
        else return messages;
      });
  }, [questions.data.status, questions.data.result]);

  const handlerInput = (e) => {
    e.target.value.length <= 150
      ? setInput(e.target.value)
      : setInput((c) => c);
  };

  const postQuestion = async () => {
    const req = {
      url: `http://localhost:3005/user/myquestion`,
      obj: {
        ...requests.postAppJson,
        body: JSON.stringify({
          text: input,
        }),
      },
    };
    await fetch(req.url, req.obj);
  };

  const seeMoreStatus =
    message.length > 0 &&
    questions.data.status === "authorized" &&
    message.length < questions.data.result.total &&
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
              handlerPaginationOffset("sum", questions.data.result.total)
            }
          >
            ver mas...
          </button>
        )}
        {message.length >= 20 && (
          <Link to={"/message/"}>comments Sections</Link>
        )}
      </div>
    </section>
  );
};
ProductPanelQuestion.propTypes = {
  item: PropTypes.object,
};
export default ProductPanelQuestion;
