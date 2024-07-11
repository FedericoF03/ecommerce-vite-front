import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthenticationContext";

import useForm from "../hooks/useForm";

import UserForm from "../components/UserForm/UserForm";
import AuthenticationML from "../components/AuthenticationML";

const Login = () => {
  const { loginApi } = useContext(AuthContext);

  const [error, setError] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const { formData, handlerForm } = useForm({ userOrEmail: "", password: "" });

  const controllerLogin = (value) => !isTyping && loginApi(value);

  const controllerHandlerFormLogin = (value) => {
    setIsTyping(true);
    let isTypingInContext;
    clearTimeout(isTypingInContext);
    handlerForm(value);
    isTypingInContext = setTimeout(() => {
      clearTimeout(isTypingInContext);
      setIsTyping(false);
    }, 3000);
  };

  return (
    <main className="background-color--o background-size--100vh display--flex align-items--center justify-content--center background--user-form">
      <UserForm typeForm={"Login"}>
        {!error && (
          <>
            <input
              type="text"
              defaultValue={formData.userOREmail}
              name={"userOREmail"}
              onChange={(e) => controllerHandlerFormLogin(e)}
              placeholder="User/Email"
            />
            <input
              type="current-password"
              defaultValue={formData.password}
              name={"Password"}
              onChange={(e) => controllerHandlerFormLogin(e)}
              placeholder="Password"
            />
            <input
              type="button"
              onClick={() => controllerLogin(formData)}
              value={"login"}
            />
            <Link to={"/register"}>Register</Link>
            <AuthenticationML />
          </>
        )}
        {error && <p onClick={() => setError("Error")}>{error}</p>}
      </UserForm>
    </main>
  );
};

export default Login;
