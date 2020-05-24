import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../contex/UserContext";
import jwt_decode from "jwt-decode";
const jwt = require("jsonwebtoken");
export default function Auth() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();


  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {

    localStorage.setItem("isLogin", false);
   // localStorage.removeItem("isLogin");
    localStorage.removeItem("auth");
      window.location = '/'
  };

  let body;
  const isLogin = localStorage.getItem('isLogin')

  if(isLogin === "true"){
      const token = localStorage.auth
      const user = jwt_decode(token)
       body =   <>
        <button class="btn btn-outline-primary btn-xs" onClick={logout}>Log out</button>
           <p className="btn  btn-xs">{user.CFirstName}</p>
      </>
  }
  else{
     body = <>
      <button class="btn btn-outline-primary btn-xs" onClick={register}>Register</button>&nbsp;&nbsp;
      <button class="btn btn-outline-primary btn-xs" onClick={login}>Log in</button>
    </>
  }
  return (

      <nav className="auth-options">

        {body}

      </nav>
  );
}
