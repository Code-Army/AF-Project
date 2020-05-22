import React, {Component, useEffect} from "react";


export default class BillingDetails extends Component{

    constructor(props) {
        super(props);
        console.log(this.props.productLst)
    }

render(){

    const data =[{"name":"test1"},{"name":"test2"}];
    const listItems = this.props.productLst.map((d) => <li key={d.name}>{d.name}</li>);
    return(
        <div className="col-lg-6">
            {listItems}

        </div>
    )

}



}