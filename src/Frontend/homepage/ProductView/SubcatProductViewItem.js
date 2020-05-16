import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../../web content/css/productstyle.css";

const SubcatProductViewItem = props => {
    return(
        <>
            {/*<td>{props.ProductViewItems.name}</td>*/}
            {/*<td>{props.ProductViewItems.description}</td>*/}

            <div className="col-lg-4 col-md-6 border-primary">
                <div className="single-product">
                    <div className="product-img">
                        {/*<a href={"/SubCategory/"${props.SubcategoryItem.category}}>  */}
                        <img
                            className="card-img"
                            src={props.SubcatProductViewItem.url}

                        />
                        {/*</a>*/}
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
                        {/*<a href={"/SubCategory/"+{props.SubcategoryItem._id}} className="d-block">*/}
                        <h4>{props.SubcatProductViewItem.productname}</h4>
                        {/*</a>*/}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubcategoryItem