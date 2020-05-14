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
import CreateCategory from "./backend/category/CreateCategory";
import catergoryView from "./Frontend/homepage/ProductView/catergoryView";
import CreateSubCategory from "./backend/category/CreateSubCategory";
import CreateAdminUser from "./backend/admin/createAdminUser";
import ShowProduct from "./Frontend/homepage/ProductView/ShowProduct";
import Allproduct from "./Frontend/homepage/ProductView/Allproduct";

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
                      <Route path="/CategoryAdd" component={CreateCategory}/>
                      <Route path="/CategoryView" component={catergoryView}/>
                      <Route path="/subCategoty" component={CreateSubCategory}/>
                      <Route path="/createAdminUser" component={CreateAdminUser}/>
                      <Route path="/ShowProduct" component={ShowProduct}/>
                      <Route path="/Allproduct" component={Allproduct}/>
                      <Route path="/CreateSubCategory" component={CreateSubCategory}/>
                  </Switch>
              </div>
              <Footer/>
          </UserContext.Provider>
      </BrowserRouter>
  );
}


