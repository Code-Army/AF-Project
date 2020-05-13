import React, {Component, useEffect} from "react";
import BillingDetails from "./Sections/Billing-Details";
import ProductsDetails from "./Sections/Products-Details";


export default function Payment(props){

    const TotalAmount = props.match.params.totalAmount;
    const Lst = props.match.params.productsLst;

    return(
        <div>
            <section className="checkout_area section_gap">
                <div className="container">


                    <div className="billing_details">
                        <div className="row">
                                <BillingDetails

                                />
                                <ProductsDetails
                                    productLst={Lst}
                                    amount={TotalAmount}/>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )


}