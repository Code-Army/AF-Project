import React, {Component, useEffect} from "react";
import BillingDetails from "./Sections/Billing-Details";
import ProductsDetails from "./Sections/Products-Details";
import "./../../css/payment.css"
import jwt_decode from "jwt-decode";
import Header from "../homepage/Header";
import Footer from "../homepage/Footer";

export default class Payment extends Component{


    constructor(props) {
        super(props);

        //authentication
        const isLogin = localStorage.getItem("isLogin")
        if (isLogin == "false"){

            window.location = '/'
        }else if(localStorage.getItem('amount') == ''){
            window.location = '/'
        }

    }

    componentDidMount() {

    }

    render() {

        //get amount
        const amount = localStorage.getItem('amount');
        //get products
        const products = localStorage.getItem('products');
        var pp = JSON.parse(products);

        const mystyle = {
            color: "white",
            backgroundColor: "#5a646b",

            fontFamily: "Arial",
            padding:"10px",
            paddingBottom:"10px"
        };

        const header = {
            textAlign: "center",

        }
        return(
            <div>
                <Header />
                <div style={mystyle}>
                    <div style={header}>
                        <h2>PURCHASE</h2>
                    </div>

                </div>
                <section className="checkout_area section_gap">
                    <div className="container">


                        <div className="billing_details">
                            <div className="row">

                                <ProductsDetails
                                    productLst={pp}
                                    amount={amount}
                                />

                            </div>
                        </div>
                    </div>
                </section>

                <Footer/>
            </div>
        )
    }



}