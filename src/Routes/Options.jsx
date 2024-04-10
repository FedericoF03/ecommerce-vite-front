import Config from "../components/Config/Config";
import Help from "../components/Help/Help";
import useToggles from "../hooks/useToggles";

const Options = () => {
  const { list, handlerList } = useToggles({});
  console.log(list)
  return (
    <main className="background-color--o background-size--100vh background--user-form">
      <ol className="display--flex options">
        <li>
          <button data-name={"account"} onClick={(e) => handlerList({ e })}>
            {list.account?.display ? "<--" : "Account"}
          </button>
        </li>
        <Config list={list} handlerList={handlerList} />
        <li>
          <button data-name={"help"} onClick={(e) => handlerList({ e })}>
            Help
          </button>
        </li>
        <Help list={list} handlerList={handlerList} />
      </ol>
    </main>
  );
};

export default Options;
