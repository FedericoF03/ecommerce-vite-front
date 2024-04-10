import AuthenticationML from "../components/AuthenticationML";
import UserForm from "../components/UserForm/UserForm";

import useForm from "../hooks/useForm";

import requests from "../assets/consts/request";

const Login = () => {
  const { formData, handlerForm } = useForm({ userOREmail: "", pass: "" });

  const postLogin = () => {
    fetch(`http://localhost:3005/authentication/api`, {
      ...requests.postAppJson,
      body: JSON.stringify({
        username: formData.userOREmail,
        password: formData.pass,
      }),
    }).then((res) => {
      if (res.status < 400) history.back();
    });
  };

  return (
    <main className="background-color--o background-size--100vh display--flex align-items--center justify-content--center background--user-form">
      <UserForm typeForm={"Login"}>
        <input
          type="text"
          defaultValue={formData.userOREmail}
          name={"userOREmail"}
          onChange={(e) => handlerForm(e)}
          placeholder="User/Email"
        />
        <input
          type="current-password"
          defaultValue={formData.pass}
          name={"pass"}
          onChange={(e) => handlerForm(e)}
          placeholder="Password"
        />
        <input type="button" onClick={postLogin} value={"login"} />
        <AuthenticationML />
      </UserForm>
    </main>
  );
};

export default Login;
