import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../../web content/css/productstyle.css";

const ProductShow = props => {
    return(
        <>
            {/*<td>{props.ProductViewItems.name}</td>*/}
            {/*<td>{props.ProductViewItems.description}</td>*/}
            <div className="col-lg-4 col-md-6 border-primary">
                <div className="single-product">
                    <div className="product-img">
                        <img
                             className="card-img"
                             src={props.ProductShow.url1}
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
                            <h4>{props.ProductShow.productname}</h4>
                        </a>
                        <div className="mt-3">
                            <span className="mr-4">{props.ProductShow.description}</span>
                        </div>

                    </div>
                    <button >View</button>
                </div>
            </div>
        </>
    )
}

export default ProductShow;