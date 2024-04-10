import { PropTypes } from "prop-types";
import { useFetch } from "../../hooks/useFetch";
import requests from "../../assets/consts/request";
import { useState } from "react";

const MenuOpinion = ({ item, handlerList, listData }) => {
  const [input, setInput] = useState({ title: "", content: "" });
  const { data, setData } = useFetch({
    url: `http://localhost:3005/user/opinion/byproduct?id=${item.id}`,
    obj: requests.getURLencoded,
  });

  const submit = async (e) => {
    e.preventDefault();

    if (input.title.length > 0 && input.content.length > 0) {
      await fetch(`http://localhost:3005/user/myopinion`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemID: item.id,
          title: input.title,
          content: input.content,
        }),
      }).then((el) => {
        if (el) {
          setData((e) => ({ ...e, loading: true }));
          handlerList({ e });
        }
      });
    }
  };

  return (
    <div className="background-size--100vh">
      {!data.result &&
        !data.loading &&
        listData.menuOpinion.display &&
        !listData.opinionCreate.display && (
          <p
            data-name={"menuOpinion"}
            onClick={(e) => {
              handlerList({ e });
            }}
          >
            {"<----"}
          </p>
        )}
      {data.result && !data.loading && (
        <div>
          <p>{data.result.title}</p>
          <div>
            <p>{data.result.content}</p>
          </div>
        </div>
      )}
      {!data.result && !data.loading && !listData.opinionCreate.display && (
        <p>No opinions for this product</p>
      )}
      {!data.result && !data.loading && !listData.opinionCreate.display && (
        <p
          data-name={"opinionCreate"}
          onClick={(e) => {
            handlerList({ e });
          }}
        >
          Open opinion
        </p>
      )}
      {!data.loading && listData.opinionCreate.display && (
        <form>
          <p
            data-name={"opinionCreate"}
            onClick={(e) => {
              handlerList({ e });
            }}
          >
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
          onClick={(e) => handlerList({ e })}
          value="Edit opinion"
        />
      )}
    </div>
  );
};
MenuOpinion.propTypes = {
  item: PropTypes.object,
  handlerList: PropTypes.func,
  listData: PropTypes.object,
};
export default MenuOpinion;
