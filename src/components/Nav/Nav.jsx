import "./Nav.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthenticationContext";
import { SiteContext } from "../../context/SiteContext";

const Nav = (props) => {
  const site = useContext(SiteContext);
  const auth = useContext(AuthContext);
  const [toggleCategories, setToggleCategories] = useState(false);

  const handlerToggleCategories = () => setToggleCategories(!toggleCategories);

  const buttonsAuthDisplay = auth.data.status === "authorized";

  return (
    <nav className="nav">
      <ul>
        {!toggleCategories && (
          <>
            <li id="sidebar" {...props}>
              <NavLink id="sidebar" to={"/"}>
                Home
              </NavLink>
            </li>
            {buttonsAuthDisplay ? (
              <li id="sidebar" onClick={auth.disconnect}>
                <a>Logout</a>
              </li>
            ) : (
              <>
                <li id="sidebar" {...props}>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
                <li id="sidebar" {...props}>
                  <NavLink to={"/register"}>Register</NavLink>
                </li>
              </>
            )}
            <li id="sidebar" onClick={handlerToggleCategories}>
              <button>Category</button>
            </li>
            <li id="sidebar" {...props}>
              <NavLink to={"/cart"}>Cart</NavLink>
            </li>
            <li id="sidebar" {...props}>
              <NavLink to={"/boughts"}>boughts</NavLink>
            </li>
            <li id={"sidebar"} {...props}>
              <NavLink to={"/user/me"}>me</NavLink>
            </li>
            <li id="sidebar" {...props}>
              <NavLink to={"/favorite"}>favorite</NavLink>
            </li>
            <li id="sidebar" {...props}>
              <NavLink to={"/history"}>history</NavLink>
            </li>
          </>
        )}
        {toggleCategories &&
          site.data.status === "authorized" &&
          site.data.result.map((el) => (
            <li
              id="sidebar"
              {...props}
              key={el.id}
              data-id={el.id}
              data-name={el.name}
            >
              <NavLink to={`/products/${el.id}`}>{el.name}</NavLink>
            </li>
          ))}
        {toggleCategories && site.data.status === "failed" && (
          <li>No se pudieron cargar las categorias</li>
        )}
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  handlerToggleNav: PropTypes.func,
  props: PropTypes.object,
};

export default Nav;
