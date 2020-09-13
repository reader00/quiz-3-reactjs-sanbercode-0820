import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { WebContext } from "./Routes";

const Login = () => {
  const history = useHistory();
  const { setLogin } = useContext(WebContext);
  const [input, setInput] = useState({
    username: "",
    password: "",
    wrong: "",
  });
  const username = "admin";
  const password = "admin";

  const submitHandler = (event) => {
    event.preventDefault();
    if (username === input.username && password === input.password) {
      setLogin("true");
      setInput({
        username: "",
        password: "",
        wrong: "",
      });
      console.log("Berhasil");
      history.push("/");
    } else {
      setInput({
        username: "",
        password: "",
        wrong: "Wrong username or password",
      });
    }
  };

  const passHandler = (event) => {
    var password = event.target.value;
    setInput({ ...input, password });
  };

  const usernameHandler = (event) => {
    var username = event.target.value;
    setInput({ ...input, username });
  };

  return (
    <div className="wrapper-login">
      <br />
      <div className="my-card">
        <div className="label my-card">Login</div>
        <div style={{ color: "red" }}>{input.wrong}</div>
        <form onSubmit={submitHandler}>
          <table style={{ width: "100%", margin: "0 auto" }}>
            <tbody>
              <tr>
                <td>Username</td>
                <td>:</td>
                <td>
                  <input
                    type="text"
                    value={input.username}
                    onChange={usernameHandler}
                    required="required"
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>:</td>
                <td>
                  <input
                    type="password"
                    value={input.password}
                    onChange={passHandler}
                    required="required"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" style={{ marginTop: "10px" }}>
            Login
          </button>
        </form>
      </div>
      <br />
    </div>
  );
};

export default Login;
