import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

const Product = props =>(

    <tr>
        <td>{props.id} </td>
        <td>{props.product.productname}</td>
        <td>{props.product.category}</td>
        <td>{props.product.subcategory}</td>
        <td>{props.product.description}</td>
        <td>{props.product.shortdiscription}</td>
        <td>{props.product.availability}</td>
        <td>{props.product.specification}</td>
        <td>{props.product.price}</td>
        <td>{props.product.oprice}</td>
        <td>

            <Link to={"/edit/" + props.product._id}>edit</Link> | <a href="#" onClick={() => {props.deleteProduct(props.product._id)}}>delete</a>
        </td>


    </tr>

)

export default class ProductList extends Component{
    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.searchProduct = this.searchProduct.bind(this);



        this.state  = {
            products: [],
            subCategories:[],
            categories: [],
            name:'',
            subcategory:'',
            searchProduct : '',
            sproducts:[],

        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/Category/')
            .then(response => {
                if(response.data.length > 0 ) {
                    this.setState({
                        categories : response.data.map(category => category.name),
                        name : response.data[0].name

                    })
                }
            })
        axios.get('http://localhost:5000/createSubCategory/')
            .then(response => {
                if(response.data.length > 0 ) {
                    this.setState({
                        subCategories : response.data.map(subcategory => subcategory.name),
                        subcategory : response.data[0].name

                    })
                }
            })
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
    onChangeSearch(e){
        this.setState({
                searchProduct: e.target.value
            }
        )
    }

    searchProduct(){
        console.log(this.state.searchProduct)

        axios.get(`http://localhost:5000/products/products_by_name?name=${this.state.searchProduct}&type=single`)
            .then(response => {
                // setProduct(response.data[0])
                console.log("responce success")
            })


        // axios.get(`http://localhost:5000/products/pruduct_by_name?name=${this.state.searchProduct}&type=single`)
        //     .then(response => {
        //         this.setState(
        //             {sproducts: response.data[0]}
        //         )
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })

    }


    deleteProduct (id){
        axios.delete('http://localhost:5000/products/' + id)
            .then(res => console.log(res.data));

        this.setState({
            products: this.state.products.filter(el => el._id !== id)
        })
    }
    productList(){

        return this.state.products.map((currentProducts,j )=> {
            const id =j;
            return <Product id={id+1}  product = {currentProducts} deleteProduct = {this.deleteProduct} key = {currentProducts._id}></Product>;

          })
    }
    render() {
        return (
            <div>

                <form className="form-inline">
                    <i className="fas fa-search" aria-hidden="true"></i>
                    <input className="form-control form-control-sm ml-3 w-25" type="text" placeholder="Search"
                           aria-label="Search" onChange={this.onChangeSearch}/>

                    {/*<select ref="userInput"*/}
                    {/*        required*/}
                    {/*        className="form-control"*/}
                    {/*        value={this.state.name}*/}
                    {/*        onChange={this.onChangeCategory}>*/}
                    {/*    {*/}
                    {/*        this.state.categories.map(function(category) {*/}
                    {/*            return <option*/}
                    {/*                key={category}*/}
                    {/*                value={category}>{category}*/}
                    {/*            </option>;*/}
                    {/*        })*/}
                    {/*    }*/}
                    {/*</select>*/}

                    <div className="dropdown ml-3">
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeCategory}>
                            {
                                this.state.categories.map(function(category) {
                                    return <option
                                        key={category}
                                        value={category}>{category}
                                    </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="dropdown ml-3 ">
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.subcategory}
                                onChange={this.onChangeSubCategory}>
                            {
                                this.state.subCategories.map(function(scategory) {
                                    return <option
                                        key={scategory}
                                        value={scategory}>{scategory}
                                    </option>;
                                })
                            }
                        </select>
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
                <button type="button" className="btn btn-dark float-right mr-4" onClick={this.searchProduct}>search</button>


                <br/><br/>

                <h3 className="table_header ml-3"> Products</h3>
                <table className="table ml-3">
                    <thead className="thead-light">
                        <tr>
                            <th>No</th>
                            <th>ProductName</th>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Description</th>
                            <th>Short Description</th>
                            <th>Availability</th>
                            <th>Specification</th>
                            <th>Unit Price</th>
                            <th>original price</th>
                            <th>Action</th>

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


