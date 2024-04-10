import { useLocation } from "react-router-dom";
import "./Ubi.css";

const Ubi = () => {
  const {search} = useLocation()
  return (
    <div className="ubication-conteiner">
      <button className="ubication-conteiner__ubication-button">{search}</button>
    </div>
  );
};

export default Ubi;
