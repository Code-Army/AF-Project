import React, {Component} from 'react';
import axios from "axios";
import CatItem from "./CatItem";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

class AllCategory extends Component {
    constructor(props) {
        super(props);

        this.state= {
            categories:[],
            message:'Fail to delete the Category',
            isMessage:false,
            category:'',
            searchCategories:[],
            catId:''

        }
        this.onchangeCategory = this.onchangeCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {

        setInterval(this.getDataFromCategory,2000)
    }

    getDataFromCategory = () => {
        axios.get('http://localhost:5000/Category/').then(res =>{
            this.setState({
                categories:res.data.map(category => category),
                searchCategories:res.data.map(category => category),
                 category:res.data[0],
                isMessage:false

            });
            //console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })


    }

    handleClose(){
        this.setState({
            show:false

        })

    }
    handleShow(){
        this.setState({
            show:true
        })
    }
    onchangeCategory(e){
        this.setState({
            catId:e.target.value
        })

    }

    onSubmit(e){
        e.preventDefault();
        console.log(this.state.catId)
        this.setState({
            categories: this.state.categories.filter(category => category._id === this.state.catId)
        })

        // axios.get('http://localhost:5000/Category/searchCategory' +this.state.category )
        //     .then(res => {
        //         this.setState({
        //             categories:res.data.map(category => category),
        //         })
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
        //
        // alert(this.state.category)
    }

    deleteCategory(id){
        axios.delete('http://localhost:5000/Category/'+id)
            .then(res => {
                console.log(res.data)
                this.handleShow()
                this.setState(
                    {
                        message:res.data.msg,
                        isMessage:true
                    }
                )
            });
        this.setState({
            categories: this.state.categories.filter(el => el._id !== id),

        })
    }

    render() {
        return (
            <div>
            <br/>
                <h2>Categories</h2>
                    {/*<form className="form-inline" onSubmit={this.onSubmit}>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <label style={{margin: "5px"}}>Select category</label>*/}
                    {/*        <select className="custom-select custom-select-md mb-3" value={this.state.category._id}*/}
                    {/*                onChange={this.onchangeCategory}>*/}

                    {/*            {*/}
                    {/*                this.state.searchCategories.map(function(category) {*/}
                    {/*                    return <option*/}
                    {/*                        key={category}*/}
                    {/*                        value={category._id}>{category.name}*/}
                    {/*                    </option>;*/}
                    {/*                })*/}
                    {/*            }*/}
                    {/*        </select>*/}

                    {/*    </div>*/}

                    {/*    <button type="submit" className="btn btn-primary btn-raised rounded"*/}
                    {/*            style={{margin: "5px"}}>Search*/}
                    {/*    </button>*/}
                    {/*</form>*/}

                <br/><br/>
                <div className="table-responsive-md">
                    <table className="table table-hover" >

                        <thead className="thead-light">
                        <tr>
                            <th>Category</th>
                            <th>Image</th>
                            <th></th>
                            <th></th>



                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.categories.map(category => {
                                return(
                                    <CatItem deleteCategory = { this.deleteCategory}
                                                catItem = {category}
                                                key = {category._id}

                                    />
                                )
                            })
                        }
                        </tbody>
                    </table>


                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                     <p style={{color:"green"}}>{this.state.message}</p>
                    </Modal.Header>

                </Modal>
            </div>
        );
    }
}



export default AllCategory;