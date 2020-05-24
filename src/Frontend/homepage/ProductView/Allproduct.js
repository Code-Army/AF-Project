import React, {Component} from 'react';

import axios from 'axios';
import ProductShow from './ProductShow';
import productItem from "./productItem";
import Header from "../Header";

class Allproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            userdata:this.props.userdata
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

                {/*<div className="container">*/}

                {/*    //PRODUCT 1*/}
                {/*    <div className="card">*/}
                {/*        <div className="card-body">*/}
                {/*            <h5 className="card-title"></h5>*/}
                {/*            <h6 className="card-subtitle mb-2 text-muted"></h6>*/}
                {/*            <p className="card-text">Some quick example text to build on the card title and make up the bulk of*/}
                {/*                the card's content.</p>*/}
                {/*            <a href={`/products/5ec5aecc4a845c3f48946291`} className="card-link">GO Details</a>*/}

                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="row">*/}
                {/*        {*/}
                {/*            this.state.product.map(product => {*/}
                {/*                return(*/}
                {/*                    <productItem productItem = {product}  key = {product._id}/>*/}
                {/*                )*/}
                {/*            })*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*</div>*/}
            </>
        );
    }
}

export default Allproduct;