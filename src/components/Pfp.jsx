import { useContext } from "react";

import { AuthContext } from "../context/AuthenticationContext";

const Pfp = (props) => {
  const auth = useContext(AuthContext);
  const pfp =
    auth.data.status === "authorized"
      ? auth.data.result.thumbnail.picture_url
      : "/user.png";
  return (
    <>
      <button
        {...props}
        className="header__conteiner-pfp display--flex align-items--center"
      >
        <img className="conteiner-pfp__pfp" src={pfp} alt="pfp" />
      </button>
    </>
  );
};

export default Pfp;
