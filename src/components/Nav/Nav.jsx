import "./Nav.css";

import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import uuid from "react-uuid";

import { AuthContext } from "../../context/AuthenticationContext";
import { SiteContext } from "../../context/SiteContext";

import checkInstanceIrequest from "../../utils/checkInstanceIrequest";


const Nav = (props) => {
  const site = useContext(SiteContext);
  const { user } = useContext(AuthContext);

  return (
    <nav className="nav">
      <ul>
        {
          <>
            <li id="sidebar" {...props}>
              <NavLink id="sidebar" to={"/"}>
                Home
              </NavLink>
            </li>
            {user.isAuth ? (
              <>
                <li id="sidebar" onClick={user.disconnect}>
                  <a>Logout</a>
                </li>
                <li id={"sidebar"} {...props}>
                  <NavLink to={"/user/settings"}>me</NavLink>
                </li>
              </>
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
            <li id="sidebar" onClick={() => {}}>
              <button>Category</button>
            </li>
            <li id="sidebar" {...props}>
              <NavLink to={"/cart"}>Cart</NavLink>
            </li>
            <li id="sidebar" {...props}>
              <NavLink to={"/boughts"}>boughts</NavLink>
            </li>

            <li id="sidebar" {...props}>
              <NavLink to={"/favorite"}>favorite</NavLink>
            </li>
            <li id="sidebar" {...props}>
              <NavLink to={"/history"}>history</NavLink>
            </li>
          </>
        }
        {checkInstanceIrequest(site.categoriesList.data) &&
          site.categoriesList.data.response.map((category) => (
            <li
              id="sidebar"
              key={uuid()}
              data-id={category.id}
              data-name={category.name}
            >
              <NavLink to={`/products/${category.id}`}>{category.name}</NavLink>
            </li>
          ))}
        {!site.categoriesList.isLoading &&
          (!checkInstanceIrequest(site.categoriesList.data) ||
            site.categoriesList.data.response.length < 0) && (
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
