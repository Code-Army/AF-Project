import React, {Component, useState} from "react";
import axios from "axios";
import uuidv4 from 'uuid'
import jwt_decode from "jwt-decode";
import Footer from "../../homepage/Footer";
import Modal from 'react-bootstrap/Modal'
import {v1 as uuid} from "uuid";
export default class ProductsDetails extends Component{

    constructor(props) {
        super(props);
        const token = localStorage.auth
        const user = jwt_decode(token)

        this.state={
            uid:user.id,
            fName:'',
            purId:uuid(),
         lName:'',
         ad1:'',
         ad2:'',
         zip:'',
         phone:'',
            Msg:'',
            show:false,
            paymentMethod:'Credit Card'
        }
        this.handleClick = this.handleClick.bind(this);
        this.addPurchases = this.addPurchases.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.deleteCart = this.deleteCart.bind(this);
        this.addBillingDetails = this.addBillingDetails.bind(this);
        this.onChangefName = this.onChangefName.bind(this);
        this.onChangelName = this.onChangelName.bind(this);
        this.onChangeaddressLine1 = this.onChangeaddressLine1.bind(this);
        this.onChangeaddressLine2 = this.onChangeaddressLine2.bind(this);
        this.onChangelzipCode = this.onChangelzipCode.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.goMyOrders = this.goMyOrders.bind(this);
        this.selectPayment = this.selectPayment.bind(this);
    }


     validateBill() {

        let error = true;
        let Msg="";

        if (this.state.fName == ''){
            console.log("name")
            error = true;
            Msg = "Please fill First Name";
        }else if (this.state.lName == ''){
            console.log("last")
            error = true;
            Msg = "Please fill Last Name";
        }else if (this.state.ad1 == ''){
            error = true;
            Msg = "Please fill Address Line 1";
        }else if (this.state.ad2 == ''){
            error = true;
            Msg = "Please fill Address Line 2";
        }else if (this.state.zip == ''){
            error = true;
            Msg = "Please fill zip";
        }else if (this.state.phone ==''){
            error = true;
            Msg = "Please fill phone";
        }else {
            error = false;
        }

        this.setState({
            Msg:Msg
        })

        return error;
    }

     handleClick(e) {
        e.preventDefault();


         if (this.validateBill()) {

            this.setState({
                error:true
            })


         } else {



             const listItems = this.props.productLst.map((d) => {
                 console.log(d.name)
             });


             const total = this.props.amount;

             this.addPurchases(total)

             this.props.productLst.map((p) => {
                 this.addOrder(p.pid, p.name, p.cid, p.img)
             });

             this.setState({
                 show:true
             })
         }







    }


    
     addPurchases(total) {

        const purchases = {
            userId:this.state.uid,
            purchasesId:this.state.purId,
            total:total,
            paymentMethod:this.state.paymentMethod


        }
        axios.post('http://localhost:5000/purchases/add', purchases)
            .then(res => console.log(res.data));
        this.addBillingDetails();

        localStorage.setItem('amount',"");
        localStorage.setItem('products',"");
    }

     addOrder(productId,productName,cartId,img) {

        const myOrder = {
            userId:this.state.uid,
            purchasesId:this.state.purId,
            productId:productId,
            productName:productName,
            img:img


        }

            //Orders Added
        axios.post('http://localhost:5000/orders/add', myOrder)
            .then(res => console.log(res.data));
        this.deleteCart(cartId)
        
    }
    
     deleteCart(productId) {
        axios.delete('http://localhost:5000/cart/'+productId)
            .then(response => {

            });


    }

     addBillingDetails() {
        const billing = {
            userId:this.state.uid,
            purchasesId:this.state.purId,
            firstName:this.state.fName,
            lastName:this.state.lName,
            addressLine1:this.state.ad1,
            addressLine2:this.state.ad2,
            zip:this.state.zip,
            phone:this.state.phone


        }

        axios.post('http://localhost:5000/billing/add', billing)
            .then(res => console.log(res.data));
    }
    
     onChangefName(e) {

        this.setState({
            fName:e.target.value
        })


    }

