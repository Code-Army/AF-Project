// import React, {Component} from 'react';
//
// import axios from 'axios';
//
// class SearchResultView extends Component {
//     constructor(props) {
//         super(props);
//
//             this.onchangeproductname = this.onchangeCUserName.bind(this);
//             this.onSubmit = this.onSubmit.bind(this);
//
//             searchResult:[];
//         this.state = {
//         productname:''
//         }
//     }
//     onchangeproductname(e) {
//         this.setState({
//            productname : e.target.value
//         })
//     }
//
//     onsubmit(e){
//         e.preventDefault();
//         const searchProduct = {
//             productname: this.state.productname
//         }
//         axios.post('http://localhost:5000/products/SearchProduct',
//             searchProduct).then(res =>{
//                 console.log(res.data)
//                 this.setState({
//                     searchProduct:res.data
//                 });
//         });
//     }
//
//     render() {
//         return (
//             <div>
//
//             </div>
//         );
//     }
// }



import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchResultView(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)

        props.refreshFunction(event.currentTarget.value)

    }

    return (
        <div>
            <Search
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder="Search By Typing..."
            />
        </div>
    )
}

export default SearchResultView