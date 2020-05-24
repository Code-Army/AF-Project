import React, {useEffect, useState} from 'react';
import Axios from "axios";
import Header from "./Frontend/homepage/Header";
import Footer from "./Frontend/homepage/Footer";
import Home from "./Frontend/homepage/Home";
import Login from "../src/Frontend/Customer/Login";
import Register from "../src/Frontend/Customer/Register";
import Profile from "../src/Frontend/homepage/MyProfile";
//pasan

import "./App.css"
import ProductDetails from "./Frontend/Product-Details/product-details.component";
import Payment from "./Frontend/Payment/payment.component";

import Orders from "./Frontend/My-Orders/myorders.component";

import UserContext from "../src/contex/UserContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Auth from "./Authentication/Auth";
import Routes from "./Routes/Routes";

import AdminLogin from "./backend/admin/AdminLogin";
import ChangePassword from "./backend/admin/ChangePassword";
import BackendHome from "./backend/BackendHome";
import SubcategoryView from "./Frontend/homepage/ProductView/SubcategoryView";
import SubcatProductView from "./Frontend/homepage/ProductView/SubcatProductView"
import WishList from "./Frontend/wishlist/wishlist.component";
// import './web content/vendors/owl-carousel/owl.carousel.min.css';
// import './web content/vendors/lightbox/simpleLightbox.css';
// import './web content/vendors/nice-select/css/nice-select.css';
// import './web content/vendors/animate-css/animate.css';
// import './web content/vendors/jquery-ui/jquery-ui.css';
import DisplayAllCustomers from "./backend/admin/DisplayAllCustomers";
import AllSubCategories from "./backend/category/AllSubCategories";
import AllCategory from "./backend/category/AllCategory";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateCategory from "./backend/category/CreateCategory";
import catergoryView from "./Frontend/homepage/ProductView/catergoryView";
import CreateSubCategory from "./backend/category/CreateSubCategory";
import CreateAdminUser from "./backend/admin/createAdminUser";
import ShowProduct from "./Frontend/homepage/ProductView/ShowProduct";
import Allproduct from "./Frontend/homepage/ProductView/Allproduct";
import Cart from "./Frontend/Cart/cart.component";

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
      <div>
      <BrowserRouter>
          <UserContext.Provider value={{ userData, setUserData }}>
              <div className="container-fluid ">
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/login" component={Login} />
                      <Route path="/register" component={Register} />
                      <Route path="/myprofile" component={Profile}/>



                      <Route path="/CategoryView" component={catergoryView}/>
                      <Route path ="/Subcategory/:id" component={SubcategoryView}/>
                      <Route path ="/wishlist/" component={WishList}/>
                      <Route path="/SubCatProductView/:id" component={SubcatProductView}/>
                      <Route exact path="/admin/" component={BackendHome} />
                      <Route exact path="/admin/:component/:id" component={BackendHome} />
                      <Route exact path="/admin/login" component={AdminLogin} />
                      <Route exact path="/admin/changepassword" component={ChangePassword} />

                      <Route path="/cart/" component={Cart}/>
                      <Route path="/products/:productId" component={ProductDetails}/>
                      <Route path="/payment/" component={Payment}/>
                      <Route path="/orders/" component={Orders}/>






                  </Switch>
              </div>

          </UserContext.Provider>
      </BrowserRouter>


      </div>
  );
}


