import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { WebContext } from "./Routes";

const Logout = () => {
  const { setLogin } = useContext(WebContext);
  const history = useHistory();

  const handleLogout = () => {
    setLogin("false");
    history.push("/");
  };

  return (
    <div className="logout" onClick={handleLogout}>
      Logout
    </div>
  );
};

export default Logout;
