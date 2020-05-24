import React, {Component} from 'react';
import EditSubCategory from "./EditSubCategory";
import "../CSS/allSubcategories.css";
class SubcatItem extends Component {
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

                <td>{this.props.subCatItem.name}</td>
                <td><div className="subcatImg"><img src={this.props.subCatItem.url}/></div></td>
                <td>
                       <span className=" edit mx-2 text-primary" onClick={this.showModal} title={"Edit Subcategory"} style={{ cursor: "pointer" }}>
                            <i className="fa fa-pencil-square-o" ></i>
                        </span>


                </td>
                <td>
                        <span className=" dlt mx-2 text-danger" onClick={() => { this.props.deleteSubCategory(this.props.subCatItem._id) }} onMouseOver="this.style.color='red'" title={"Delete Subcategory"} style={{ cursor: "pointer" }}>
                            <i className="fas fa-trash" ></i>
                        </span>
                </td>
                <EditSubCategory showEditModal={this.state.showEditModal} onCloseModal={this.hideModal} subcategory={this.props.subCatItem}/>


            </tr>
        );
    }
}

export default SubcatItem;