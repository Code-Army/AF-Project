import React, {Component} from 'react';

import axios from 'axios';

import Header from "../Header";
import Footer from "../Footer";


class SubcatProductView extends Component {
    constructor(props) {
        super(props);
        const productId = props.match.params.id
        this.state = {
            product:[],
            Subid:productId
        }
    }

// +this.props.match.params.category
    componentDidMount() {
        console.log(this.state.Subid);
        const Id = this.props.match.params.id
        axios.get(`http://localhost:5000/products/Product_by_Subcat?id=${this.state.Subid}&type=single`).then(res =>{
            this.setState({product:res.data});
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }


    SelectSubcategory(id){
        axios.get('http://localhost:5000/Subcategory/'+id)
            .then(res => console.log(res.data));
        this.setState({
            Subcategory: this.state.Subcategory.filter(el => el._id !== id)
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
                            this.state.Subcategory.map(Subcategory => {
                                return(
                                    < SubcategoryItem SubcategoryItem = {Subcategory}  key = {Subcategory._id}/>

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