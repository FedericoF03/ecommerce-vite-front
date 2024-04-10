import PropTypes from "prop-types";
import uuid from "react-uuid";

const InfoPrint = ({ info }) => {
  const data = Object.entries(info);
  const key = 0;
  const value = 1;
  return (
    <>
      {data &&
        data.map(
          (el) =>
            typeof el[value] !== "object" && (
              <div key={uuid()} className="display--flex">
                <label htmlFor={el[key]}>{el[key]}:</label>
                <input
                  autoComplete={
                    (el[key] === "email" && "email") ||
                    (el[key] === "first_name" && "name") ||
                    "off"
                  }
                  type="text"
                  id={el[key]}
                  name={el[key]}
                  defaultValue={el[value] ? el[value] : "not asigned"}
                />
              </div>
            )
        )}
    </>
  );
};
InfoPrint.propTypes = {
  info: PropTypes.object,
};

export default InfoPrint;
