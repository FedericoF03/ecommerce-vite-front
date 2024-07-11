import "./Header.css";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../context/CartContext";

import checkInstanceIrequest from "../../utils/checkInstanceIrequest";

import ModalCart from "../ModalCart/ModalCart";
import Pfp from "../Pfp";
import Nav from "../Nav/Nav";

const Header = () => {
  const { cart } = useContext(CartContext);

  const quantityInCart = checkInstanceIrequest(cart.data)
    ? cart.data.response.items.length
    : 0;

  //se puede hacer un hook para esto
  const [search, searchSet] = useState("");
  const displayInputSearch = search.length > 0;
  const handlerInputSearch = (e) => searchSet(() => e.target.value);

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
      <div onClick={() => {}} className="header__cart-conteiner">
        <img className="header__cart-img" src="/carrito.png" />
        <p className="header__cart-quantity">{quantityInCart}</p>
        <ModalCart />
      </div>
      <Pfp onClick={() => {}} />
      <Nav onClick={() => {}} />
    </header>
  );
};

export default Header;
