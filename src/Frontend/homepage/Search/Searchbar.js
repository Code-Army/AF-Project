// import React, {Component} from 'react';
//
// import axios from 'axios';
// import {Link} from "react-router-dom";
//
// class Searchbar extends Component {
//     constructor(props) {
//         super(props);
//
//          this.onchangeproductname = this.onchangeproductname.bind(this);
//          this.onSubmit = this.onSubmit.bind(this);
//
//         this.state = {
//             productname:'',
//             products:[]
//         }
//     }
//     onchangeproductname(e) {
//         this.setState({
//             productname : e.target.value
//         })
//     }
//
//     onSubmit(e){
//         e.preventDefault();
//         const searchProduct = {
//             productname: this.state.productname
//         }
//         axios.post('http://localhost:5000/products/SearchProduct',
//             searchProduct).then(res =>{
//             console.log(res.data)
//             this.setState({
//                 products:res.data
//             });
//         });
//     }
//
//     render() {
//         return (
//             <div>
//                <form onSubmit={this.onSubmit}>
//                    <div className="form-group col-md-6">
//                    <input type="text" className="form-control" value={this.state.products.productname}
//                            onChange={this.onchangeproductname}  />
//                        {this.state.products.map(function (products) {
//                         // return <option
//                         //         key={products}
//                         //     value={products._id}>
//                         //     {products.productname}
//                         // </option>
//                        })}
//                        <a href={`/products/searchresult/`}><input type="Submit" value="Search" /></a>
//                    </div>
//                </form>
//             </div>
//         );
//     }
// }
// export default Searchbar;



















