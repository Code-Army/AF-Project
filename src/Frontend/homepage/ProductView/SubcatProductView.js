import React, {Component} from 'react';

import axios from 'axios';

import Header from "../Header";
import SubcatProductViewItem from "./SubcatProductViewItem";
import Footer from "../Footer";


class SubcatProductView extends Component {
    constructor(props) {
        super(props);
        const productId = props.match.params.id;
        this.state = {
            products:[],
            Subid:productId
        }
    }

// +this.props.match.params.category
    componentDidMount() {
        console.log(this.state.Subid);
        const id = this.props.match.params.id;
        axios.get(`http://localhost:5000/products/subProduct/Product_by_Subid?id=${this.state.Subid}&type=single`).then(res =>{
            this.setState({products:res.data});
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }


    SelectSubcategory(id){
        axios.get('http://localhost:5000/products/'+id)
            .then(res => console.log(res.data));
        this.setState({
            Subcategory: this.state.products.filter(el => el._id !== id)
        })
        alert(id);
    }


    render() {
        return (
            <>
                <Header/>
                <div className="container pt-5">
                    <div className="row">
                        {
                            this.state.products.map(products => {
                                return(
                                    <SubcatProductViewItem SubcatProductViewItem   = {products}  key = {products._id}/>
                                )
                            })
                        }
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

export default SubcatProductView;