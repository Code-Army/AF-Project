import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contex/UserContext";
import Axios from "axios";
import ErrorNotice from "./misc/ErrorNotice";
import Header from "../homepage/Header";

export default function Register() {
  const [CFirstName, setCFirstName] = useState();
  const [CLastName, setCLastName] = useState();
  const [Cemail, setCemail] = useState();
  const [Cpassword, setCpassword] = useState();
  const [CpasswordCheck, setCpasswordCheck] = useState();
  const [CUserName, setCUserName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newCustomer = { CFirstName, CLastName, Cemail, Cpassword, CpasswordCheck, CUserName};
      await Axios.post("http://localhost:5000/customer/register", newCustomer);
      const loginRes = await Axios.post("http://localhost:5000/customer/login", {
        Cemail,
        Cpassword,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
      <div className="page">
        <Header/>
        <div class="container">
        <h2>Register</h2>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form className="form" onSubmit={submit}>
          <label htmlFor="register-display-name">User name</label>
          <input
              id="register-display-name"
              type="text"
              onChange={(e) => setCUserName(e.target.value)}
          />
          <label htmlFor="register-First-name">First Name</label>
          <input
              id="register-display-name"
              type="text"
              onChange={(e) => setCFirstName(e.target.value)}
          />
          <label htmlFor="register-Last-name">Last Name</label>
          <input
              id="register-display-name"
              type="text"
              onChange={(e) => setCLastName(e.target.value)}
          />
          <label htmlFor="register-email">Email</label>
          <input
              id="register-email"
              type="email"
              onChange={(e) => setCemail(e.target.value)}
          />
          <label htmlFor="register-password">Password</label>
          <input
              id="register-password"
              type="password"
              onChange={(e) => setCpassword(e.target.value)}
          />
          <label htmlFor="register-password-verify">Password verify</label>
          <input
              type="password"
              placeholder="Verify password"
              onChange={(e) => setCpasswordCheck(e.target.value)}
          />

          <input type="submit" value="Register" />
        </form></div>
      </div>

  );
}
