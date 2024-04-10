import PropTypes from "prop-types";

export const Question = ({ question }) => {
  let valueResponse = null;
  if (question.status === "ANSWERED")
    valueResponse = (
      <p className="product-panel__question-user">{question.answer?.text}</p>
    );
  else if (question.status === "BANNED")
    valueResponse = <p>This comment removed for admin</p>;
  else if (question.status !== "UNANSWERED")
    valueResponse = <p>Waiting for response</p>;
  else valueResponse = <p>No contempled</p>;

  return (
    <li>
      <p className="product-panel__question-user-title">{question.text}</p>
      {valueResponse}
    </li>
  );
};

Question.propTypes = {
  question: PropTypes.object,
};
