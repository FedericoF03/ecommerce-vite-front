import "./UserForm.css";
import PropTypes from "prop-types";

const UserForm = ({ typeForm, children }) => (
  <div className="conteiner-user-form">
    <form onClick={(e) => e.preventDefault()} className="user-form">
      <h3>{typeForm}</h3>
      {children}
    </form>
  </div>
);

UserForm.propTypes = {
  typeForm: PropTypes.string,
  children: PropTypes.array
};

export default UserForm;
