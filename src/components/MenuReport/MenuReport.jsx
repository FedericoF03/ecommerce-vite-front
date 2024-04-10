import { PropTypes } from "prop-types";
import { useState } from "react";

const MenuReport = ({ item, handlerList }) => {
  const [input, setInput] = useState({ title: "", content: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (input.title.length > 0 && input.content.length > 0)
      await fetch(`http://localhost:3005/user/myreport`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemID: item.id,
          title: input.title,
          text: input.content,
        }),
      }).then(() => handlerList({ e }));
  };

  return (
    <div>
      <p data-name={"menuReport"} onClick={(e) => handlerList({ e })}>
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
  item: PropTypes.object,
  handlerList: PropTypes.func,
  listData: PropTypes.object,
};
export default MenuReport;
