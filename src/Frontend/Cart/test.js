import React,{Component} from "react";
import img1 from "../../img/cartimg.jpg"
import ProductRow from "./Sections/ProductRow";

export default function Test(props){



    return(
        <div>
            <section className="cart_area">
                <div className="container">
                    <div className="cart_inner">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                               <ProductRow/>


                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <h5>Subtotal</h5>
                                    </td>
                                    <td>
                                        <h5>$2160.00</h5>
                                    </td>
                                </tr>

                                <tr className="out_button_area">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <div className="checkout_btn_inner">
                                            <a className="gray_btn" href="#">Continue Shopping</a>
                                            <a className="main_btn" href="#">Proceed to checkout</a>
                                        </div>
                                    </td>
                                </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )

}