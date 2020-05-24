import React,{useState} from "react";
import {Link} from "react-router-dom";
import EditDiscountModel from "./editDiscountModel";

export default function OrderItem(props) {

    const imgStyle = {
        width:"50px",
        height:"50px"
    }
    return(
        <>
            <tr>
                <td> {props.id}</td>
                <td>{props.order.productName}</td>
                <td><img style={imgStyle} src={props.order.img}/></td>
                <td> {props.order.status}</td>



            </tr>
            </>
    )
}