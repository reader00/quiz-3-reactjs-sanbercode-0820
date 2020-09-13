import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./index";
import About from "./about";
import Login from "./login";
import logo from "./public/img/logo.png";
import Edit from "./edit";
import Logout from "./logout";

export const WebContext = createContext();

export default function App() {
  const [movie, setMovie] = useState(null);
  const [login, setLogin] = useState(null);
  const [navbar, setNavbar] = useState([
    { to: "/", text: "Home", comp: Home },
    { to: "/about", text: "About", comp: About },
    { to: "/login", text: "Login", comp: Login },
  ]);

  useEffect(() => {
    if (movie === null) {
      axios
        .get("http://backendexample.sanbercloud.com/api/movies")
        .then((result) => {
          console.log(result);
          setMovie(result.data);
        })
        .catch((error) => console.log(error));
    }

    if (login == null) {
      var data = JSON.parse(localStorage.getItem("quiz3"));
      setLogin(data.login);
    }

    if (login === "true") {
      setNavbar([
        { to: "/", text: "Home", comp: Home },
        { to: "/about", text: "About", comp: About },
        { to: "/edit", text: "Edit Movie List", comp: Edit },
        { to: "/logout", text: "Logout", comp: Logout },
      ]);
      localStorage.setItem("quiz3", JSON.stringify({ login: "true" }));
    } else {
      setNavbar([
        { to: "/", text: "Home", comp: Home },
        { to: "/about", text: "About", comp: About },
        { to: "/login", text: "Login", comp: Login },
      ]);
      localStorage.setItem("quiz3", JSON.stringify({ login: "false" }));
    }
  }, [movie, login]);

  return (
    <WebContext.Provider value={{ movie, setMovie, setLogin }}>
      <Router>
        <header>
          <img id="logo" src={logo} width="200px" alt="" />
          <nav>
            <ul>
              {navbar.map((el) => {
                return (
                  <li>
                    <Link to={el.to}>{el.text}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
        <div className="content">
          <Switch>
            {navbar.map((el) => {
              return <Route exact path={el.to} component={el.comp} />;
            })}
          </Switch>
        </div>
      </Router>
    </WebContext.Provider>
  );
}
