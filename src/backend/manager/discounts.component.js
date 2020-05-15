import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

const Discount = props =>(

    <tr>
        <td> {props.id}</td>
        <td>{props.discount.discountname}</td>
        <td>{props.discount.discountprecentage}</td>
        <td>
            <Link to={"/editdiscount/" + props.discount._id}>edit</Link> | <a href="#" onClick={() => {props.deleteDiscount(props.discount._id)}}>delete</a>
        </td>


    </tr>

)

export default class discounts extends Component{
    constructor(props) {
        super(props);

        this.deleteDiscount = this.deleteDiscount.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.searchDiscount = this.searchDiscount.bind(this);


        this.state  = {
            discounts: [],
            searchProduct : '',
            sproducts:[]
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/discounts/')
            .then(response => {
                this.setState(
                    {discounts: response.data}
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
    searchDiscount(){
        console.log(this.state.searchDiscount)

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


    deleteDiscount (id){
        axios.delete('http://localhost:5000/discounts/' + id)
            .then(res => console.log(res.data));

        this.setState({
            discounts: this.state.discounts.filter(el => el._id !== id)
        })

    }
    discountList(){
        return this.state.discounts.map((currentDiscount,j ) => {
            const id =j;

            return <Discount
                        id={id+1}
                        discount = {currentDiscount}
                        deleteDiscount = {this.deleteDiscount}
                        key = {currentDiscount._id}>
                   </Discount>;

        })
    }
    showAddDiscount (){
        window.location='/adddiscount'
    }
    render() {
        return (
            <div className="ml-5 mr-5">

                <form class="form-inline">
                    <i class="fas fa-search" aria-hidden="true"></i>
                    <input class="form-control form-control-sm ml-3 w-25" type="text" placeholder="Search"
                           aria-label="Search" onChange={this.onChangeSearch}/>

                    <button type="button" className="btn btn-dark float-right ml-4" onClick={this.searchProduct}>search</button>


                </form>
                <button onClick={"/edit/"} className="btn btn-dark float-right mr-4" onClick={this.showAddDiscount}>add discount</button>

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

                <h3>Inserted Discounts </h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>No</th>
                        <th>Discount Name</th>
                        <th>Discount precentage</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.discountList()}
                    </tbody>
                </table>
            </div>
        )
    }
}


