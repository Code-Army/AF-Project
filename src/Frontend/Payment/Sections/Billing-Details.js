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

                            <input type="text" id="checkout_company" placeholder="Company" className="checkout_input"/>
                        </div>
                        <div>

                            <select name="checkout_country" id="checkout_country"
                                    className="dropdown_item_select checkout_input" require="required">
                                <option>Country</option>
                                <option>Lithuania</option>
                                <option>Sweden</option>
                                <option>UK</option>
                                <option>Italy</option>
                            </select>
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

                            <select name="checkout_city" id="checkout_city"
                                    className="dropdown_item_select checkout_input" require="required">
                                <option>City / Town</option>
                                <option>City</option>
                                <option>City</option>
                                <option>City</option>
                                <option>City</option>
                            </select>
                        </div>
                        <div>

                            <select name="checkout_province" id="checkout_province"
                                    className="dropdown_item_select checkout_input" require="required">
                                <option>Province</option>
                                <option>Province</option>
                                <option>Province</option>
                                <option>Province</option>
                                <option>Province</option>
                            </select>
                        </div>
                        <div>

                            <input type="phone" id="checkout_phone" className="checkout_input" placeholder="Phone No."
                                   required="required"/>
                        </div>
                        <div>

                            <input type="phone" id="checkout_email" className="checkout_input" placeholder="Email"
                                   required="required"/>
                        </div>
                        <div className="checkout_extra">
                            <ul>
                                <li className="billing_info d-flex flex-row align-items-center justify-content-start">
                                    <label className="checkbox_container">
                                        <input type="checkbox" id="cb_1" name="billing_checkbox"
                                               className="billing_checkbox"/>
                                            <span className="checkbox_mark"></span>
                                            <span className="checkbox_text">Terms and conditions</span>
                                    </label>
                                </li>
                                <li className="billing_info d-flex flex-row align-items-center justify-content-start">
                                    <label className="checkbox_container">
                                        <input type="checkbox" id="cb_2" name="billing_checkbox"
                                               className="billing_checkbox"/>
                                            <span className="checkbox_mark"></span>
                                            <span className="checkbox_text">Create an account</span>
                                    </label>
                                </li>
                                <li className="billing_info d-flex flex-row align-items-center justify-content-start">
                                    <label className="checkbox_container">
                                        <input type="checkbox" id="cb_3" name="billing_checkbox"
                                               className="billing_checkbox"/>
                                            <span className="checkbox_mark"></span>
                                            <span className="checkbox_text">Subscribe to our newsletter</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )


}