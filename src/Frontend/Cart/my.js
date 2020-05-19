import React, {Component, useEffect} from "react";

import ProductRow from "./Sections/ProductRow";
import axios from 'axios';
import "./../../css/cart.css"
import jwt_decode from "jwt-decode";
import Coupon from "./Sections/Coupon";
import Header from "../homepage/Header";
import Footer from "../homepage/Footer";


export default class Cart extends Component{

    constructor(props) {
        super(props);
        const token = localStorage.auth;
        const user = jwt_decode(token);
        this.deleteCart = this.deleteCart.bind(this)
        this.onChangeFavorite = this.onChangeFavorite.bind(this);
        this.onchangeCoupon = this.onchangeCoupon.bind(this);
        this.onclickApply = this.onclickApply.bind(this);

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
            error:false


        };
    }

    componentDidMount() {

        axios.get(`http://localhost:5000/cart/cart_by_id?id=${this.state.userId}&type=single`)
            .then(response => {
                console.log(response.data)
                console.log("didmount - " + response.data)
                this.setState({ cart: response.data })

            })

    }

    deleteCart(id,price) {
        axios.delete('http://localhost:5000/cart/'+id)
            .then(response => { console.log(response.data)});

        this.setState({
            cart: this.state.cart.filter(el => el._id !== id)
        })


    }


// <ProductRow item={response.data[0]} onChangeFavorite={this.onChangeFavorite} deleteCart={this.deleteCart} key={response.data[0]._id}/>
    cartList() {
        return this.state.cart.map(currentitem => {
            console.log("product id - "+currentitem.productId)

            return <ProductRow item={currentitem} onChangeFavorite={this.onChangeFavorite} deleteCart={this.deleteCart} key={currentitem._id}/>
        })
    }

    onChangeFavorite(event){

        if (event.target.checked){

            const amount = this.state.total + parseInt(event.target.name);

            console.log(event.target.id)
            const pList = [...this.state.selectedProduct,event.target.id];
            this.setState({

                total:amount,
                selectedProduct:pList
            })

            const order = {
                total:amount,
                products:pList
            }
            localStorage.setItem("amount", order.total);
            localStorage.setItem("products", order.products);
            console.log(this.state.selectedProduct);
        }

        else {
            const total = this.state.total - parseInt(event.target.name);


            this.setState({
                total:total,
                selectedProduct:this.state.selectedProduct.pop()
            })
            console.log(this.state.total);
        }


    };


    onchangeCoupon(e){
        this.setState({
            coupon:e.target.value
        })
    }

    onclickApply(){
        console.log(this.state.coupon)
        axios.get(`http://localhost:5000/cart/coupon_by_id?id=${this.state.coupon}&type=single`)
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
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
                                            <li>Color</li>
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
                             error={this.state.error}
                             errorMsg={this.state.errorMsg}
                         onchangeCoupon={this.onchangeCoupon}
                         onclickApply={this.onclickApply}/>
                            <div className="col-lg-6 cart_extra_col">
                                <div className="cart_extra cart_extra_2">
                                    <div className="cart_extra_content cart_extra_total">
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
                                        <div className="checkout_button trans_200"><a href={'/payment'}>proceed to
                                            checkout</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<Footer/>

            </div>

        )

    }
}