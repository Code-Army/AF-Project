import React, {Component} from 'react';
import axios from "axios";
import {storage} from "../../firebase";
import {Modal} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import '../CSS/allSubcategories.css';
class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: '',
            image: '',
            file:null,
            message: '',
            imageUpdate: false

        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.onchangeName = this.onchangeName.bind(this);
        this.onchangeImage = this.onchangeImage.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/Category/' + this.props.category._id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    url: res.data.url,
                    file:res.data.url,
                    message:''
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onchangeName(e){
        this.setState({
            name:e.target.value
        })
    }

    onchangeImage(e){
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
                        const category = {
                            name: this.state.name,
                            url:url
                        }
                        console.log(this.state.name)



                        axios.put('http://localhost:5000/Category/' + this.props.category._id, category)
                            .then(res => {
                                console.log(res.data)
                                this.setState(
                                    {
                                        message:res.data.msg
                                    })
                            });
                        this.setState({
                            message:''
                        })
                    })
            });
        }
        else{
            const category = {
                name: this.state.name,
                url:this.props.category.url
            }

            axios.put('http://localhost:5000/Category/' + this.props.category._id, category)
                .then(res => {
                    console.log(res.data)
                    this.setState(
                        {
                            message:res.data.msg
                        })
                });
            this.setState({
                message:''
            })
        }}

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
                        <h4>Edit Category -  {this.props.category.name}</h4>
                    </Modal.Header>
                    <Modal.Body><div className="editCat">
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
                                    <label className="col-sm-2 col-form-label">Image</label>
                                    <div className="subcatImg"><img src={this.state.file}/></div>
                                    <div className="col-sm-10">
                                        <input type="file" className="form-control-file rounded" id="image" onChange={this.onchangeImage} ></input>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <input type="submit" value="Edit Category" className="btn btn-primary btn-block rounded py-2"></input>
                                </div>
                            </form>
                        </div></div></Modal.Body></Modal>
            </div>
        );
    }
}

export default EditCategory;