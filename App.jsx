import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./src/components/ProtectedRoute/ProtectedRoute";
import ConteinerCartOrFav from "./src/components/ConteinerCartOrFav/ConteinerCartOrFav";

import Home from "./src/Routes/Home";
import Register from "./src/Routes/Register";
import Login from "./src/Routes/Login";
import Products from "./src/Routes/Products";
import Product from "./src/Routes/Product";
import Settings from "./src/Routes/Settings";
import History from "./src/Routes/History";
import Cart from "./src/Routes/Cart";
import Fav from "./src/Routes/Fav";
import Boughts from "./src/Routes/Boughts";
import Bought from "./src/Routes/Bought";
import MyOpinions from "./src/Routes/MyOpinions";
import Message from "./src/Routes/Message";
import Buy from "./src/Routes/Buy";
import CreateProduct from "./src/Routes/CreateProduct";

function App() {
  const protectedRoute = (route) => <ProtectedRoute>{route}</ProtectedRoute>;

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/*" element={<Products />} />
        <Route path="/product/:productParam" element={<Product />} />
        <Route path="/user/settings" element={protectedRoute(<Settings />)} />
        <Route path="/history" element={protectedRoute(<History />)} />
        <Route
          path="/cart"
          element={protectedRoute(
            <ConteinerCartOrFav>
              <Cart />
            </ConteinerCartOrFav>
          )}
        />
        <Route
          path="/favorite"
          element={protectedRoute(
            <ConteinerCartOrFav>
              <Fav />
            </ConteinerCartOrFav>
          )}
        />
        <Route path={`/boughts`} element={protectedRoute(<Boughts />)} />
        <Route path={`/bought`} element={protectedRoute(<Bought />)} />
        <Route path={`/myopinions`} element={protectedRoute(<MyOpinions />)} />
        <Route path={`/message`} element={protectedRoute(<Message />)} />
        <Route path={`/buy`} element={protectedRoute(<Buy />)} />
        <Route
          path={`/publicate`}
          element={protectedRoute(<CreateProduct />)}
        />
        <Route path="/*" element={<p>Error route not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
