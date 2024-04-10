import "./MenuCartOrFav.css"
import { Link } from "react-router-dom"

const MenuCartOrFav = () => {
  return (
    <div className="menu-cart-or-fav display--flex">
      <Link to={"/cart"} className="menu-cart-or-fav__cart-link">Cart</Link>
      <Link to={"/favorite"}  className="menu-cart-or-fav__cart-fav">Fav</Link>
    </div>
  )
}

export default MenuCartOrFav