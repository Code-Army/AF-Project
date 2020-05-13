import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

const Product = props =>(

    <tr>
        <td> </td>
        <td>{props.product.productname}</td>
        <td></td>
        <td></td>
        <td>{props.product.description}</td>
        <td>{props.product.price}</td>
        <td>{props.product.oprice}</td>
        <td>
            <Link to={"/edit/" + props.product._id}>edit</Link> | <a href="#" onClick={() => {props.deleteProduct(props.product._id)}}>delete</a>
        </td>
        <td>
            <button type="button" className="btn btn-dark">publish</button>
        </td>

    </tr>

)

export default class ProductList extends Component{
    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);

        this.state  = {
            products: [],
            search : ''
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


    deleteProduct (id){
        axios.delete('http://localhost:5000/products/' + id)
            .then(res => console.log(res.data));

        this.setState({
            products: this.state.products.filter(el => el._id !== id)
        })
    }
    productList(){
        return this.state.products.map(currentProducts => {
            return <Product  product = {currentProducts} deleteProduct = {this.deleteProduct} key = {currentProducts._id}></Product>;

          })
    }
    render() {
        return (
            <div>

                <form class="form-inline">
                    <i class="fas fa-search" aria-hidden="true"></i>
                    <input class="form-control form-control-sm ml-3 w-25" type="text" placeholder="Search"
                           aria-label="Search" onChange={this.onchangesearch}/>



                    <div className="dropdown show">
                       <a className="btn btn-secondary dropdown-toggle ml-3" href="#" role="button" id="dropdownMenuLink"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           select category
                       </a>

                       <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">

                       </div>
                    </div>
                    <div className="dropdown show">
                        <a className="btn btn-secondary dropdown-toggle ml-3" href="#" role="button" id="dropdownMenuLink"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            select sub category
                        </a>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">

                        </div>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input ml-3" type="checkbox" value="" id="defaultCheck1"/>
                            <label className="form-check-label" htmlFor="defaultCheck1">
                               is Available
                            </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input ml-3" type="checkbox" value="" id="defaultCheck1"/>
                            <label className="form-check-label" htmlFor="defaultCheck1">
                               is discount
                            </label>
                    </div>
                </form>
                <button type="button" className="btn btn-dark float-right mr-4">search</button>

                {/*<select ref = "userInput"*/}
                {/*        required*/}
                {/*        className="form-control"*/}
                {/*        value={this.state.productname}*/}
                {/*        onChange={this.onChangeSearchByProductname}>*/}
                {/*    {*/}
                {/*    this.state.products.map(function (product) {*/}
                {/*        return <option*/}
                {/*            key={product}*/}
                {/*            value={product}>{product}*/}
                {/*        </option>;*/}

                {/*    })*/}
                {/*    }*/}
                {/*</select>*/}
                <br/><br/>

                <h3>Inserted Products</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>No</th>
                            <th>ProductName</th>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Description</th>
                            <th>Unit Price</th>
                            <th>original price</th>
                            <th>Action</th>
                            <th>publish</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.productList()}
                    </tbody>
                </table>
            </div>
        )
    }
}


