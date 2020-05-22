import React from "react";

export default function Product(props){

    return(
        <>
            <tr>

                <td><img src={props.whishlistItem.url}/></td>
                <td>{props.whishlistItem.productname}</td>

            </tr>
            </>
    )

}