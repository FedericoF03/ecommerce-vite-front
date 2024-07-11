import Config from "../pages/Options/Config/Config";
import Help from "../pages/Options/Help/Help";

const Settings = () => {
  return (
    <main className="background-color--o background-size--100vh background--user-form">
      <ol className="display--flex options">
        <li>
          <button
            data-name={"account"}
            onClick={(e) => {
              e;
            }}
          >
            {"<--"}
          </button>
        </li>
        <Config />
        <li>
          <button data-name={"help"} onClick={(e) => ({ e })}>
            Help
          </button>
        </li>
        <Help />
      </ol>
    </main>
  );
};

export default Settings;
