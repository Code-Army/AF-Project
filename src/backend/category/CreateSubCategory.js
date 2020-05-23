import React, {Component} from 'react';
import axios from "axios";
import {storage} from "../../firebase";
import AllSubCategories from './AllSubCategories'
import Alert from "react-bootstrap/Alert";
class CreateSubCategory extends Component {
    constructor(props) {
        super(props);

        this.onchangeName = this.onchangeName.bind(this);

        this.onchangeCategory = this.onchangeCategory.bind(this);
        this.onchangeImage = this.onchangeImage.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:'',
            category:'',
            error:'',
            success:'',
            url:'',
            file:null,
            categories:[]

        }
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
        setInterval(this.setMessage,5000)
    }


    setMessage = () => {
        this.setState({
            isMessage:false
        })
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
            this.setState(() => ({image}))
        }
    }
    onSubmit(e){
        e.preventDefault();
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
                    const newCategory = {
                        name: this.state.name,

                        category: this.state.category,
                        url:url
                    }
                    console.log(this.state.name)

                    this.setState(
                        {
                            name: '',

                            url: '',

                        }
                    )

                    axios.post('http://localhost:5000/subCategory/add'
                        , newCategory).then(res => {
                        console.log(res.data)

                        this.setState(
                            {
                                message: res.data.msg,
                                isMessage:true
                            }
                        )

                    });
                })

            });
    }

    render() {
        return (
            <div>

                <div className="card col-md-4 rounded shadow " style={{position: "absolute", margin: "auto", top: "5%", right: "0", bottom: "5%", left: "0"}} >
                    <div className="card-header"><h2>Create Sub categories</h2> </div>
                    <div className="card-body">
                        {this.state.isMessage &&
                        <Alert variant="success">{this.state.message}</Alert>}
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label  className="bmd-label-floating"> Sub Category Name</label>
                                <input type="text" className="form-control rounded" id="name"value={this.state.name} onChange={this.onchangeName}  required="required"></input>
                            </div>
                            <div className="form-group">
                                <label  className="bmd-label-floating">Category Name</label>
                                <select ref="userInput"
                                        className="form-control rounded"
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

                            <div className="form-group rounded">
                                <label  className="bmd-label-floating">Upload Image</label>
                                <div className="subcatImg"><img src={this.state.file}/></div>
                                <input type="file" className="form-control-file rounded" id="image" onChange={this.onchangeImage} ></input>

                            </div>

                            <button type="submit" className="btn btn-primary btn-raised rounded col-md-12">Submit</button>
                        </form>
                    </div>

                </div>

            </div>
        );
    }
}

export default CreateSubCategory;