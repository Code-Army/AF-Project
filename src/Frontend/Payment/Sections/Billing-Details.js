import React, {Component, useEffect} from "react";


export default function BillingDetails(props){



    return(
        <div className="col-lg-6">
            <div className="billing">
                <div className="checkout_title">Billing</div>
                <div className="checkout_form_container">
                    <form action="#" id="checkout_form" className="checkout_form">
                        <div className="row">
                            <div className="col-lg-6">

                                <input type="text" id="checkout_name" className="checkout_input"
                                       placeholder="First Name" required="required"/>
                            </div>
                            <div className="col-lg-6">

                                <input type="text" id="checkout_last_name" className="checkout_input"
                                       placeholder="Last Name" required="required"/>
                            </div>
                        </div>


                        <div>

                            <input type="text" id="checkout_address" className="checkout_input"
                                   placeholder="Address Line 1" required="required"/>
                                <input type="text" id="checkout_address_2" className="checkout_input checkout_address_2"
                                       placeholder="Address Line 2" required="required"/>
                        </div>
                        <div>

                            <input type="text" id="checkout_zipcode" className="checkout_input" placeholder="Zip Code"
                                   required="required"/>
                        </div>

                        <div>

                            <input type="phone" id="checkout_phone" className="checkout_input" placeholder="Phone No."
                                   required="required"/>
                        </div>
                        <div>

                            <input type="phone" id="checkout_email" className="checkout_input" placeholder="Email"
                                   required="required"/>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )


}