import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../Authentication/Auth";

export default function Banner() {
    return (
        <section className="home_banner_area mb-40">
            <div className="banner_inner d-flex align-items-center">
                <div className="container">
                    <div className="banner_content row">
                        <div className="col-lg-12">
                            <p className="sub text-uppercase">men Collection</p>
                            <h3><span>Show</span> Your <br/>Personal <span>Style</span></h3>
                            <h4>Fowl saw dry which a above together place.</h4>
                            <a className="main_btn mt-40" href="#">View Collection</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
