import React, {Component} from 'react';

import axios from 'axios';

import Header from "../Header";
import SubcategoryItem from "./SubcategoryItem";
import Footer from "../Footer";


class SubcategoryView extends Component {
    constructor(props) {
        super(props);
        const productId = props.match.params.id
        this.state = {
            Subcategory:[],
            Subid:productId
        }
    }

// +this.props.match.params.category
    componentDidMount() {
        console.log(this.state.Subid);
        const Id = this.props.match.params.id
        axios.get(`http://localhost:5000/Subcategory/category_by_id?id=${this.state.Subid}&type=single`).then(res =>{
            this.setState({Subcategory:res.data});
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
                <div className="container pt-5">
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

export default SubcategoryView;