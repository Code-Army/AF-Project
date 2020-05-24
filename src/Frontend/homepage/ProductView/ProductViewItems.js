import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import "../../../web content/css/productstyle.css";

const ProductViewItems = props => {
        const img = {
            width:"160px",
            height:"160px"
        }
    console.log(props.ProductViewItems._id)
    return(
        <>
            {/*<td>{props.ProductViewItems.name}</td>*/}
            {/*<td>{props.ProductViewItems.description}</td>*/}

            <div className="col-lg-4 col-md-6">
                <div className="single-product">
                    <div className="product-img">
                        <img
                            className="card-img"
                            src={props.ProductViewItems.url}
                            href={`/Subcategory/${props.ProductViewItems._id}`}
                            style={img}
                        />

                    </div>
                    <div className="product-btm">
                        <a href="#" className="d-block" href={`/Subcategory/${props.ProductViewItems._id}`}>
                            <h4>{props.ProductViewItems.name}</h4>
                        </a>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductViewItems