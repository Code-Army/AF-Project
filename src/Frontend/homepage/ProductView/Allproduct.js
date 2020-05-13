import React, {Component} from 'react';

import axios from 'axios';

import productItem from "./productItem";
import Header from "../Header";

class Allproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/product/').then(res =>{
            this.setState({product:res.data});
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }


    Selectproduct(id){
        axios.get('http://localhost:5000/product/'+id)
            .then(res => console.log(res.data));
        this.setState({
            product: this.state.product.filter(el => el._id !== id)
        })
    }


    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        {
                            this.state.product.map(product => {
                                return(
                                    <productItem productItem = {product}  key = {product._id}/>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default Allproduct;