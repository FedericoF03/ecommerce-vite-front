import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./CardBoughts.css";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthenticationContext";
import { BoughtContext } from "../../context/BoughtContext";
import requestOptions from "../../consts/requestOptions";
import makeRequest from "../../utils/makeRequest";
import { Fetcher } from "../../test/components/models/Request/Fetcher";
import { HandlerErrorDefault } from "../../test/components/models/HandlerError/HandlerErrorDefault";
import URLS from "../../consts/URLS";
import checkInstanceIrequest from "../../utils/checkInstanceIrequest";

const CardBoughts = ({ bought }) => {
  const { boughts } = useContext(BoughtContext);
  const { data } = useContext(AuthContext);

  const postFacture = async (e) => {
    e.preventDefault();
    if (checkInstanceIrequest(boughts.data)) {
      const bought = boughts.data.result.orders.find(
        (el) => el._id === bought._id
      );
      const pdfOptions = requestOptions.postAppJson;
      pdfOptions.body = JSON.stringify({
        bought,
        street: null,
        country: null,
        location: null,
        factureSerial: bought._id,
        user: data.result.nickname,
      });
      makeRequest(
        new Fetcher(URLS.PDF, requestOptions.postBodyAppJson),
        new HandlerErrorDefault()
      )
        .then((response) => response.blob())
        .then((blob) => {
          // Crea un enlace temporal y descarga el archivo
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Factura.pdf");

          link.click();
        })
        .catch((error) => {
          console.error("Error en la solicitud POST:", error);
        });
    }
  };

  const itemTest = {
    sent: "envio",
    status: "despachado",
  };

  // bought.Date = new Date(bought.bookmarked_date);
  // bought.cost = bought.items.reduce((acc, item) => acc + item.price, 0);

  return (
    <Link
      className="card-boughts display--flex"
      to={`/bought?bought=${bought._id}`}
    >
      <div className="card-boughts display--flex">
        <p className="card-boughts__product-name">
          {bought.bookmarked_date.toLocaleString()}
        </p>
        <div className="card-cart__img-product">
          {bought.items.map(
            (el, i) =>
              i < 3 && (
                <img key={el.item_id} src={el.image} alt="image product" />
              )
          )}
        </div>
        <div className="card-boughts__conteiner-data">
          <div className="display--flex">
            <p>Cost: </p>
            <p>
              {parseInt(bought.price_total)
                .toFixed(2)
                .toString()
                .replace(".", ",")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
          </div>
          <div className="display--flex">
            <p>Sent:</p>
            <p>{itemTest.sent}</p>
          </div>
          <div className="display--flex">
            <p>Status: </p>
            <p>{itemTest.status}</p>
          </div>
          <div className="display--flex">
            <p>Quantity</p>
            <p>{bought.quantity_total}</p>
          </div>
        </div>
        <p
          className="card-boughts__facture-button"
          onClick={(e) => postFacture(e)}
        >
          facture
        </p>
      </div>
    </Link>
  );
};

CardBoughts.propTypes = {
  bought: PropTypes.object,
};

export default CardBoughts;
