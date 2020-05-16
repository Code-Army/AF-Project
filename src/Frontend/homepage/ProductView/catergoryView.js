import React, {Component} from 'react';

import axios from 'axios';

import ProductViewItems from "./ProductViewItems";
import Header from "../Header";
import Footer from "../Footer";

class catergoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category:[]
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/Category/').then(res =>{
            this.setState({category:res.data});
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }


    SelectCategory(id){
        axios.get('http://localhost:5000/Category/'+id)
            .then(res => console.log(res.data));
        this.setState({
            category: this.state.category.filter(el => el._id !== id)
        })
        alert(id);
    }


    render() {
        return (
            <>
            <Header/>
            <div className="container">
                <div className="row">
                        {
                            this.state.category.map(category => {
                                return(
                                    <ProductViewItems ProductViewItems = {category}  key = {category._id}/>
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

export default catergoryView;