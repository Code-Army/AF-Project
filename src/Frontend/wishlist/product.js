import React from "react";
import img1 from "../../img/cartimg.jpg";
import Modal from "react-bootstrap/Modal";
import StarRatingComponent from "react-star-rating-component";

export default function Product(props){

    return(
        <div className="cart_items">
            <ul className="cart_items_list">
                <li className="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-lg-end justify-content-start">
                    <div
                        className="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start mr-auto">
                        <div>

                            <div className="product_number">


                            </div>
                        </div>
                        <div>
                            <div className="product_image">
                                <img
                                    src={props.whishlistItem.url}

                                />
                            </div>
                        </div>
                        <div className="product_name_container">
                            <div className="product_name"><a href={`/products/${props.whishlistItem.productID}`}>{props.whishlistItem.productname}</a></div>
                            <div className="product_text">Second line for additional info</div>
                        </div>
                    </div>

                    <div className="product_price product_text">
                        <div className="product_text">Added Date</div>
                        <div className="product_name"><a href="product.html">{props.whishlistItem.createdAt}</a></div>
                    </div>
                    <div className="product_color product_text"></div>
                    <div className="product_size product_text"></div>
                    <div className="btn btn-danger" onClick={() => {props.wishlistdelete(props.whishlistItem._id)  }} style={{ cursor: "pointer" }} >Delete</div>

                </li>
            </ul>




        </div>



    )

}