import React from "react";


export default function Description(props) {


    return (
        <div
            className="tab-pane fade"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab">
            <p>
                {props.description}
            </p>
            <p>

            </p>
        </div>
    )

}