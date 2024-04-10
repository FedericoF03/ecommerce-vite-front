import uuid from "react-uuid";
import { useState } from "react";

import AuthenticationML from "../components/AuthenticationML";
import UserForm from "../components/UserForm/UserForm";

import useForm from "../hooks/useForm";

import requests from "../assets/consts/request";

const Register = () => {
  const [register, setRegister] = useState(false);
  const { formData, handlerForm } = useForm({
    userOREmail: "",
    pass: "",
    code: "",
  });

  const postRegister = () => {
    fetch(`http://localhost:3005/authentication/register`, {
      ...requests.postAppJson,
      body: JSON.stringify({
        username: formData.userOREmail,
        password: formData.pass,
      }),
    }).then((res) => {
      if (res.status < 400) setRegister(true);
    });
  };

  const postConfirmRegister = () => {
    fetch(`http://localhost:3005/authentication/register/confirm`, {
      ...requests.postAppJson,
      body: JSON.stringify({
        username: formData.userOREmail,
        password: formData.pass,
      }),
    }).then((res) => {
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
            defaultValue={formData.UserOREmail}
            onChange={(e) => handlerForm(e)}
            placeholder="User/Email"
          />
          <input
            type="current-password"
            name={"pass"}
            defaultValue={formData.pass}
            onChange={(e) => handlerForm(e)}
            placeholder="Password"
          />
          <input type="button" onClick={postRegister} value={"Register"} />
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
          <input type="button" onClick={postConfirmRegister} value="Send" />
        </UserForm>
      )}
    </main>
  );
};

export default Register;
