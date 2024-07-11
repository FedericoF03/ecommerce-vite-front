import PropTypes from "prop-types";
import { Fragment } from "react";
import uuid from "react-uuid";

const InfoPrint = ({ info }) => {
  console.log(info);
  const iteratorArrays = (infoData) => {
    infoData.map((element) => {
      if (element instanceof Object && !Array.isArray(element)) {
        return iteratorInfo(element);
      } else if (element instanceof Object && Array.isArray(element)) {
        return iteratorArrays(element);
      } else if (element !== null) {
        return (
          <li className="display--flex" key={uuid()}>
            {element}
          </li>
        );
      }
    });
  };

  const iteratorInfo = (infoData) => {
    return Object.entries(infoData).map((element) => {
      if (element[1] instanceof Object && !Array.isArray(element[1])) {
        return (
          <div className="display--flex" key={uuid()}>
            <ul>
              {element[0]}
              {iteratorInfo(element[1])}
            </ul>
          </div>
        );
      } else if (element[1] instanceof Object && Array.isArray(element[1])) {
        return (
          <div className="display--flex" key={uuid()}>
            <ul>
              {element[0]}:
              {element[1].length > 0 ? (
                iteratorArrays(element[1])
              ) : (
                <input
                  type="text"
                  disabled
                  readOnly
                  id={element[0]}
                  defaultValue={"empty"}
                />
              )}
            </ul>
          </div>
        );
      } else if (typeof element[1] === "boolean") {
        return (
          <div className="display--flex" key={uuid()}>
            <label htmlFor={element[0]}>{element[0]}</label>:
            <input
              type="text"
              disabled
              readOnly
              id={element[0]}
              defaultValue={!element[1] ? "false" : "true"}
            />
          </div>
        );
      } else {
        return (
          <div className="display--flex" key={uuid()}>
            <label htmlFor={element[0]}>{element[0]}</label>
            <input
              type="text"
              disabled
              readOnly
              id={element[0]}
              defaultValue={
                element[1] !== "" && element[1] !== "" && element[1] !== null
                  ? element[1]
                  : "empty"
              }
            />
          </div>
        );
      }
    });
  };

  return <>{iteratorInfo(info)}</>;
};
InfoPrint.propTypes = {
  info: PropTypes.object,
};

export default InfoPrint;
