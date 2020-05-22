import React, {Component, useEffect} from "react";
import axios from "axios";
import uuidv4 from 'uuid'
import jwt_decode from "jwt-decode";
import Footer from "../../homepage/Footer";

export default function ProductsDetails(props){

    const token = localStorage.auth
    const user = jwt_decode(token)
    var fName='';
    var lName='';
    var ad1='';
    var ad2='';
    var zip='';
    var phone='';
    var email='';
    var purchesId='123456';

    function handleClick(e) {
        e.preventDefault();
        // console.log(props.productLst.name)

        const listItems = props.productLst.map((d) =>{
            console.log(d.name)
        });


         const total = props.amount;

      //  addPurchases(total)

        props.productLst.map((p) =>{
            addOrder(p.pid,p.name,p.cid,p.img)
        });
    }


    
    function addPurchases(total) {
        console.log("user id"+user.id)
        const purchases = {
            userId:user.id,
            purchasesId:purchesId,
            total:total


        }
        axios.post('http://localhost:5000/purchases/add', purchases)
            .then(res => console.log(res.data));
        console.log("p sucessfully")
      //  addBillingDetails();

        localStorage.setItem('amount',"");
        localStorage.setItem('products',"");
    }

    function addOrder(productId,productName,cartId,img) {
        console.log("order p ID - " +productId)
        const myOrder = {
            userId:user.id,
            purchasesId:purchesId,
            productId:productId,
            productName:productName,
            img:img


        }

        axios.post('http://localhost:5000/orders/add', myOrder)
            .then(res => console.log(res.data));
        console.log("order added sucessfully")
       // deleteCart(cartId)
        
    }
    
    function deleteCart(productId) {
        console.log("deleted ID - " + productId)
        axios.delete('http://localhost:5000/cart/'+productId)
            .then(response => { console.log(response.data)});
    }

    function addBillingDetails() {
        const billing = {
            userId:user.id,
            purchasesId:purchesId,
            firstName:fName,
            lastName:lName,
            addressLine1:ad1,
            addressLine2:ad2,
            zip:zip,
            phone:phone,
            email:email

        }

        axios.post('http://localhost:5000/billing/add', billing)
            .then(res => console.log(res.data));
    }
    
    function onChangefName(e) {
        fName=e.target.value;

    }

    function onChangelName(e) {
        lName=e.target.value;
    }
    function onChangeaddressLine1(e) {
        ad1=e.target.value;
    }
    function onChangeaddressLine2(e) {
        ad2=e.target.value;
    }

    function onChangelzipCode(e) {
        zip=e.target.value;
    }

    function onChangePhone(e) {
        phone=e.target.value;
    }

    function onChangeEmail(e) {
        email=e.target.value;
    }

    return(
        <>
            <div className="col-lg-6">
                <div className="billing">
                    <div className="checkout_title">Billing</div>
                    <div className="checkout_form_container">
                        <form action="#" id="checkout_form" className="checkout_form">
                            <div className="row">
                                <div className="col-lg-6">

                                    <input type="text" id="checkout_name" className="checkout_input"
                                           placeholder="First Name" required="required" onChange={onChangefName}/>
                                </div>
                                <div className="col-lg-6">

                                    <input type="text" id="checkout_last_name" className="checkout_input"
                                           placeholder="Last Name" onChange={onChangelName} required="required"/>
                                </div>
                            </div>


                            <div>

                                <input type="text" id="checkout_address" className="checkout_input"
                                       placeholder="Address Line 1" required="required" onChange={onChangeaddressLine1}/>
                                <input type="text" id="checkout_address_2" className="checkout_input checkout_address_2"
                                       placeholder="Address Line 2" required="required" onChange={onChangeaddressLine2}/>
                            </div>
                            <div>

                                <input type="text" id="checkout_zipcode" className="checkout_input" placeholder="Zip Code"
                                       required="required" onChange={onChangelzipCode} />
                            </div>

                            <div>

                                <input type="phone" id="checkout_phone" className="checkout_input" placeholder="Phone No."
                                       required="required" onChange={onChangePhone} />
                            </div>
                            <div>

                                <input type="phone" id="checkout_email" className="checkout_input" placeholder="Email"
                                       required="required" onChange={onChangeEmail} />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        <div className="col-lg-6 cart_col">
            <div className="cart_total">
                <div className="cart_extra_content cart_extra_total">
                    <div className="checkout_title">Cart Total</div>
                    <ul className="cart_extra_total_list">
                        <li className="d-flex flex-row align-items-center justify-content-start">
                            <div className="cart_extra_total_title">Subtotal</div>
                            <div className="cart_extra_total_value ml-auto">{props.amount}</div>
                        </li>
                        <li className="d-flex flex-row align-items-center justify-content-start">
                            <div className="cart_extra_total_title">Shipping</div>
                            <div className="cart_extra_total_value ml-auto">Free</div>
                        </li>
                        <li className="d-flex flex-row align-items-center justify-content-start">
                            <div className="cart_extra_total_title">Total</div>
                            <div className="cart_extra_total_value ml-auto">Rs. {props.amount}</div>
                        </li>
                    </ul>
                    <div className="payment_options">
                        <div className="checkout_title">Payment</div>
                        <ul>
                            <li className="shipping_option d-flex flex-row align-items-center justify-content-start">
                                <label className="radio_container">
                                    <input type="radio" id="radio_1" name="payment_radio" className="payment_radio"/>
                                        <span className="radio_mark"></span>
                                        <span className="radio_text">Paypal</span>
                                </label>
                            </li>

                            <li className="shipping_option d-flex flex-row align-items-center justify-content-start">
                                <label className="radio_container">
                                    <input type="radio" id="radio_3" name="payment_radio" className="payment_radio"
                                           checked/>
                                        <span className="radio_mark"></span>
                                        <span className="radio_text">Credit Card</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="cart_text">

                    </div>
                    <div className="checkout_button trans_200"><a href="checkout.html" onClick={handleClick}>place order</a></div>
                </div>
            </div>


        </div>

        </>
    )


}