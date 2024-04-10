import "./Header.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Nav from "../Nav/Nav";
import Pfp from "../Pfp";
import ModalCart from "../ModalCart/ModalCart";

import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthenticationContext";

import useToggles from "../../hooks/useToggles";

const Header = () => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const [search, searchSet] = useState("");
  const { list, setList } = useToggles({
    toggleNav: false,
    toggleCart: false,
  });
  const handlerToggleNav = () =>
    setList((c) => ({ ...c, toggleNav: !list.toggleNav }));

  const handlerToggleCart = () => {
    if (auth.data.status === "authorized")
      setList((c) => ({ ...c, toggleCart: !list.toggleCart }));
    else navigate("/register");
  };
  const handlerInputSearch = (e) => searchSet(() => e.target.value);

  const cartQuantity =
    cart.data.status === "authorized" ? cart.data.result.items.length : 0;
  const displayInputSearch = search.length > 0;

  return (
    <header className="header">
      <Link to="/" className="header__logo-container">
        <img className="header__logo" src="/cart.svg" />
      </Link>
      <div className="header__search-conteiner">
        <input
          className="header__search-input"
          placeholder="Search Product"
          type="search"
          defaultValue={search}
          onChange={(e) => handlerInputSearch(e)}
          name="searchproduct"
        />
        {displayInputSearch && (
          <button className="header__search-button">
            <Link to={`/products?q=${search}`}>
              <img
                className="header__search-img"
                src="/image_2022-12-06_000803145-removebg-preview 1.png"
              />
            </Link>
          </button>
        )}
      </div>
      <div onClick={handlerToggleCart} className="header__cart-conteiner">
        <img className="header__cart-img" src="/carrito.png" />
        <p className="header__cart-quantity">{cartQuantity}</p>
        {list.toggleCart && <ModalCart />}
      </div>
      <Pfp onClick={handlerToggleNav} />
      {list.toggleNav && <Nav onClick={handlerToggleNav} />}
    </header>
  );
};

export default Header;
