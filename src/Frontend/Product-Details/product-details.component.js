import React, {useState, useEffect, useContext} from "react";
import Axios from "axios";

import Header from "./../homepage/Header"
import ImagesSlide from "./Sections/Image-slide";
import Details from "./Sections/Details";
import Description from "./Sections/Description";
import Specification from "./Sections/Specification";
import Review from "./Sections/Review";
import Footer from "../homepage/Footer";

export default function ProductDetails(props){

    const productId = props.match.params.productId
    const userId = props.match.params.userId

    const [Feedback, setFeedback] = useState([])
    const [Product, setProduct] = useState([])
    // const [Feedback, setFeedback] = useState([])
    const Id = props.match.params.productId;
    var countrate =0;
    var avarage = 0;
    var totalFeedback =0;
    const price = 1000;
    //console.log(Id)
    useEffect(() => {
        Axios.get(`http://localhost:5000/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })

    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:5000/feedback/feedback_by_id?id=${productId}&type=single`)
            .then(response => {
                setFeedback(response.data)


            })

    }, [])

    const mystyle = {
        color: "white",
        backgroundColor: "#5a646b",

        fontFamily: "Arial",
        padding:"10px",
        paddingBottom:"10px"
    };

    const header = {
        textAlign: "center",

    }

        return(
            <div>
                <Header
                    userdata="1"/>
                <div>
<div style={mystyle}>
    <div style={header}>
        <h2>DETAILS</h2>
    </div>
</div>
                    {/*product image area*/}
                    <div className="product_image_area">
                        <div className="container">
                            <div className="row s_product_inner">
                                <div className="col-lg-6">
                                    <h1>{Product.productname}</h1>
                                    <ImagesSlide
                                    url1={Product.url1}
                                    url2={Product.url1}
                                    url3={Product.url1}
                                    />
                                </div>
                                <div className="col-lg-5 offset-lg-1">
                                    <Details

                                    productId={productId}

                                    product={Product}/>

                                </div>
                            </div>
                        </div>
                    </div>


                    {/*Product Description Area */}
                    <section className="product_description_area">
                        <div className="container">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        id="home-tab"
                                        data-toggle="tab"
                                        href="#home"
                                        role="tab"
                                        aria-controls="home"
                                        aria-selected="true"
                                    >Description</a
                                    >
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        id="profile-tab"
                                        data-toggle="tab"
                                        href="#profile"
                                        role="tab"
                                        aria-controls="profile"
                                        aria-selected="false"
                                    >Specification</a
                                    >
                                </li>

                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        id="review-tab"
                                        data-toggle="tab"
                                        href="#review"
                                        role="tab"
                                        aria-controls="review"
                                        aria-selected="false"
                                    >Reviews</a
                                    >
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                {Feedback.map((feedback,j)=> {
                                    const fTotal = j+1;
                                    console.log("Feedback count - " +fTotal)
                                    countrate = countrate + parseInt(feedback.rate);
                                    console.log(countrate)
                                    avarage = parseInt(countrate) / parseInt(fTotal);
                                    console.log(avarage)
                                    totalFeedback = fTotal;



                                })}
                                <Description
                                description={Product.description}/>
                                <Specification
                                    specification = {Product.specification}/>
                                <Review
                                    feedback = {Feedback}
                                    rate = {Feedback.rate}
                                    avarage={avarage}
                                    fTotal={totalFeedback}
                                />


                            </div>
                        </div>
                    </section>


                </div>

                <Footer/>
            </div>
        )

}