import { Link } from "react-router-dom";
import "./CardHistory.css";

const CardHistory = ({ product: { title, thumbnail, bookmarked_date, id } }) => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return (
    <div className="card-History">
      <p>{meses[new Date(bookmarked_date).getMonth()]}</p>
      <Link to={`/product/${id}`}>
        <div className="display--flex card-History__conteiner-data width--100p justify-content--s-a">
          <img
            className="card-cart__img-product"
            src={thumbnail}
            alt="image-product"
          />
          <p>{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default CardHistory;
