
import React, {Component} from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

import Product from "./product";
import Header from "../homepage/Header";
import Footer from "../homepage/Footer";


export default class WishList extends Component{

    constructor(props) {
        super(props);

        const token = localStorage.auth;
        const user = jwt_decode(token);
        this.delete = this.delete.bind(this);
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

    delete(id){
        //call route
        axios.delete('http://localhost:5000/wishlist/'+id)
            .then(response => { console.log(response.data)});

        //filter delete item
        this.setState({
            wishlist: this.state.wishlist.filter(el => el._id !== id),

        })
    }

    render() {

        const mystyle = {
            color: "white",
            backgroundColor: "#5a646b",

            fontFamily: "Arial",
            padding:"10px",
            paddingBottom:"10px"
        };

        const header = {
            textAlign: "center",

        }
        return (
            <>


                <div>
                    <Header/>


                    <div style={mystyle}>
                        <div style={header}>
                            <h2>Whish List</h2>
                        </div>

                    </div>
                    <div className="cart_section">

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="cart_container">



                                        <div className="cart_bar">
                                            <ul className="cart_bar_list item_list d-flex ">
                                                <li></li>
                                                <li></li>
                                                <li className="mr-auto">Product</li>
                                                <li>Details</li>
                                                <li></li>
                                                <li></li>

                                            </ul>
                                        </div>

                                        {
                                            this.state.wishlist.map(wishlist => {
                                                return(
                                                    <Product wishlistdelete = { this.delete}
                                                             whishlistItem = {wishlist}
                                                             key = {wishlist._id}

                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>

                    <Footer/>
                </div>
            </>
        )
    }
}