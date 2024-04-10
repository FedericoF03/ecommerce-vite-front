import "./UserForm.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserForm = ({ typeForm, children }) => (
  <div className="conteiner-user-form">
    <form onClick={(e) => e.preventDefault()} className="user-form">
      <h3>{typeForm}</h3>
      {children}
      {typeForm.match(/login/i) && <Link to={"/register"}>Register</Link>}
    </form>
  </div>
);

UserForm.propTypes = {
  typeForm: PropTypes.string,
  children: PropTypes.array
};

export default UserForm;
