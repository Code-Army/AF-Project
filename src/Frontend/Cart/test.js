import React,{Component} from "react";
import img1 from "../../img/cartimg.jpg"
import ProductRow from "./Sections/ProductRow";

export default function Test(props){



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


                            <div className="cart_items">
                                <ul className="cart_items_list">


                                    <li className="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-lg-end justify-content-start">
                                        <div
                                            className="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start mr-auto">
                                            <div>
                                                <div className="product_number">1</div>
                                            </div>
                                            <div>
                                                <div className="product_image">
                                                </div>
                                            </div>
                                            <div className="product_name_container">
                                                <div className="product_name"><a href="product.html">Cool Flufy Clothing
                                                    without Stripes</a></div>
                                                <div className="product_text">Second line for additional info</div>
                                            </div>
                                        </div>
                                        <div className="product_color product_text"><span>Color: </span>beige</div>
                                        <div className="product_size product_text"><span>Size: </span>L</div>
                                        <div className="product_price product_text"><span>Price: </span>$3.99</div>
                                        <div className="product_quantity_container">
                                            <div className="product_quantity ml-lg-auto mr-lg-auto text-center">
                                                <span className="product_text product_num">1</span>
                                                <div className="qty_sub qty_button trans_200 text-center"><span>-</span>
                                                </div>
                                                <div className="qty_add qty_button trans_200 text-center"><span>+</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product_total product_text"><span>Total: </span>$3.99</div>
                                    </li>
                                </ul>
                            </div>


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
                                                       className="shipping_radio" checked/>
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
                                        <div className="cart_extra_total_value ml-auto">$29.90</div>
                                    </li>
                                    <li className="d-flex flex-row align-items-center justify-content-start">
                                        <div className="cart_extra_total_title">Shipping</div>
                                        <div className="cart_extra_total_value ml-auto">Free</div>
                                    </li>
                                    <li className="d-flex flex-row align-items-center justify-content-start">
                                        <div className="cart_extra_total_title">Total</div>
                                        <div className="cart_extra_total_value ml-auto">$29.90</div>
                                    </li>
                                </ul>
                                <div className="checkout_button trans_200"><a href="checkout.html">proceed to
                                    checkout</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}