import React, {useEffect, useState} from 'react';
import Axios from "axios";
import Header from "./Frontend/homepage/Header";
import Footer from "./Frontend/homepage/Footer";
import Home from "./Frontend/homepage/Home";
import Login from "../src/Frontend/Customer/Login";
import Register from "../src/Frontend/Customer/Register";
import Profile from "../src/Frontend/homepage/MyProfile";
import UserContext from "../src/contex/UserContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "./Authentication/Auth";
import Routes from "./Routes/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './web content/css/bootstrap.css';
import './web content/vendors/linericon/style.css';
import './web content/css/font-awesome.min.css';
import './web content/css/themify-icons.css';
 import './web content/css/flaticon.css';
// import './web content/vendors/owl-carousel/owl.carousel.min.css';
// import './web content/vendors/lightbox/simpleLightbox.css';
// import './web content/vendors/nice-select/css/nice-select.css';
// import './web content/vendors/animate-css/animate.css';
// import './web content/vendors/jquery-ui/jquery-ui.css';
import './web content/css/style.css';
import './web content/css/responsive.css';


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
                const userRes = await Axios.get("http://localhost:5000/customer/myprofile", {
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
              <div className="container-fluid ">
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/login" component={Login} />
                      <Route path="/register" component={Register} />
                      <Route path="/myprofile" component={Profile}/>
                  </Switch>
              </div>
              <Footer/>
          </UserContext.Provider>
      </BrowserRouter>
  );
}


