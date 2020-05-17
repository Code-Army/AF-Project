import React, {Component, useEffect} from "react";
import BillingDetails from "./Sections/Billing-Details";
import ProductsDetails from "./Sections/Products-Details";
import "./../../css/payment.css"
import jwt_decode from "jwt-decode";

export default function Payment(props){

    const TotalAmount = props.match.params.totalAmount;
    const Lst = props.match.params.productsLst;
    const amount = localStorage.getItem('amount');
    const products = localStorage.getItem('products');

    return(
        <div>
            <section className="checkout_area section_gap">
                <div className="container">


                    <div className="billing_details">
                        <div className="row">
                                <BillingDetails

                                />
                                <ProductsDetails
                                    productLst={products}
                                    amount={amount}
                                />

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )


}