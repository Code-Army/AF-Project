import React, {Component} from 'react';
import EditSubCategory from "./EditSubCategory";
import EditCategory from "./EditCategory";


class CatItem extends Component {
    constructor(props) {
        super(props);

        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);

        this.state = {
            showEditModal: false
        };
    }

    showModal() {
        this.setState({
            showEditModal: true
        })
    }

    hideModal() {
        this.setState({
            showEditModal: false
        })
    }

    render() {
        return (

                <tr>
                    <td>{this.props.catItem.name}</td>
                    <td><div className="subcatImg"><img src={this.props.catItem.url}/></div></td>

                    <td>
                        <span className=" edit mx-2 text-primary" onClick={this.showModal} title={"Edit Category"} style={{ cursor: "pointer" }}>
                            <i className="fa fa-pencil-square-o" ></i>
                        </span>


                    </td>
                    <td>
                        <span className=" dlt mx-2 text-danger" onClick={() => { this.props.deleteCategory(this.props.catItem._id); }} onMouseOver="this.style.color='red'" title={"Delete Category"} style={{ cursor: "pointer" }}>
                            <i className="fas fa-trash" ></i>
                        </span>
                    </td>
                    <EditCategory showEditModal={this.state.showEditModal} onCloseModal={this.hideModal} category={this.props.catItem}/>
                </tr>

        );
    }
}

export default CatItem;