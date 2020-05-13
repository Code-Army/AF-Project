import React, {Component, useEffect} from "react";
import Test from "./test";
import ProductRow from "./Sections/ProductRow";
import axios from 'axios';

export default class Cart extends Component{

    constructor(props) {
        super(props);

        this.deleteCart = this.deleteCart.bind(this)
        this.onChangeFavorite = this.onChangeFavorite.bind(this);
        this.state = {
            cart: [],
            product:[],
            total:0,
            selectedProduct:[]


        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/cart/')
            .then(response => {
                this.setState({ cart: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteCart(id,price) {
        axios.delete('http://localhost:5000/cart/'+id)
            .then(response => { console.log(response.data)});

        this.setState({
            cart: this.state.cart.filter(el => el._id !== id)
        })
    }

    handleInputChange(event,price) {
         const target = event.target;

        // const value = target.name === 'isGoing' ? target.checked : target.value;
        // const name = target.name;
        //
        // this.setState({
        //     [name]: value
        // });
        const totalAmount= 0+event
        console.log(event);
        console.log(price);
    }

    exerciseList() {
        return this.state.cart.map(currentitem => {
            return <ProductRow item={currentitem} onChangeFavorite={this.onChangeFavorite} deleteCart={this.deleteCart} key={currentitem._id}/>;
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
            console.log(this.state.selectedProduct);
        }

        else {
            const total = this.state.total - parseInt(event.target.name);


            this.setState({
                total:total
            })
            console.log(this.state.total);
        }


    };

render(){
        return(
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


                                { this.exerciseList() }


                                <div className="cart_buttons d-flex flex-row align-items-start justify-content-start">
                                    <div
                                        className="cart_buttons_inner ml-sm-auto d-flex flex-row align-items-start justify-content-start flex-wrap">
                                        <div className="button button_clear trans_200"><a href="categories.html">clear
                                            cart</a></div>
                                        <div className="button button_continue trans_200"><a href="categories.html">continue
                                            shopping</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row cart_extra_row">
                        <div className="col-lg-6">
                            <div className="cart_extra cart_extra_1">
                                <div className="cart_extra_content cart_extra_coupon">
                                    <div className="cart_extra_title">Coupon code</div>
                                    <div className="coupon_form_container">
                                        <form action="#" id="coupon_form" className="coupon_form">
                                            <input type="text" className="coupon_input" required="required"/>
                                            <button className="coupon_button">apply</button>
                                        </form>
                                    </div>
                                    <div className="coupon_text">Phasellus sit amet nunc eros. Sed nec congue tellus. Aenean
                                        nulla nisl, volutpat blandit lorem ut.
                                    </div>
                                    <div className="shipping">
                                        <div className="cart_extra_title">Shipping Method</div>
                                        <ul>
                                            <li className="shipping_option d-flex flex-row align-items-center justify-content-start">
                                                <label className="radio_container">
                                                    <input type="radio" id="radio_1" name="shipping_radio"
                                                           className="shipping_radio"/>
                                                    <span className="radio_mark"></span>
                                                    <span className="radio_text">Next day delivery</span>
                                                </label>
                                                <div className="shipping_price ml-auto">$4.99</div>
                                            </li>
                                            <li className="shipping_option d-flex flex-row align-items-center justify-content-start">
                                                <label className="radio_container">
                                                    <input type="radio" id="radio_2" name="shipping_radio"
                                                           className="shipping_radio"/>
                                                    <span className="radio_mark"></span>
                                                    <span className="radio_text">Standard delivery</span>
                                                </label>
                                                <div className="shipping_price ml-auto">$1.99</div>
                                            </li>
                                            <li className="shipping_option d-flex flex-row align-items-center justify-content-start">
                                                <label className="radio_container">
                                                    <input type="radio" id="radio_3" name="shipping_radio"
                                                           className="shipping_radio"/>
                                                    <span className="radio_mark"></span>
                                                    <span className="radio_text">Personal Pickup</span>
                                                </label>
                                                <div className="shipping_price ml-auto">Free</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        <li className="d-flex flex-row align-items-center justify-content-start">
                                            <div className="cart_extra_total_title">Total</div>
                                            <div className="cart_extra_total_value ml-auto">Rs.{this.state.total}</div>
                                        </li>
                                    </ul>
                                    <div className="checkout_button trans_200"><a href={'/payment/'+this.state.selectedProduct+'/'+this.state.total}>proceed to
                                        checkout</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}