import React, {useEffect, useState} from 'react';
import Axios from "axios";
import Header from "./Frontend/homepage/Header";
import Home from "./Frontend/homepage/Home";
import Login from "../src/Frontend/Customer/Login";
import Register from "../src/Frontend/Customer/Register";
import UserContext from "../src/contex/UserContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "./Authentication/Auth";
import Routes from "./Routes/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        customer: undefined,
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post(
                "http://localhost:5000/customer/tokenIsValid",
                null,
                { headers: { "x-auth-token": token } }
            );
            if (tokenRes.data) {
                const userRes = await Axios.get("http://localhost:5000/customer/", {
                    headers: { "x-auth-token": token },
                });
                setUserData({
                    token,
                    customer: userRes.data,
                });
            }
        };

        checkLoggedIn();
    }, []);
  return (
      <BrowserRouter>
          <UserContext.Provider value={{ userData, setUserData }}>
              <Header />
              <div className="container">
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/login" component={Login} />
                      <Route path="/register" component={Register} />
                  </Switch>
              </div>
          </UserContext.Provider>
      </BrowserRouter>
  );
}


