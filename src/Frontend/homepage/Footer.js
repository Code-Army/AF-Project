import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../Authentication/Auth";
// import "../../css/style.css"
import logo from "./../../img/storelogo.png"
export default function Footer() {
    return (

  <footer className="footer-area section_gap">
    <div className="container">
        <div className="row">
            <div className="col-lg-2 col-md-6 single-footer-widget">

                <img src={logo}/>

            </div>
            <div className="col-lg-2 col-md-6 single-footer-widget">
                <h4>Top Categories</h4>
                <ul>
                    <li><a href="#">Men</a></li>
                    <li><a href="#">Women</a></li>

                </ul>
            </div>
            <div className="col-lg-2 col-md-6 single-footer-widget">
                <h4>Top Products</h4>
                <ul>
                    <li><a href="#">Shirt</a></li>
                    <li><a href="#">Trousers</a></li>

                </ul>
            </div>
            <div className="col-lg-2 col-md-6 single-footer-widget">
                <h4>Contact</h4>
                <ul>
                    <li><a href="#">Code.army@gmail.com</a></li>
                    <li><a href="#">+9477 2864985</a></li>

                </ul>
            </div>
            <div className="col-lg-4 col-md-6 single-footer-widget">
                <h4>Discription</h4>
                <p>You can trust us. we only send promo offers,</p>
                <div className="form-wrap" id="mc_embed_signup">
                    {/*<form target="_blank"*/}
                    {/*      action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"*/}
                    {/*      method="get" className="form-inline">*/}
                    {/*    <input className="form-control" name="EMAIL" placeholder="Your Email Address"*/}
                    {/*           onFocus="this.placeholder = ''"*/}
                    {/*           onBlur="this.placeholder = 'Your Email Address '" required="" type="email">*/}
                    {/*        <button className="click-btn btn btn-default">Subscribe</button>*/}
                    {/*        <div style="position: absolute; left: -5000px;">*/}
                    {/*            <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabIndex="-1" value="" type="text">*/}
                    {/*        </div>*/}

                    {/*        <div className="info"></div>*/}
                    {/*</form>*/}
                </div>
            </div>
        </div>
        <div className="footer-bottom row align-items-center">
            <div class="col-lg-4 col-md-12 footer-social">
                <a href="#"><i class="fa fa-facebook"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-dribbble"></i></a>
                <a href="#"><i class="fa fa-behance"></i></a>
            </div>
        </div>
    </div>
  </footer>
);
}