import uuid from "react-uuid";
import { useState } from "react";
import { Link } from "react-router-dom";

import requestOptions from "../consts/requestOptions";
import URLS from "../consts/URLS";

import useForm from "../hooks/useForm";

import UserForm from "../components/UserForm/UserForm";

import AuthenticationML from "../components/AuthenticationML";

const Register = () => {
  const [register, setRegister] = useState(false);
  const { formData, handlerForm } = useForm({
    userOREmail: "",
    password: "",
    code: "",
  });

  const postRegister = () => {
    const requestOption = requestOptions.postBodyAppJson;
    requestOption.body = JSON.stringify({
      username: formData.userOREmail,
      password: formData.password,
    });
    register
      ? fetch(URLS.register, requestOption).then((res) => {
          if (res.status < 400) setRegister(true);
        })
      : fetch(URLS.registerConfirm, requestOption).then((res) => {
          if (res.status < 400) window.location.replace("/");
        });
  };
  return (
    <main className="background-color--o background-size--100vh display--flex align-items--center justify-content--center background--user-form">
      {!register ? (
        <UserForm typeForm={"Register"}>
          <input
            type="text"
            id=""
            name={"UserOREmail"}
            defaultValue={formData.userOREmail}
            onChange={(e) => handlerForm(e)}
            placeholder="User/Email"
          />
          <input
            type="current-password"
            name={"pass"}
            defaultValue={formData.password}
            onChange={(e) => handlerForm(e)}
            placeholder="Password"
          />
          <input type="button" onClick={postRegister} value={"Register"} />
          <Link to={"/login"}>Login </Link>
          <h3>Login with</h3>
          <AuthenticationML />
        </UserForm>
      ) : (
        <UserForm typeForm={"Register"}>
          <h4>We sent your code to email</h4>
          <input
            type="text"
            key={uuid()}
            name={"code"}
            defaultValue={formData.code}
            onChange={(e) => handlerForm(e)}
            placeholder="code"
          />
          <input type="button" onClick={postRegister} value="Send" />
        </UserForm>
      )}
    </main>
  );
};

export default Register;
