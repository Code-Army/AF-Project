import React, {useState, useEffect} from "react";
import Axios from "axios";


import ImagesSlide from "./Sections/Image-slide";
import Details from "./Sections/Details";
import Description from "./Sections/Description";
import Specification from "./Sections/Specification";
import Review from "./Sections/Review";

export default function ProductDetails(props){

    const productId = props.match.params.productId


    const [Product, setProduct] = useState([])
    const [Feedback, setFeedback] = useState([])
    const Id = props.match.params.productId;

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
                setFeedback(response.data[0])
            })

    }, [])



        return(
            <div>
                <div>

                    {/*product image area*/}
                    <div className="product_image_area">
                        <div className="container">
                            <div className="row s_product_inner">
                                <div className="col-lg-6">
                                    <h1>{Product.title}</h1>
                                    <ImagesSlide/>
                                </div>
                                <div className="col-lg-5 offset-lg-1">
                                    <Details
                                    productId={productId}
                                    productName={Product.title}
                                    price={price}/>

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

                                <Description/>
                                <Specification/>
                                <Review

                                feedback = {Feedback.feedback}
                                rate = {Feedback.rate}
                                />


                            </div>
                        </div>
                    </section>


                </div>
            </div>
        )

}