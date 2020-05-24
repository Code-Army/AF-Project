import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

const Product = props =>(



    <tr>
        <td>{props.id} </td>
        <td>{props.product.productname}</td>
        <td>{props.product.category}</td>
        <td>{props.product.subcategory}</td>

        <td>{props.product.availability}</td>

        <td>{props.product.price}</td>
        <td>{props.product.oprice}</td>
        <td>

            <Link to={"/admin/product/" + props.product._id}><i className="fas fa-edit"></i></Link> | <a href="#" onClick={() => {props.deleteProduct(props.product._id)}}><i
            className="fas fa-trash"></i></a>
        </td>


    </tr>

)

export default class ProductList extends Component{
    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('auth-token');
        if (token == null){
            window.location = '/admin/login'
        }
        //method bind
        this.deleteProduct = this.deleteProduct.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.searchProduct = this.searchProduct.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);

        //set the initial state
        this.state  = {
            products: [],
            subCategories:[],
            categories: [],
            name:'',
            subcategory:'',
            searchProduct : '',
            sproducts:[],
            sCategory:""

        };
    }

    //get the list of products,categories and sub categories from database
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

    searchProduct(e){
        console.log(e.target.value)
        if (this.state.searchProduct == ''){

            axios.get('http://localhost:5000/products/')
                .then(response => {
                    this.setState(
                        {products: response.data}
                    )
                })
                .catch((error) => {
                    console.log(error);
                })
        }else{
            axios.get(`http://localhost:5000/products/search/search_by_name?name=${this.state.searchProduct}&type=single`)
                .then(response => {
                    this.setState(
                        {products: response.data}
                    )
                })
        }



    }

    //set states when category changed
    onChangeCategory(e){
        this.setState({
            sCategory:e.target.value
        })

        axios.get(`http://localhost:5000/products/searchcat/search_by_category?name=${e.target.value}&type=single`)
            .then(response => {
                console.log(response.data)
                this.setState(
                    {

                    }
                )
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

        return this.state.products.map((currentProducts,j )=> {
            const id =j;
            return <Product ClickEdit={this.props.ClickEdit} id={id+1}  product = {currentProducts} deleteProduct = {this.deleteProduct} key = {currentProducts._id}></Product>;

          })
    }
    showAddDiscount (){
        window.location='/create'
    }
    render() {
        return (
            <div className="row">


                <div className="col-12">

                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Products</h3>

                            <div className="card-tools">
                                <div className="input-group input-group-sm" >
                                    <input type="text" name="table_search" className="form-control float-right"
                                           placeholder="Search" onChange={this.onChangeSearch}/>

                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-default" onClick={this.searchProduct}><i
                                            className="fas fa-search"></i></button>&nbsp;&nbsp;

                                    </div>


                                </div>
                            </div>
                        </div>

                        <div className="card-body table-responsive p-0">
                            <table className="table table-hover text-nowrap">
                                <thead>
                                <tr>
                                    <th>No</th>
                                    <th>ProductName</th>
                                    <th>Category</th>
                                    <th>Sub Category</th>

                                    <th>Availability</th>

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

                    </div>

                </div>
            </div>
        )
    }
}


