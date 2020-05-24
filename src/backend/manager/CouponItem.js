import {Link} from "react-router-dom";
import React,{useState} from "react";
import EditCouponModel from "./EditCouponModel";


export default function CouponItem(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <tr>
            <td> {props.id}</td>
            <td>{props.coupon.couponname}</td>
            <td>{props.coupon.couponcode}</td>
            <td> {props.coupon.couponamount}</td>
            <td>
                  <span className=" edit mx-2 text-primary" onClick={handleShow} title={"Edit Category"} style={{ cursor: "pointer" }}>
                            <i className="fa fa-pencil-square-o" ></i>
                        </span>

                <span className=" edit mx-2 text-primary" onClick={() => {props.deleteCoupon(props.coupon._id)}} title={"Edit Category"} style={{ cursor: "pointer" }}>
                         <i className="fas fa-trash"></i>
                        </span>


            </td>
            <EditCouponModel showEditModal={show} onCloseModal={handleClose} couponId={props.coupon._id} />

        </tr>
    )

}