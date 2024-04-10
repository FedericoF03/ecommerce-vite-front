import uuid from "react-uuid";

const MenuBuy = ({
  process,
  ant,
  condition,
  handlerProcess: { setProcess, titleProcess },
  setOptions,
  options: optionsFather,
  children,
  optionsChildren: options,
  title,
}) => {
  return (
    condition && (
      <div>
        <p>{title}</p>
        <ol>
          {options.map((option) => (
            <li key={uuid()}>
              <button
                onClick={(e) => {
                  setOptions({
                    ...optionsFather,
                    [process]: {
                      status: "active",
                      method: e.target.textContent,
                    },
                  });
                  setProcess(titleProcess);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ol>
        {children}
        {ant && <button onClick={() => setProcess(ant)}>ant</button>}
        <button onClick={() => setProcess(titleProcess)}>Next</button>
      </div>
    )
  );
};

export default MenuBuy;
