import React, {Component} from 'react';

import axios from 'axios';

import Header from "../Header";
import ProductShow from './ProductShow';


class Allproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[]
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/products/').then(res =>{
            this.setState({products:res.data});
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }


    Selectproducts(id){
        axios.get('http://localhost:5000/products/'+id)
            .then(res => console.log(res.data));
        this.setState({
            products: this.state.products.filter(el => el._id !== id)
        })
        alert(id);
    }


    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        {
                            this.state.products.map(products => {
                                return(
                                    < ProductShow ProductShow = {products}  key = {products._id}/>

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