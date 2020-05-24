import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../Authentication/Auth";
import "../../css/style.css"
// import "../../index.css"
import logo from "../../img/storelogo.png"
import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
export default function Header(props) {
  return (
      <header className="header_area">
          <div className="top_menu">

                  <div className="row">
                      <div className="col-lg-7">
                          <div className="float-left">
                              <p>Phone: +94 77 2864985</p>
                              <p>email: code.army.com</p>
                          </div>
                      </div>
                      <div className="col-lg-5">
                          <div className="float-right">
                              <ul className="right_side">
                                  <li>

                                          <a href={`/cart/`}>

                                          </a>


                                  </li>
                                  <li>

                                  </li>

                              </ul>
                          </div>
                      </div>
                  </div>

          </div>
          <div className="main_menu">

                  <nav className="navbar navbar-expand-lg navbar-light w-100">
                      {/*Brand and toggle get grouped for better mobile display */}
                      <a className="navbar-brand logo_h" href="index.html">
                          <img src={logo} alt="" height="100px" width="200px"/>
                      </a>
                      <button className="navbar-toggler" type="button" data-toggle="collapse"
                              data-target="#navbarSupportedContent"
                              aria-controls="navbarSupportedContent" aria-expanded="false"
                              aria-label="Toggle navigation">
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                      </button>
                       {/*Collect the nav links, forms, and other content for toggling */}
                      <div className="collapse navbar-collapse offset w-100" id="navbarSupportedContent">
                          <div className="row w-100 mr-0">
                              <div className="col-lg-7 pr-0">
                                  <ul className="nav navbar-nav center_nav pull-right">
                                      <li className="nav-item active">
                                          <Link className="nav-link"  to ="/">Home</Link>
                                      </li>
                                      <li className="nav-item submenu dropdown">
                                          <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown"
                                             role="button" aria-haspopup="true"
                                             aria-expanded="false">Shop</a>
                                          <ul className="dropdown-menu">
                                              <li className="nav-item">
                                                  <Link to ="/CategoryView" className="nav-link">Shop Category</Link>
                                              </li>

                                          </ul>
                                      </li>


                                      <li className="nav-item">
                                          <a className="nav-link" >Contact</a>
                                      </li>
                                  </ul>
                              </div>

                              <div className="col-lg-5 pr-0">
                                  <ul className="nav navbar-nav navbar-right right_nav pull-right">
                                      <li className="nav-item">
                                          <a href="#" className="icons">
                                              <i className="ti-search" aria-hidden="true"></i>
                                          </a>
                                      </li>

                                      <li className="nav-item">


                                              <a href={`/cart/`} className="icons">
                                                  <i className="ti-shopping-cart">   <FaShoppingCart/> </i>
                                              </a>




                                      </li>

                                      <li className="nav-item">


                                              <a href={`/orders/`} className="icons">
                                                  <i className="ti-shopping-cart"> <FaClipboardList/>  </i>
                                              </a>


                                      </li>
                                      <li className="nav-item">


                                          <a href={`/wishlist/`} className="icons">
                                              <i className="fa fa-heart" aria-hidden="true"></i>

                                          </a>


                                      </li>

                                      <li className="nav-item">
                                          <Link to ="/myprofile" className="icons">
                                              <i className="ti-user" aria-hidden="true"><FaUser/></i>
                                          </Link>
                                      </li>

                                      <li className="nav-item">
                                          <a href="#" className="icons">
                                              <i ><Auth/></i>
                                          </a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </nav>

          </div>
      </header>
  );
}
