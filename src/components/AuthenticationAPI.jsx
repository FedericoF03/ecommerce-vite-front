import { useState } from "react";

const initStateFormActive = false;
const initStateForm = {
  email: "",
  username: "",
  password: "",
  first_name: "",
  last_name: "",
};
const initStateConfirmCode = false;
const initStateCodeInput = {email: "", code: ""}
const AuthenticationAPI = () => {
  const [formActive, setformActive] = useState(initStateFormActive);
  const [form, setForm] = useState(initStateForm);
  const [confirmCode, setConfirmCode] = useState(initStateConfirmCode);
  const [codeInput, setCodeInput] = useState(initStateCodeInput);
  const changeFormActive = () => {
    if (formActive) return setformActive(initStateFormActive);
    else return setformActive(true);
  };

  const captureFormChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const captureCodechange = (e) => {
    setCodeInput({...codeInput, code: e.target.value});
  };

  const registerApi = async (e) => {
    e.preventDefault();
    const test = await fetch(`http://localhost:3005/authentication/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const send = await test.json();
    if (send) {
      setForm(initStateForm);
      setformActive(initStateFormActive);
      setConfirmCode(true);
      setCodeInput({...codeInput, email: send})
    }
  };

  const confirmRegisterApi = async () => {
    const test = await fetch(`http://localhost:3005/authentication/register/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(codeInput),
    });
    const confirm = await test.json();
   console.log(confirm)
  };

  return (
    <>
      <button onClick={changeFormActive}>test api</button>
      {formActive && (
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={formActive.email}
            required
            onChange={(e) => captureFormChange(e)}
          />
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="username"
            value={formActive.username}
            required
            onChange={(e) => captureFormChange(e)}
          />
          <label htmlFor="password">password:</label>
          <input
            type="text"
            id="password"
            value={formActive.password}
            required
            onChange={(e) => captureFormChange(e)}
          />
          <label htmlFor="first_name">first_name:</label>
          <input
            type="text"
            id="first_name"
            value={formActive.password}
            required
            onChange={(e) => captureFormChange(e)}
          />
          <label htmlFor="last_name">last_name:</label>
          <input
            type="text"
            id="last_name"
            value={formActive.password}
            required
            onChange={(e) => captureFormChange(e)}
          />
          <button onClick={(e) => registerApi(e)}>Enviar</button>
        </form>
      )}
      {confirmCode && (
        <>
          <input
            type="text"
            onChange={(e) => captureCodechange(e)}
            value={codeInput.code}
          />
          <button onClick={confirmRegisterApi}>Enviar code</button>
        </>
      )}
    </>
  );
};

export default AuthenticationAPI;
