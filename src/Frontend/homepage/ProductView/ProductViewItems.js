import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../../web content/css/productstyle.css";

const ProductViewItems = props => {
    return(
<>
            {/*<td>{props.ProductViewItems.name}</td>*/}
            {/*<td>{props.ProductViewItems.description}</td>*/}
    <div className="col-lg-4 col-md-6">
        <div className="single-product">
            <div className="product-img">
                <img onClick={()=>{props.SelectCategory(props.ProductViewItems._id)}}
                    className="card-img"
                    src="{../../../web%20content/images/f-p-1.jpg}"
                    alt=""
                />
                <div className="p_icon">
                    <a href="#">
                        <i className="ti-eye"></i>
                    </a>
                    <a href="#">
                        <i className="ti-heart"></i>
                    </a>
                    <a href="#">
                        <i className="ti-shopping-cart"></i>
                    </a>
                </div>
            </div>
            <div className="product-btm">
                <a href="#" className="d-block">
                    <h4>{props.ProductViewItems.na}</h4>
                </a>
                <div className="mt-3">
                    <span className="mr-4">{props.ProductViewItems.description}</span>
                </div>

            </div>
        <button onClick={()=>{props.SelectCategory(props.ProductViewItems._id)}}>View</button>
        </div>
    </div>

        </>
    )
}

export default ProductViewItems