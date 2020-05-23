import React, {Component} from 'react';
import axios from "axios";
import {Modal} from "react-bootstrap";
import {storage} from "../../firebase";
import Alert from "react-bootstrap/Alert";
import '../CSS/allSubcategories.css'
class EditSubCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            catId: '',
            category:'',
            url:'',
            categories:[],
            file:null,
            message:'',
            imageUpdate:false

        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.onchangeName = this.onchangeName.bind(this);

        this.onchangeCategory = this.onchangeCategory.bind(this);
        this.onchangeImage = this.onchangeImage.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        let id = '';
        axios.get('http://localhost:5000/subCategory/' + this.props.subcategory._id)
            .then(res => {

                id = res.data.category
                this.setState({
                    name: res.data.name,
                    catId: res.data.category,
                    url:res.data.url,
                    file:res.data.url
                })

                axios.get('http://localhost:5000/Category/' + id)
                    .then(res => {
                        this.setState({
                            category:res.data
                        })
                        console.log(this.state.category)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })


            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/Category/').then(res =>{
            this.setState({
                categories:res.data.map(category => category),

            });
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })


        console.log(id)


    }

    onchangeName(e){
        this.setState({
            name:e.target.value
        })
    }

    onchangeCategory(e){
        this.setState({
            category:e.target.value
        })
    }



    onchangeImage(e){


        // this.setState({
        //     let reader = new FileReader()
        //     //image:URL.createObjectURL(e.target.files[0])
        // })
        if(e.target.files[0]){
            let reader = new FileReader();
            reader.onload = (e) =>{
                this.setState({
                    file:e.target.result
                })
            }
            reader.readAsDataURL(e.target.files[0])
            const image = e.target.files[0];
            console.log(image)
            this.setState({
                imageUpdate:true
            })
            this.setState(() => ({image}))
        }
    }
    onSubmit(e) {
        e.preventDefault();

        if(this.state.imageUpdate){
            const {image} = this.state;
            const name = image.name
            console.log(name)
            const uploadtask =  storage.ref("images/"+image.name).put(image);
            uploadtask.on('state_changed',
                (snapshot) =>{

                },
                (error) =>{
                    console.log(error)
                },
                () => {
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        console.log(url);
                        const subCategory = {
                            name: this.state.name,
                            category: this.state.category,
                            url:url
                        }
                        console.log(this.state.name)



                        axios.put('http://localhost:5000/subCategory/' + this.props.subcategory._id, subCategory)
                            .then(res => {
                                console.log(res.data)
                                this.setState(
                                    {
                                        message:res.data.msg
                                    }
                                )

                            });
                        this.setState({
                            message:''
                        })
                    })



                });


        }

        else{
            const subCategory = {
                name: this.state.name,
                category: this.state.category,
                url:this.props.subcategory.url
            }




            axios.put('http://localhost:5000/subCategory/' + this.props.subcategory._id, subCategory)
                .then(res => {
                    console.log(res.data)
                    this.setState(
                        {
                            message:res.data.msg
                        }
                    )

                });
            this.setState({
                message:''
            })
        }



    }

    handleCloseModal() {
        this.props.onCloseModal();
        this.setState({
            message:''
        })
    }

    render() {

        return (
            <div>
                <Modal size="md" show={this.props.showEditModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <h4>Edit Subcategory -  {this.props.subcategory.name}</h4>
                    </Modal.Header>
                    <Modal.Body><div className="editSubCat">
                        {this.state.message.length > 0 &&
                        <Alert variant="success">{this.state.message}</Alert>}
                        <div>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.name} onChange={this.onchangeName} placeholder="Name"></input>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Category</label>
                                    <div className="col-sm-10">
                                        <select className="custom-select custom-select-md mb-3" value={this.state.category._id}
                                                onChange={this.onchangeCategory}>

                                            {
                                                this.state.categories.map(function(category) {
                                                    return <option
                                                        key={category}
                                                        value={category._id}>{category.name}
                                                    </option>;
                                                })
                                            }
                                        </select></div></div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Image</label>
                                    <div className="subcatImg"><img src={this.state.file}/></div>
                                    <div className="col-sm-10">
                                        <input type="file" className="form-control-file rounded" id="image" onChange={this.onchangeImage} ></input>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <input type="submit" value="Submit" className="btn btn-primary btn-block rounded py-2"></input>
                                </div>
                            </form>
                        </div></div></Modal.Body></Modal>
            </div>
        );
    }
}

export default EditSubCategory;
