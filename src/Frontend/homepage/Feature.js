import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contex/UserContext";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Banner";



export default function Feature() {
    const { userData } = useContext(UserContext);

    return (
        <section className="feature-area section_gap_bottom_custom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="single-feature">
                            <a href="#" className="title">
                                <i className="flaticon-money"></i>
                                <h3>Money back gurantee</h3>
                            </a>
                            <p>Shall open divide a one</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="single-feature">
                            <a href="#" className="title">
                                <i className="flaticon-truck"></i>
                                <h3>Free Delivery</h3>
                            </a>
                            <p>Shall open divide a one</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="single-feature">
                            <a href="#" className="title">
                                <i className="flaticon-support"></i>
                                <h3>Alway support</h3>
                            </a>
                            <p>Shall open divide a one</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="single-feature">
                            <a href="#" className="title">
                                <i className="flaticon-blockchain"></i>
                                <h3>Secure payment</h3>
                            </a>
                            <p>Shall open divide a one</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
