import MenuCartOrFav from "../MenuCartOrFav/MenuCartOrFav";

const ConteinerCartOrFav = ({ children }) => {
  return (
    <main className="background-color--b background-size--100vh">
      <MenuCartOrFav />
      {children}
    </main>
  );
};

export default ConteinerCartOrFav;
