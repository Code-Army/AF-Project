import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

const Coupon = props =>(

    <tr>
        <td>{props.id}</td>
        <td>{props.coupon.couponname}</td>
        <td>{props.coupon.couponcode}</td>
        <td>{props.coupon.couponamount}</td>
        <td>

            <Link to={"/editcoupon/" + props.coupon._id}>edit</Link> | <a href="#" onClick={() => {props.deleteCoupon(props.coupon._id)}}>delete</a>
        </td>


    </tr>

)

export default class coupondiscounts extends Component{
    constructor(props) {
        super(props);

        this.deleteCoupon = this.deleteCoupon.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        // this.searchProduct = this.searchProduct.bind(this);


        this.state  = {
            coupons: [],
            searchCoupon : '',
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/coupons/')
            .then(response => {
                this.setState(
                    {coupons: response.data}
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


    deleteCoupon (id){

        axios.delete('http://localhost:5000/coupons/' + id)
            .then(res => console.log(res.data));

        this.setState({
            coupons: this.state.coupons.filter(el => el._id !== id)
        })
    }
    couponList(){

        return this.state.coupons.map((currentCoupons,j ) => {
            const id =j;
            return <Coupon id={id+1}  coupon = {currentCoupons} deleteCoupon = {this.deleteCoupon} key = {currentCoupons._id}> </Coupon>;

        })
    }

    showAddcoupon (){
       window.location='/addcoupon'
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
                <button onClick={"/edit/"} className="btn btn-dark float-right mr-4" onClick={this.showAddcoupon}>add coupon</button>

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

                <h3>Inserted Coupons </h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>No</th>
                        <th>Coupon Name</th>
                        <th>Coupon code</th>
                        <th>Coupon Amount</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.couponList()}
                    </tbody>
                </table>
            </div>
        )
    }
}


