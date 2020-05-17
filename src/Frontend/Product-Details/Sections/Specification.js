import React, {Component} from "react";
import jwt_decode from "jwt-decode";


export default class Specification extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name:"pasan"
        }
    }

    componentDidMount() {
        const token = localStorage.auth2;
       // const decoded = jwt_decode(token);

        this.setState({
            name:token.CUserName
        })

        console.log(this.state.name)
    }

    render() {
    return (
        <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab">
            <div className="table-responsive">
                {this.props.specification}<br/>
                {this.state.name}
            </div>
        </div>
    )
}



}