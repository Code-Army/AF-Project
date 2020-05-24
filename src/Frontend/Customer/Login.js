import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contex/UserContext";
import Axios from "axios";
import ErrorNotice from "./misc/ErrorNotice";
import Header from "../homepage/Header";

import "../../css/logregcss.css";

import Footer from "./../homepage/Footer";
export default function Login() {
  const [Cemail, setCemail] = useState();
  const [Cpassword, setCpassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const divStyle = {
    margin: '40px',
    border: '5px solid 71cd14',
    padding:'100px'
  };
  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginCustomers = { Cemail, Cpassword };
      const loginRes = await Axios.post(
        "http://localhost:5000/customer/login",
          loginCustomers
      );
      var setUserData = [{
        isLogin:loginRes.data.isLogin,
        id: loginRes.data.id,
        CUserName: loginRes.data.CUserName,
        CFirstName: loginRes.data.CFirstName,
        CLastName: loginRes.data.CLastName,
        Cemail:loginRes.data.Cemail,
      }];



      if (loginRes.data.length > 0){
        localStorage.setItem("auth", loginRes.data);
        localStorage.setItem("isLogin",true);
      }

      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
    <Header/>
      <div className="container">
      <h2>Log in</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit} style={divStyle}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setCemail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setCpassword(e.target.value)}
        />

        <input type="submit" value="Log in" />
      </form>


      </div>
<Footer/>
    </div>
  );
}
