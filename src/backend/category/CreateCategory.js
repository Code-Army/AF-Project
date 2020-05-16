import React, {Component} from 'react';
import axios from 'axios';
import {storage} from '../../firebase'
class CreateCategory extends Component {

    constructor(props) {
        super(props);


        this.onchangeName = this.onchangeName.bind(this);

        this.onchangeImage = this.onchangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:'',
            error:'',
            success:'',
            image:null,
            url:'',


        }
    }



    onchangeName(e){
        this.setState({
            name:e.target.value
        })
    }



    onchangeImage(e){
        if(e.target.files[0]){
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
            () =>{
                storage.ref('images').child(image.name).getDownloadURL().then(url =>{
                    console.log(url);
                    const newCategory = {
                        name:this.state.name,
                        // description:this.state.description,
                        url:url
                    }
                    console.log(this.state.name)
                    this.setState(
                        {
                            name:'',

                            url:''
                        }
                    )


                    axios.post('http://localhost:5000/Category/add'
                        , newCategory).then(res =>{ console.log(res.data)

                        this.setState(
                            {
                                error: res.data
                            }
                        )

                    });
                })
            });

        if(!this.state.error){
            alert('category added successfully')
        }






    }




    render() {

        return (

            <div className="container ">

                <div className="card col-md-4 rounded shadow mx-auto my-">
                    <div className="card-header">
                        <h2>Create Category</h2>
                    </div>



                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label  className="bmd-label-floating">Category Name</label>
                                <input type="text" className="form-control rounded" id="name"value={this.state.name} onChange={this.onchangeName}  required="required"></input>
                            </div>



                            <div className="form-group">
                                <label  className="bmd-label-floating">Upload Image</label>
                                <input type="file" className="form-control-file rounded" id="image" onChange={this.onchangeImage} required="required"></input>

                            </div>
                            <br/>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary  btn-raised col-md-12 rounded">Submit</button></div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default CreateCategory;