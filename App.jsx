import "./App.css";
import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Register from "./src/Routes/Register";
import Home from "./src/Routes/Home";
import Login from "./src/Routes/login";
import Product from "./src/Routes/Product";
import Cart from "./src/Routes/Cart";
import Fav from "./src/Routes/Fav";
import History from "./src/Routes/History";
import List from "./src/Routes/List";
import Options from "./src/Routes/Options";
import Boughts from "./src/Routes/Boughts";
import Bought from "./src/Routes/Bought";
import MyOpinions from "./src/Routes/MyOpinions";
import Message from "./src/Routes/Message";

import ConteinerCartOrFav from "./src/components/ConteinerCartOrFav/ConteinerCartOrFav";

import { AuthContext } from "./src/context/AuthenticationContext";
import Buy from "./src/Routes/Buy";
import CreateProduct from "./src/Routes/CreateProduct";
import HeaderAndFooter from "./src/components/HeaderAndFooter/HeaderAndFooter";

function App() {
  const auth = useContext(AuthContext);

  const routes = (route, alternativeNavigate) => {
    const {
      data: { status },
    } = auth;

    if (status === "authorized") return route;
    else if (status === "failed")
      <Navigate to={alternativeNavigate || "/register"} />;
  };

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HeaderAndFooter>
                <Home />
              </HeaderAndFooter>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route
            path="/products/*"
            element={
              <HeaderAndFooter>
                <List />
              </HeaderAndFooter>
            }
          />
          <Route
            path="/product/:productParam"
            element={
              <HeaderAndFooter>
                <Product />
              </HeaderAndFooter>
            }
          />
          <Route path="/user/me" element={routes(<Options />)} />
          <Route
            path="/history"
            element={<HeaderAndFooter>{routes(<History />)}</HeaderAndFooter>}
          />
          <Route
            path="/cart"
            element={
              <HeaderAndFooter>
                {routes(
                  <ConteinerCartOrFav>
                    <Cart />
                  </ConteinerCartOrFav>,
                  <Cart />
                )}
              </HeaderAndFooter>
            }
          />
          <Route
            path="/favorite"
            element={
              <HeaderAndFooter>
                {routes(
                  <ConteinerCartOrFav>
                    <Fav />
                  </ConteinerCartOrFav>,
                  <Fav />
                )}
              </HeaderAndFooter>
            }
          />
          <Route
            path={`/boughts`}
            element={<HeaderAndFooter>{routes(<Boughts />)}</HeaderAndFooter>}
          />
          <Route
            path={`/bought`}
            element={<HeaderAndFooter>{routes(<Bought />)}</HeaderAndFooter>}
          />
          <Route
            path={`/myopinions`}
            element={
              <HeaderAndFooter>{routes(<MyOpinions />)}</HeaderAndFooter>
            }
          />
          <Route
            path={`/message`}
            element={<HeaderAndFooter>{routes(<Message />)}</HeaderAndFooter>}
          />
          <Route
            path={`/buy`}
            element={<HeaderAndFooter>{routes(<Buy />)}</HeaderAndFooter>}
          />
          <Route path={`/publicate`} element={routes(<CreateProduct />)} />
          <Route path="/*" element={<p>Error route not found</p>} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
