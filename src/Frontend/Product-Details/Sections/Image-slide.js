import img2 from "../../../img/s-product-s-2.jpg";
import img3 from "../../../img/s-product-s-3.jpg";
import img4 from "../../../img/s-product-s-4.jpg";
import img1 from "../../../img/s-product-1.jpg";
import React from "react";

export default function ImagesSlide(props) {


    return (

        <div className="s_product_img">
            <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
            >
                <ol className="carousel-indicators">
                    <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="0"
                        className="active"
                    >
                        <img
                            src={props.url1}
                            alt=""
                        />
                    </li>
                    <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="1"
                    >
                        <img
                            src={props.url2}
                            alt=""
                        />
                    </li>
                    <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="2"
                    >
                        <img
                            src={props.url3}
                            alt=""
                        />
                    </li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            className="d-block w-100"
                            src={props.url1}
                            alt="First slide"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className="d-block w-100"
                            src={props.url2}
                            alt="Second slide"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className="d-block w-100"
                            src={props.url3}
                            alt="Third slide"
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}
