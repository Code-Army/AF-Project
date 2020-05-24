import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
// import "../../../web content/css/productstyle.css";

const SubcatProductViewItem = props => {


   function addWhishList(){

       const token = localStorage.auth
       const user = jwt_decode(token)

       const wishItem = {
           userID:user.id,
           productID:props.SubcatProductViewItem._id,
           productname:props.SubcatProductViewItem.productname,
           url:props.SubcatProductViewItem.url1


       }
       axios.post('http://localhost:5000/wishlist/add', wishItem)
           .then(res => console.log(res.data));
    }
    console.log(props.SubcatProductViewItem._id);
    return(
        <>
            <div className="col-lg-4 col-md-6 border-primary">
                <div className="single-product">
                    <div className="product-img">
                        <a href={`/products/${props.SubcatProductViewItem._id}`}>
                        <img    className="card-img"
                                src={props.SubcatProductViewItem.url1}
                        />
                        </a>
                        <div className="p_icon">

                            <a href="#" onClick={addWhishList}>
                                <i className="fas fa-heart"></i>
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