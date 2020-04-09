import React from "react";


export default function Review(props) {


    return (
        <div
            className="tab-pane fade show active"
            id="review"
            role="tabpanel"
            aria-labelledby="review-tab">
            <div className="row">
                <div className="col-lg-6">
                    <div className="row total_rate">
                        <div className="col-6">
                            <div className="box_total">
                                <h5>Overall</h5>
                                <h4>4.0</h4>
                                <h6>(03 Reviews)</h6>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="rating_list">
                                <h3>Based on 3 Reviews</h3>
                                <ul className="list">
                                    <li>
                                        <a href="#"
                                        >5 Star
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i> 01</a
                                        >
                                    </li>
                                    <li>
                                        <a href="#"
                                        >4 Star
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i> 01</a
                                        >
                                    </li>
                                    <li>
                                        <a href="#"
                                        >3 Star
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i> 01</a
                                        >
                                    </li>
                                    <li>
                                        <a href="#"
                                        >2 Star
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i> 01</a
                                        >
                                    </li>
                                    <li>
                                        <a href="#"
                                        >1 Star
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i> 01</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="review_list">
                        <div className="review_item">
                            <div className="media">
                                <div className="d-flex">
                                    <img
                                        src="img/product/single-product/review-1.png"
                                        alt=""
                                    />
                                </div>
                                <div className="media-body">
                                    <h4>Blake Ruiz</h4>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                            </p>
                        </div>
                        <div className="review_item">
                            <div className="media">
                                <div className="d-flex">
                                    <img
                                        src="img/product/single-product/review-2.png"
                                        alt=""
                                    />
                                </div>
                                <div className="media-body">
                                    <h4>Blake Ruiz</h4>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                            </p>
                        </div>
                        <div className="review_item">
                            <div className="media">
                                <div className="d-flex">
                                    <img
                                        src="img/product/single-product/review-3.png"
                                        alt=""
                                    />
                                </div>
                                <div className="media-body">
                                    <h4>Blake Ruiz</h4>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="review_box">
                        <h4>Add a Review</h4>
                        <p>Your Rating:</p>
                        <ul className="list">
                            <li>
                                <a href="#">
                                    <i className="fa fa-star"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-star"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-star"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-star"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-star"></i>
                                </a>
                            </li>
                        </ul>
                        <p>Outstanding</p>
                        <form
                            className="row contact_form"
                            action="contact_process.php"
                            method="post"
                            id="contactForm"
                            noValidate="novalidate"
                        >
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Your Full name"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Email Address"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="number"
                                        name="number"
                                        placeholder="Phone Number"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                        <textarea
                            className="form-control"
                            name="message"
                            id="message"
                            rows="1"
                            placeholder="Review"
                        ></textarea>
                                </div>
                            </div>
                            <div className="col-md-12 text-right">
                                <button
                                    type="submit"
                                    value="submit"
                                    className="btn submit_btn"
                                >
                                    Submit Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}