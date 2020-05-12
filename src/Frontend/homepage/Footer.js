import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../Authentication/Auth";

export default function Footer() {
    return (

  <footer className="footer-area section_gap">
    <div className="container">
        <div className="row">
            <div className="col-lg-2 col-md-6 single-footer-widget">
                <h4>Top Products</h4>
                <ul>
                    <li><a href="#">Managed Website</a></li>
                    <li><a href="#">Manage Reputation</a></li>
                    <li><a href="#">Power Tools</a></li>
                    <li><a href="#">Marketing Service</a></li>
                </ul>
            </div>
            <div className="col-lg-2 col-md-6 single-footer-widget">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="#">Jobs</a></li>
                    <li><a href="#">Brand Assets</a></li>
                    <li><a href="#">Investor Relations</a></li>
                    <li><a href="#">Terms of Service</a></li>
                </ul>
            </div>
            <div className="col-lg-2 col-md-6 single-footer-widget">
                <h4>Features</h4>
                <ul>
                    <li><a href="#">Jobs</a></li>
                    <li><a href="#">Brand Assets</a></li>
                    <li><a href="#">Investor Relations</a></li>
                    <li><a href="#">Terms of Service</a></li>
                </ul>
            </div>
            <div className="col-lg-2 col-md-6 single-footer-widget">
                <h4>Resources</h4>
                <ul>
                    <li><a href="#">Guides</a></li>
                    <li><a href="#">Research</a></li>
                    <li><a href="#">Experts</a></li>
                    <li><a href="#">Agencies</a></li>
                </ul>
            </div>
            <div className="col-lg-4 col-md-6 single-footer-widget">
                <h4>Newsletter</h4>
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