     onChangelName(e) {
         this.setState({
             lName:e.target.value
         })


    }
     onChangeaddressLine1(e) {
         this.setState({
             ad1:e.target.value
         })


    }
     onChangeaddressLine2(e) {
         this.setState({
             ad2:e.target.value
         })


    }

     onChangelzipCode(e) {
         this.setState({
             zip:e.target.value
         })


    }

     onChangePhone(e) {
         this.setState({
             phone:e.target.value
         })


    }



    selectPayment(e){
        console.log(e.target.id)
        this.setState({
            paymentMethod:e.target.id
    })

    }

     goMyOrders() {

        window.location = '/orders'
    }

    render() {
        return(
            <>
                <div className="col-lg-6">
                    <div className="billing">
                        <div className="checkout_title">Billing</div>
                        <div className="checkout_form_container">
                            {this.state.error ?   <div className="alert alert-danger" role="alert">
                                {this.state.Msg}
                            </div>:""}


                            <form action="#" id="checkout_form" className="checkout_form">
                                <div className="row">
                                    <div className="col-lg-6">

                                        <input type="text" id="checkout_name" className="checkout_input"
                                               placeholder="First Name" required="required" onChange={this.onChangefName}/>
                                    </div>
                                    <div className="col-lg-6">

                                        <input type="text" id="checkout_last_name" className="checkout_input"
                                               placeholder="Last Name" onChange={this.onChangelName} required="required"/>
                                    </div>
                                </div>


                                <div>

                                    <input type="text" id="checkout_address" className="checkout_input"
                                           placeholder="Address Line 1" required="required" onChange={this.onChangeaddressLine1}/>
                                    <input type="text" id="checkout_address_2" className="checkout_input checkout_address_2"
                                           placeholder="Address Line 2" required="required" onChange={this.onChangeaddressLine2}/>
                                </div>
                                <div>

                                    <input type="text" id="checkout_zipcode" className="checkout_input" placeholder="Zip Code"
                                           required="required" onChange={this.onChangelzipCode} />
                                </div>

                                <div>

                                    <input type="phone" id="checkout_phone" className="checkout_input" placeholder="Phone No."
                                           required="required" onChange={this.onChangePhone} />
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
                                    <div className="cart_extra_total_value ml-auto">{this.props.amount}</div>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-start">
                                    <div className="cart_extra_total_title">Shipping</div>
                                    <div className="cart_extra_total_value ml-auto">Free</div>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-start">
                                    <div className="cart_extra_total_title">Total</div>
                                    <div className="cart_extra_total_value ml-auto">Rs. {this.props.amount}</div>
                                </li>
                            </ul>
                            <div className="payment_options">
                                <div className="checkout_title">Payment</div>
                                <ul>
                                    <li className="shipping_option d-flex flex-row align-items-center justify-content-start">
                                        <label className="radio_container">
                                            <input type="radio" id="radio_1" name="payment_radio" className="payment_radio" />
                                            <span className="radio_mark"></span>
                                            <span className="radio_text" id="Cash On Delivery" onClick={this.selectPayment}>Cash On Delivery</span>
                                        </label>
                                    </li>

                                    <li className="shipping_option d-flex flex-row align-items-center justify-content-start">
                                        <label className="radio_container">
                                            <input type="radio" id="radio_3" name="payment_radio" className="payment_radio"
                                                   checked/>
                                            <span className="radio_mark"></span>
                                            <span className="radio_text" id="Credit Card" onClick={this.selectPayment}>Credit Card</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div className="cart_text">

                            </div>
                            <div className="checkout_button trans_200"><a href="checkout.html" onClick={this.handleClick}>place order</a></div>
                        </div>
                    </div>


                </div>

                <Modal show={this.state.show} onHide={this.goMyOrders}>
                    <Modal.Header closeButton>
                        <Modal.Title>Purchases</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your Order Purchases successfully..</Modal.Body>
                    <Modal.Footer>
                        <button class="btn btn-success" onClick={this.goMyOrders}>
                            OK
                        </button>

                    </Modal.Footer>
                </Modal>

            </>
        )
    }




}