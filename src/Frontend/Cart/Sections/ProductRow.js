import React,{Component} from "react";
import img1 from "../../../img/cartimg.jpg"

export default function ProductRow(props) {

    return (

        <div className="cart_items">
            <ul className="cart_items_list">


                <li className="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-lg-end justify-content-start">
                    <div
                        className="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start mr-auto">
                        <div>

                            <div className="product_number">  <label>
                                <input type="checkbox" name={props.item._id} alt={props.item.url} title={props.item.productName} id={props.item.productId} value={props.item.total} onChange={props.onChangeFavorite}/> <span className="label-text"></span>
                            </label>

                            <span>	</span>
                            <span className="badge badge-danger" onClick={() => { props.deleteCart(props.item._id,props.item.price) }}> <i className="fas fa-trash"></i></span>
                            </div>

                        </div>
                        <div>
                            <div className="product_image">
                                <img
                                    src={props.item.url}

                                />
                            </div>
                        </div>
                        <div className="product_name_container">
                            <div className="product_name"><a href={`/products/${props.item._id}`}>{props.item.productName}</a></div>
                            <div className="product_text">Added Date - {props.item.createdAt}</div>
                        </div>
                    </div>
                    <div className="product_color product_text"><span> </span></div>
                    <div className="product_size product_text"><span>Size: </span>{props.item.size}</div>
                    <div className="product_price product_text"><span>Price: </span>{props.item.price}</div>
                    <div className="product_quantity_container">
                        <div className=" text-center">
                            <span className="product_text product_num">{props.item.quantity}</span>

                        </div>
                    </div>
                    <div className="product_total product_text"><span>Total: </span>{props.item.total}</div>

                </li>
            </ul>
        </div>


    )
}