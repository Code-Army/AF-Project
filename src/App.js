import React, { useEffect, useState } from 'react';
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

import AdminLogin from "./backend/admin/AdminLogin";
import ChangePassword from "./backend/admin/ChangePassword";
import BackendHome from "./backend/BackendHome";

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

    const footer = Footer()

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ userData, setUserData }}>
                <div className="container-fluid ">
                    <Switch>
                        <Route exact path="/" component={footer(Home)} />
                        <Route path="/login" component={footer(Login)} />
                        <Route path="/register" component={footer(Register)} />
                        <Route path="/myprofile" component={footer(Profile)} />
                        <Route path="/CategoryAdd" component={footer(CreateCategory)} />
                        <Route path="/CategoryView" component={footer(catergoryView)} />
                        <Route path="/subCategoty" component={footer(CreateSubCategory)} />
                        <Route path="/createAdminUser" component={footer(CreateAdminUser)} />
                        <Route path="/ShowProduct" component={footer(ShowProduct)} />
                        <Route path="/Allproduct" component={footer(Allproduct)} />
                        <Route path="/CreateSubCategory" component={footer(CreateSubCategory)} />

                        <Route exact path="/admin/" component={BackendHome} />
                        <Route exact path="/admin/login" component={AdminLogin} />
                        <Route exact path="/admin/changepassword" component={ChangePassword} />
                    </Switch>
                </div>
                {/* <Footer /> */}
            </UserContext.Provider>
        </BrowserRouter>
    );
}


