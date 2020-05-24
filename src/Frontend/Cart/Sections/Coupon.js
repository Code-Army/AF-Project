import React, {Component, useEffect} from "react";



export default class Coupon extends Component{

    render(){
        return(
            <div className="col-lg-6">
                <div className="cart_extra cart_extra_1">
                    <div className="cart_extra_content cart_extra_coupon">
                        <div className="cart_extra_title">Coupon code</div>
                        <div className="coupon_form_container">
                            <div action="#" id="coupon_form" className="coupon_form">

                                <input type="text" className="coupon_input" onChange={this.props.onchangeCoupon} />
                                <button className="coupon_button" onClick={this.props.onclickApply} >apply</button>
                            </div>
                        </div>
                        <div className="coupon_text">
                            {(this.props.couponActive ? <div className="alert alert-success" role="alert">
                           Coupon Activated
                            </div>:"")}

                            {(this.props.error ? this.props.errorMsg : "")}
                        </div>
                        <div className="shipping">
                            <div className="cart_extra_title">Shipping Method</div>
                            <ul>

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
        )
    }

}