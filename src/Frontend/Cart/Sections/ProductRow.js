import React,{Component} from "react";
import img1 from "../../../img/cartimg.jpg"

export default function ProductRow(props) {

    return (
        <tr>
            <td>
                <div className="media">
                    <div className="d-flex">
                        <img
                            src={img1}
                            alt=""
                        />
                    </div>
                    <div className="media-body">
                        <p>Minimalistic shop for multipurpose use</p>
                    </div>
                </div>
            </td>
            <td>
                <h5>$360.00</h5>
            </td>
            <td>
                <div className="product_count">
                    <input
                        type="text"
                        name="qty"
                        id="sst"
                        maxLength="12"
                        value="1"
                        title="Quantity:"
                        className="input-text qty"
                    />
                    <button
                        onClick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;"
                        className="increase items-count"
                        type="button"
                    >
                        <i className="lnr lnr-chevron-up"></i>
                    </button>
                    <button
                        onClick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) &amp;&amp; sst > 0 ) result.value--;return false;"
                        className="reduced items-count"
                        type="button"
                    >
                        <i className="lnr lnr-chevron-down"></i>
                    </button>
                </div>
            </td>
            <td>
                <h5>$720.00</h5>
            </td>
        </tr>
    )
}
