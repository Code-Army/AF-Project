import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import "../../../web content/css/productstyle.css";

const SubcategoryItem = props => {

    const img = {
        width:"160px",
        height:"160px"
    }
    return(
        <>
            {/*<td>{props.ProductViewItems.name}</td>*/}
            {/*<td>{props.ProductViewItems.description}</td>*/}

            <div className="col-lg-4 col-md-6 border-primary">
                <div className="single-product">
                    <div className="product-img">
                        <a href={`/SubCatProductView/${props.SubcategoryItem._id}`}>
                            <img style={img}
                                className="card-img"
                                src={props.SubcategoryItem.url}
                            />
                        </a>

                    </div>
                    <div className="product-btm">
                        <a href={`/SubCatProductView/${props.SubcategoryItem._id}`} className="d-block">
                            <h4>{props.SubcategoryItem.name}</h4>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubcategoryItem