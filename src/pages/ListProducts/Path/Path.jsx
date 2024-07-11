import "./Path.css"
import { useLocation } from "react-router-dom";


const Path = () => {
  const {pathname} = useLocation()
  return <p className="path">{pathname}</p>;
};

export default Path;
