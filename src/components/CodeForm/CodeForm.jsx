import PropTypes from "prop-types";
import "./CodeForm.css";

const UserForm = ({ typeForm }) => {
  return (
    <div className="conteiner-user-form">
      <form className="user-form">
        <h3>{typeForm}</h3>
        <h4>We sent your code to email</h4>
        <input type="text" name="" id="" placeholder="Code" />
        <input type="button" value={"Send"} />
      </form>
    </div>
  );
};

UserForm.propTypes = {
  typeForm: PropTypes.string,
};

export default UserForm;
