import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contex/UserContext";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Banner";
import Feature from "./Feature";
import Allproduct from "./ProductView/Allproduct";
import '../../web content/css/bootstrap.min.css';
import '../../web content/css/bootstrap.css';
import '../../web content/vendors/linericon/style.css';
import '../../web content/css/font-awesome.min.css';
import '../../web content/css/themify-icons.css';
import '../../web content/css/flaticon.css';
// import './web content/vendors/owl-carousel/owl.carousel.min.css';
// import './web content/vendors/lightbox/simpleLightbox.css';
// import './web content/vendors/nice-select/css/nice-select.css';
// import './web content/vendors/animate-css/animate.css';
// import './web content/vendors/jquery-ui/jquery-ui.css';
import '../../web content/css/style.css';
import '../../web content/css/responsive.css';

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.customer ? (
          <><Header/>
          <h1>Welcome {userData.customer.CUserName}</h1>
            <Banner/>
            <Feature/>
            <Allproduct/>
          </>
      ) : (
        <>
          <Header />
          <Banner/>
          <Feature/>
          {/*<h2>You are not logged in</h2>*/}
          {/*<Link to="/login">Log in</Link>*/}
          <Allproduct/>
        </>
      )}
    </div>
  );
}
