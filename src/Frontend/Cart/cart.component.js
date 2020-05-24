import React, {Component, useEffect} from "react";

import ProductRow from "./Sections/ProductRow";
import axios from 'axios';
import "./../../css/cart.css"
import jwt_decode from "jwt-decode";
import Coupon from "./Sections/Coupon";
import Header from "../homepage/Header";
import Footer from "../homepage/Footer";
import Modal from 'react-bootstrap/Modal'

export default class Cart extends Component{

    constructor(props) {
        super(props);
        console.log("constructor")

        //authentication check
        const isLogin = localStorage.getItem('isLogin')
        if (isLogin == "true"){
            const token = localStorage.auth;
            const user = jwt_decode(token);
            localStorage.setItem("amount", "");
            //bind methods
            this.deleteCart = this.deleteCart.bind(this)
            this.onChangeCartItem = this.onChangeCartItem.bind(this);
            this.onchangeCoupon = this.onchangeCoupon.bind(this);
            this.onclickApply = this.onclickApply.bind(this);
            this.goToPayment = this.goToPayment.bind(this);

            this.state = {
                test:[1,2,3],
                cart: [],
                product:[],
                total:0,
                selectedProduct:[],
                userId:user.id,
                coupon:"",
                couponAmount:0,
                couponActive:false,
                shipping:0,
                errorMsg:'',
                error:false,
                mShow:false,
                delId:'',
                nextEventError:false


            };


        }else{

            //redirect to home page
            window.location = '/'
            this.state = {

                cart: [],
                total:0


            };

        }

    }

    componentDidMount() {

        const isLogin = localStorage.getItem('isLogin')
        if (isLogin == "true"){
            //get cart user specific details
            axios.get(`http://localhost:5000/cart/cart_by_id?id=${this.state.userId}&type=single`)
                .then(response => {
                    this.setState({ cart: response.data })

                })
        }


    }

    //delete conform
    ConfirmDelete(){
        //call route
        axios.delete('http://localhost:5000/cart/'+this.state.delId)
            .then(response => { console.log(response.data)});

        //filter delete item
        this.setState({
            cart: this.state.cart.filter(el => el._id !== this.state.delId),
            mShow:false
        })
    }

    //model close
    cancelModel(){
        this.setState({
            mShow:false
        })
    }

    //delete item cart
    deleteCart(id,price) {

        this.setState({
            mShow:true,
            delId:id
        })




    }


    //get cart list
    cartList() {
        return this.state.cart.map(currentitem => {
            //Print cart items
            return <ProductRow item={currentitem} onChangeFavorite={this.onChangeCartItem} deleteCart={this.deleteCart} key={currentitem._id}/>
        })
    }

    //select cart item
    onChangeCartItem(event){

        if (event.target.checked){

            const amount = this.state.total + parseInt(event.target.value);
            console.log(event.target.alt)

            const product ={
                name:event.target.title,
                pid:event.target.id,
                cid:event.target.name,
                img:event.target.alt
             }
            const pList = [...this.state.selectedProduct,product];

            localStorage.setItem("amount",amount );
            localStorage.setItem("products", JSON.stringify(pList));
            this.setState({

                total:amount,
                selectedProduct:pList
            })


            console.log(pList);
        }

        else {

            const filterdTaskList = this.state.selectedProduct.filter(task =>
                task.cid !== event.target.name)
            console.log(filterdTaskList)
            const total = this.state.total - parseInt(event.target.value);
            this.setState({
                total:total,
                selectedProduct:filterdTaskList
            })

                localStorage.setItem("amount",total );
                localStorage.setItem("products", JSON.stringify(filterdTaskList));

        }


    };


    onchangeCoupon(e){
        this.setState({
            coupon:e.target.value
        })
    }

