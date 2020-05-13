import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contex/UserContext";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Banner";
import Feature from "./Feature";
import Allproduct from "./ProductView/Allproduct";

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
