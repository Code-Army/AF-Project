import {Link} from "react-router-dom";
import React,{useState} from "react";
import EditDiscountModel from "./editDiscountModel"


export default function Discount(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <tr>
            <td> {props.id}</td>
            <td>{props.discount.discountname}</td>
            <td>{props.discount.discountamount}</td>
            <td> {props.discount.productname}</td>
            <td>
                  <span className=" edit mx-2 text-primary" onClick={handleShow} title={"Edit Category"} style={{ cursor: "pointer" }}>
                            <i className="fa fa-pencil-square-o" ></i>
                        </span>

                <span className=" edit mx-2 text-primary" onClick={() => {props.deleteDiscount(props.discount._id)}} title={"Edit Category"} style={{ cursor: "pointer" }}>
                          <i className="fas fa-trash"></i>
                        </span>

            </td>
            <EditDiscountModel showEditModal={show} onCloseModal={handleClose} discountId={props.discount._id} />

        </tr>
    )

}