    //click coupon Apply
    onclickApply(){
        console.log(this.state.coupon)
        axios.get(`http://localhost:5000/cart/coupon_by_id?id=${this.state.coupon}&type=single`)
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        error:false,
                        couponActive:true,
                        couponAmount:response.data[0].couponamount

                    })
                    localStorage.setItem("amount", String(this.state.total - response.data[0].couponamount));

                }else{
                    this.setState({

                        errorMsg:"Please Valid Coupon",
                        couponActive:false,
                        error:true,
                        couponAmount:0

                    })
                    localStorage.setItem("amount", String(this.state.total));
                }

            })
    }

    goToPayment(){

        if (localStorage.getItem('amount') == ''){
            this.setState({
                nextEventError:true
            })
        }else{
            window.location = '/payment'
        }

    }

    render()
    {
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
        return (

            <div>

                <Header
                    userdata="1"/>
                <div style={mystyle}>
                    <div style={header}>
                        <h2>CART</h2>
                    </div>

                </div>


                <div className="cart_section">



                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="cart_container">

                                    <div className="cart_bar">
                                        <ul className="cart_bar_list item_list d-flex flex-row align-items-center justify-content-end">
                                            <li className="mr-auto">Product</li>
                                            <li></li>
                                            <li>Size</li>
                                            <li>Price</li>
                                            <li>Quantity</li>
                                            <li>Total</li>
                                        </ul>
                                    </div>


                                    { this.cartList() }


                                    <div className="cart_buttons d-flex flex-row align-items-start justify-content-start">
                                        <div
                                            className="cart_buttons_inner ml-sm-auto d-flex flex-row align-items-start justify-content-start flex-wrap">

                                            <div className="button button_continue trans_200"><a href="/">continue
                                                shopping</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row cart_extra_row">

                         <Coupon
                             couponActive={this.state.couponActive}
                             error={this.state.error}
                             errorMsg={this.state.errorMsg}
                         onchangeCoupon={this.onchangeCoupon}
                         onclickApply={this.onclickApply}/>

                            <div className="col-lg-6 cart_extra_col">
                                <div className="cart_extra cart_extra_2">
                                    <div className="cart_extra_content cart_extra_total">
                                        {this.state.nextEventError ? <div className="alert alert-danger" role="alert">
                                            Please Select the Items
                                        </div>:""}
                                        <div className="cart_extra_title">Cart Total</div>

                                        <ul className="cart_extra_total_list">
                                            <li className="d-flex flex-row align-items-center justify-content-start">
                                                <div className="cart_extra_total_title">Subtotal</div>
                                                <div className="cart_extra_total_value ml-auto">{this.state.total}</div>
                                            </li>
                                            <li className="d-flex flex-row align-items-center justify-content-start">
                                                <div className="cart_extra_total_title">Shipping</div>
                                                <div className="cart_extra_total_value ml-auto">Free</div>
                                            </li>

                                            {this.state.couponActive ?    <li className="d-flex flex-row align-items-center justify-content-start">
                                                <div className="cart_extra_total_title">Coupon</div>
                                                <div className="cart_extra_total_value ml-auto">{this.state.couponAmount}</div>
                                            </li> :""}
                                            <li className="d-flex flex-row align-items-center justify-content-start">
                                                <div className="cart_extra_total_title">Total</div>
                                                <div className="cart_extra_total_value ml-auto">Rs.{this.state.total-this.state.couponAmount}</div>
                                            </li>
                                        </ul>
                                        <div className="checkout_button trans_200"><a onClick={this.goToPayment} >proceed to
                                            checkout</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.mShow} onHide={this.cancelModel.bind(this)} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>CART ITEM</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do You Want Delete This Item ?</Modal.Body>
                    <Modal.Footer>
                        <button  class="btn btn-danger" onClick={this.cancelModel.bind(this)}>
                            Cancel
                        </button>
                        <button class="btn btn-primary" onClick={this.ConfirmDelete.bind(this)} >
                           Delete
                        </button>
                    </Modal.Footer>
                </Modal>

<Footer/>

            </div>

        )

    }
}