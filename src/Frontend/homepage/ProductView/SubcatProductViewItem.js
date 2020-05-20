import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../../web content/css/productstyle.css";

const SubcatProductViewItem = props => {

    console.log(props.SubcatProductViewItem._id);
    return(
        <>
            <div className="col-lg-4 col-md-6 border-primary">
                <div className="single-product">
                    <div className="product-img">
                        {/*<a href={`/Subcategory/${props.SubcatProductViewItem._id}`}>  */}
                        <img    className="card-img"
                            src={props.SubcatProductViewItem.url1}
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
                        {/*<a href={`/Subcatergory/${props.SubcatProductViewItem._id}`} className="d-block">*/}
                            <h4>{props.SubcatProductViewItem.productname}</h4>
                        {/*</a>*/}
                        <div className="mt-3">
                            <span className="mr-4">{props.SubcatProductViewItem.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SubcatProductViewItem;