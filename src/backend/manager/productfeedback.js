import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

const ProductFeedbacks = props =>(

    <tr>
        <td>{props.id} </td>
        <td>{props.productfeedbacks.productname}</td>
        <td>{props.productfeedbacks.category}</td>
        <td>{props.productfeedbacks.subcategory}</td>

        <td>

            <button className="btn btn-dark btn-sm"  >view feedback</button>

        </td>


    </tr>

)

export default class productfeedback extends Component{
    constructor(props) {
        super(props);


        this.state  = {
            products: [],
        };
    }

    componentDidMount() {

        axios.get('http://localhost:5000/products/')
            .then(response => {
                this.setState(
                    {products: response.data}
                )
            })
            .catch((error) => {
                console.log(error);
            })


    }
    viewFeedback(){
        // window.location = '/viewfeedbacks'
    }
    productfeedbackList(){

        return this.state.products.map((currentProducts,j )=> {
            const id =j;
            return <ProductFeedbacks id={id+1}  productfeedbacks = {currentProducts} key = {currentProducts._id}></ProductFeedbacks>;

        })
    }
    render() {
        return (
            <div className="container">

                <h3 className="table_header ml-3 "> Products </h3>
                <table className="table ml-3 ">
                    <thead className="thead-light">
                    <tr>
                        <th>No</th>
                        <th>ProductName</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.productfeedbackList()}
                    </tbody>
                </table>
            </div>
        )
    }
}


