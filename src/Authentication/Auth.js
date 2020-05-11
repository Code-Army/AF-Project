import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../contex/UserContext";

export default function Auth() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      customer: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
      <nav className="auth-options">
        {userData.customer ? (
            <button onClick={logout}>Log out</button>
        ) : (
            <>
              <button onClick={register}>Register</button>
              <button onClick={login}>Log in</button>
            </>
        )}
      </nav>
  );
}
