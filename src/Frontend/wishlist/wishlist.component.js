
import React, {Component} from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

import Product from "./product";


export default class WishList extends Component{

    constructor(props) {
        super(props);

        const token = localStorage.auth
        const user = jwt_decode(token)

        this.state = {
            wishlist:[],
            userId:user.id
        }


    }

    componentDidMount() {
        const token = localStorage.auth
        const user = jwt_decode(token)
        axios.get(`http://localhost:5000/wishlist/wishlist_by_id?id=${user.id}&type=single`).then(res =>{
            this.setState({wishlist:res.data});
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }

    delete(e){

    }

    render() {
        return (
            <>
                <div className="container w-50">
                <table className="table table-sm w-50">
                    <thead>
                    <tr  className="col-5 w-100">

                        <th class="w-25" scope="col">Image</th>
                        <th class="w-auto" scope="col">Name</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.wishlist.map(Whishlist => {
                            return(
                                < Product delete={this.delete.bind(this)} whishlistItem = {Whishlist}  key = {Whishlist._id}/>

                            )
                        })
                    }

                    </tbody>
                </table>
                </div>
                </>
        )
    }
}