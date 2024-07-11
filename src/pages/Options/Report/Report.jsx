import { useState } from "react";
import uuid from "react-uuid";

import URLS from "../../../consts/URLS";
import requestOptions from "../../../consts/requestOptions";

import makeRequest from "../../../utils/makeRequest";

import { Fetcher } from "../../../test/components/models/Request/Fetcher";
import { HandlerErrorDefault } from "../../../test/components/models/HandlerError/HandlerErrorDefault";

const Report = () => {
  const [options, setOptions] = useState({
    selected: null,
    list: [null, "persona", "producto", "bug"],
  });
  const [form, setForms] = useState({
    title: "",
    text: "",
  });

  const reportPost = () => {
    if (options.selected) {
      const reportOptions = requestOptions.postBodyAppJson;
      reportOptions.body = JSON.stringify({
        type: options.selected,
        title: form.title,
        text: form.text,
      });
      makeRequest(
        new Fetcher(URLS.myReport, reportOptions),
        new HandlerErrorDefault()
      );
    }
  };

  return (
    <div>
      <select
        defaultValue={options.selected}
        onChange={(e) =>
          setOptions(() => ({ ...options, selected: e.target.value }))
        }
      >
        {options.list.map((el) => (
          <option key={uuid()} value={el}>
            {el ? el : "tipo de reporte"}
          </option>
        ))}
      </select>
      <div>
        <input
          name="title"
          id={uuid()}
          value={form.title}
          placeholder="title"
          onChange={(e) =>
            setForms({
              ...form,
              title: e.target.value,
            })
          }
        />
        <input
          name="text"
          id={uuid()}
          value={form.text}
          placeholder="text"
          onChange={(e) =>
            setForms({
              ...form,
              text: e.target.value,
            })
          }
        />
        <button onClick={() => reportPost()}>Enviar</button>
      </div>
    </div>
  );
};

export default Report;
