import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../Authentication/Auth";
// import "../../css/style.css"
import banner from "./../../img/banner.jpg"



export default function Banner() {

    const backgroundImage = `url(./../../img/banner.jpg)`;
    return (
        <img className="home_banner_area mb-40" src={banner}>
        </img>
    );
}
