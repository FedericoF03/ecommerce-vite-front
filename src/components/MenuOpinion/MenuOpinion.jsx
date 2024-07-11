import { PropTypes } from "prop-types";
import { useState } from "react";

import URLS from "../../consts/URLS";
import requestOptions from "../../consts/requestOptions";

import useFetch from "../../hooks/useFetch";
import { Fetcher } from "../../test/components/models/Request/Fetcher";
import makeRequest from "../../utils/makeRequest";
import { HandlerErrorDefault } from "../../test/components/models/HandlerError/HandlerErrorDefault";

const MenuOpinion = ({ product }) => {
  const [input, setInput] = useState({ title: "", content: "" });
  const { data, setData } = useFetch({
    url: URLS.opinionByProduct + `?id=${product.id}`,
    obj: requestOptions.getBodyEncoded,
  });

  const submit = async (e) => {
    e.preventDefault();

    if (input.title.length > 0 && input.content.length > 0) {
      const myOpinionOptions = requestOptions.postBodyAppJson;
      myOpinionOptions.body = JSON.stringify({
        itemID: product.id,
        title: input.title,
        content: input.content,
      });
      makeRequest(
        new Fetcher(URLS.myOpinion, myOpinionOptions),
        new HandlerErrorDefault()
      ).then((opinion) => {
        if (opinion) {
          setData((e) => ({ ...e, loading: true }));
        }
      });
    }
  };

  return (
    <div className="background-size--100vh">
      {
        <p data-name={"menuOpinion"} onClick={(e) => {}}>
          {"<----"}
        </p>
      }
      {data.result && !data.loading && (
        <div>
          <p>{data.result.title}</p>
          <div>
            <p>{data.result.content}</p>
          </div>
        </div>
      )}
      {!data.result && !data.loading && <p>No opinions for this product</p>}
      {!data.result && !data.loading && (
        <p data-name={"opinionCreate"} onClick={(e) => {}}>
          Open opinion
        </p>
      )}
      {!data.loading && (
        <form>
          <p data-name={"opinionCreate"} onClick={(e) => {}}>
            {"<----"}
          </p>
          <input
            type="text"
            value={input.title}
            name={"title"}
            onChange={(e) =>
              setInput((v) => ({
                ...v,
                title: e.target.value,
              }))
            }
          />
          <div>
            <input
              type="text"
              value={input.content}
              name={"content"}
              onChange={(e) =>
                setInput((v) => ({
                  ...v,
                  content: e.target.value,
                }))
              }
            />
          </div>
          {!data.result && !data.loading && (
            <input
              type="submit"
              data-name={"opinionCreate"}
              onClick={(e) => submit(e)}
              value="Save opinion"
            />
          )}
        </form>
      )}
      {data.result && !data.loading && (
        <input
          type="submit"
          data-name={"opinionCreate"}
          onClick={(e) => {}}
          value="Edit opinion"
        />
      )}
    </div>
  );
};
MenuOpinion.propTypes = {
  product: PropTypes.object,
};
export default MenuOpinion;
