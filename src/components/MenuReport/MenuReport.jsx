import { PropTypes } from "prop-types";
import { useState } from "react";

import requestOptions from "../../consts/requestOptions";
import URLS from "../../consts/URLS";

import makeRequest from "../../utils/makeRequest";

import { Fetcher } from "../../test/components/models/Request/Fetcher";
import { HandlerErrorDefault } from "../../test/components/models/HandlerError/HandlerErrorDefault";

const MenuReport = ({ product }) => {
  const [input, setInput] = useState({ title: "", content: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (input.title.length > 0 && input.content.length > 0) {
      const myReportOptions = requestOptions.postBodyAppJson;
      myReportOptions.body = JSON.stringify({
        itemID: product.id,
        title: input.title,
        text: input.content,
      });
      makeRequest(
        new Fetcher(URLS.myReport, myReportOptions),
        new HandlerErrorDefault()
      ).then(() => {});
    }
  };

  return (
    <div>
      <p data-name={"menuReport"} onClick={(e) => {}}>
        {"<-----"}
      </p>
      <form className="background-size--100vh">
        <label htmlFor="title">
          title:{" "}
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={(e) =>
              setInput((antState) => ({
                ...antState,
                title: e.target.value,
              }))
            }
          />
        </label>
        <label htmlFor="content">
          content:{" "}
          <input
            type="text"
            name="content"
            value={input.content}
            onChange={(e) =>
              setInput((antState) => ({
                ...antState,
                content: e.target.value,
              }))
            }
          />
        </label>
        <input
          data-name={"menuReport"}
          type="submit"
          value="Submit"
          onClick={(e) => submit(e)}
        />
      </form>
    </div>
  );
};
MenuReport.propTypes = {
  product: PropTypes.object,
};
export default MenuReport;
