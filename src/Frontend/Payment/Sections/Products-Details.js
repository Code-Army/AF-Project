import React, {Component, useEffect} from "react";
import axios from "axios";
import uuidv4 from 'uuid'
import jwt_decode from "jwt-decode";
import Footer from "../../homepage/Footer";

export default function ProductsDetails(props){

    const token = localStorage.auth
    const user = jwt_decode(token)

    function handleClick(e) {
        e.preventDefault();
        console.log(props.productLst)
        const answer_array = props.productLst.split(',');
        const total = props.amount;
        console.log(answer_array)

        addPurchases(total)

        answer_array.map(product =>(

            addOrder(product)
            
             //  console.log({product})


         ))
    }

    function guidGenerator() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    
    function addPurchases(total) {
        console.log("user id"+user.id)
        const purchases = {
            userId:user.id,
            purchasesId:"1232435543",
            total:total


        }
        axios.post('http://localhost:5000/purchases/add', purchases)
            .then(res => console.log(res.data));
        console.log("sucessfully")
        localStorage.setItem('amount',"");
        localStorage.setItem('products',"");
    }

    function addOrder(e) {
        console.log(e)
        const myOrder = {
            userId:user.id,
            productId:e

        }

        axios.post('http://localhost:5000/orders/add', myOrder)
            .then(res => console.log(res.data));
        console.log("sucessfully")
        deleteCart(e)
        
    }
    
    function deleteCart(e) {
        axios.delete('http://localhost:5000/cart/'+e)
            .then(response => { console.log(response.data)});
    }

    return(


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
    )


}