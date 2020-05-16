import React, {Component} from 'react';

import axios from 'axios';
import 'react-bootstrap';
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
                <section className="inspired_product_area section_gap_bottom_custom">
                <div className="container">
                    <div className="row justify-content-center text-dark">
                        <div className="col-lg-12">
                            <div className="main_title text-dark">
                                <h2><span className="text-dark">Inspired products</span></h2>
                                <p>Bring called seed first of third give itself now ment</p>
                            </div>
                        </div>
                    </div>
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
                </section>
            </>
        );
    }
}

export default Allproduct;