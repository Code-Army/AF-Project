import React, {Component} from 'react';
import axios from "axios";
import SubcatItem from "./SubcatItem";

class AllSubCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {

            category:'',
            categories:[],
            subcategories:[]
        }

        this.onchangeCategory = this.onchangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteSubCategory = this.deleteSubCategory.bind(this);
    }
    componentDidMount() {

        axios.get('http://localhost:5000/Category/').then(res =>{
            this.setState({
                categories:res.data.map(category => category),
                category:res.data[0]
            });
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })

    }

    onchangeCategory(e){
        this.setState({
            category:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const searchCategory = {
            category: this.state.category
        }

        axios.post('http://localhost:5000/subCategory/getSubCategory'
            , searchCategory).then(res => {
                console.log(res.data)
                this.setState({
                    subcategories :res.data
                });

            });
    }

    deleteSubCategory(id){
        axios.delete('http://localhost:5000/subCategory/'+id)
            .then(res => console.log(res.data));
        this.setState({
            subcategories: this.state.subcategories.filter(el => el._id !== id)
        })
    }

    render() {
        return (
            <div>
                <br/><br/>
                <div className="col-md-6">
                <form class="form-inline" onSubmit={this.onSubmit}>
                    {/*<div className="row ">*/}
                    <div className="form-group">
                    <label style={{margin:"5px"}}>Select category</label>
                    <select ref="userInput"
                            className="custom-select"
                            value={this.state.category._id}
                            onChange={this.onchangeCategory}>
                        {
                            this.state.categories.map(function(category) {
                                return <option
                                    key={category}
                                    value={category._id}>{category.name}
                                </option>;
                            })
                        }
                    </select>

                    </div>

                        <button type="submit" className="btn btn-primary btn-raised rounded" style={{margin:"5px"}}>Submit</button>
                </form></div>
                <br/>

                <div className="table-responsive-md">
                    <table className="table table-hover" >

                        <thead className="thead-light">
                        <tr>
                            <th>Subcategory</th>
                            <th>image</th>
                            <th></th>
                            <th></th>



                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.subcategories.map(subcat => {
                                return(
                                    <SubcatItem deleteSubCategory = { this.deleteSubCategory}
                                              subCatItem = {subcat}
                                              key = {subcat._id}

                                    />
                                )
                            })
                        }
                        </tbody>
                    </table>


                </div>
            </div>
        );
    }
}

export default AllSubCategories;