import React, {Component} from 'react';
import './admin-terms.scss'
import Trash from "../../../assets/image/Icon material-delete.svg";
import {Link} from "react-router-dom";
import Pen from "../../../assets/image/Icon material-mode-edit.svg";
import {Modal} from "react-bootstrap";
import Swal from "sweetalert2";


class AddTerms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doc_name : '',isOpen: false, doc_description: ''
        }
    }

    editTerms = () => {
        this.props.history.push('/admin/edit-terms')
    }
    inputHandler = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    openAddTitle = () => {
        this.setState({isOpen : true})
    }

    closeModal = () => {
        this.setState({isOpen : false})
    }
    setDocName = (e) => {
        e.preventDefault();
        this.setState({isOpen: false})
        Swal.fire({
            icon: 'success',
            title: 'add name successfully',
        })
    }
    handleTextTerms = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'add name successfully',
        })
    }

    backToTerms = () => {
        this.props.history.push('/admin/terms')
    }

    render() {
        return (
            <>
                <div className='d-flex flex-column flex-xl-row dv-vendor'>
                    <div className="dv-terms-right-admin">
                        <div className="dv-btn-add-terms d-flex justify-content-center my-2">
                            <Link to={`#`}
                                  className="dv-btn-term-new-doc d-flex align-items-center justify-content-center">
                                <span>New doc</span>
                                <i className='las la-plus dv-plus-icon pl-3'/>
                            </Link>
                        </div>
                        <ul>
                            {/*{*/}
                            {/*    this.state.items.length !== 0 ?*/}
                            {/*        this.state.items?.map((item, i) => (*/}
                            {/*            <li key={i}*/}
                            {/*                className={this.state.default_active === item.id ? "active dv-vendor-list-items d-flex flex-column align-items-start" : "dv-vendor-list-items d-flex flex-column align-items-start"}*/}
                            {/*                onClick={() => this.vendorListItemHandler(item.id)}>*/}
                            {/*                <h5 className='dv-vendor-list-title'>{item.name}</h5>*/}
                            {/*                <h5 className='mb-0 dv-vendor-list-title-2'>{item.postal_code}</h5>*/}
                            {/*            </li>*/}
                            {/*        )) : ''*/}
                            {/*}*/}
                            <li className={"dv-list-items active dv-vendor-list-items d-flex justify-content-between align-items-center"}>
                                <h5 className='dv-vendor-list-title mb-0'>Privacy Policy</h5>
                                <div className="d-flex align-items-center justify-content-end">
                                    <i className="las la-arrow-down dv-terms-sidebar-icon"
                                       onClick={() => this.downDepartment('down')}/>
                                    <i className="las la-arrow-up dv-terms-sidebar-icon mx-2"
                                       onClick={() => this.upDepartment('up')}/>
                                    <div className='dv-terms-sidebar-icon'>
                                        <img src={Trash} className='img-fluid' alt="bed mal" onClick={() => this.removeDepartment('trash')}/>
                                    </div>
                                    {/*<i className="las la-trash dv-terms-sidebar-icon"*/}
                                    {/*   onClick={() => this.removeDepartment('trash')}/>*/}
                                </div>
                            </li>
                            <li className={"dv-list-items dv-vendor-list-items d-flex justify-content-between align-items-center"}>
                                <h5 className='dv-vendor-list-title mb-0'>Borrow Terms</h5>
                                <div className="d-flex align-items-center justify-content-end">
                                    <i className="las la-arrow-down dv-terms-sidebar-icon"
                                       onClick={() => this.downDepartment('down')}/>
                                    <i className="las la-arrow-up dv-terms-sidebar-icon mx-2"
                                       onClick={() => this.upDepartment('up')}/>
                                    <div className='dv-terms-sidebar-icon'>
                                        <img src={Trash} className='img-fluid' alt="bed mal" onClick={() => this.removeDepartment('trash')}/>
                                    </div>
                                </div>
                            </li>
                            <li className={"dv-list-items dv-vendor-list-items d-flex justify-content-between align-items-center"}>
                                <h5 className='dv-vendor-list-title mb-0'>Terms of Use</h5>
                                <div className="d-flex align-items-center justify-content-end">
                                    <i className="las la-arrow-down dv-terms-sidebar-icon"
                                       onClick={() => this.downDepartment('down')}/>
                                    <i className="las la-arrow-up dv-terms-sidebar-icon mx-2"
                                       onClick={() => this.upDepartment('up')}/>
                                    <div className='dv-terms-sidebar-icon'>
                                        <img src={Trash} className='img-fluid' alt="bed mal" onClick={() => this.removeDepartment('trash')}/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='dv-terms-right-content'>
                        <div className="row">
                            <div className="col-12 mb-4 d-flex justify-content-between px-4 px-md-5">
                                <div className="position-relative dv-title-doc" onClick={this.openAddTitle}>
                                    <input type="text" readOnly={true} placeholder='Name of doc' name='doc_name' value={this.state.doc_name}/>
                                    <img src={Pen} className='img-fluid dv-pen-icon' alt="bed mal"/>
                                </div>
                                <div>
                                    <button type='button' className='dv-cancel-terms mr-1' onClick={this.backToTerms}>Cancel</button>
                                    <button type='submit' className='dv-save-terms'>Save</button>
                                </div>
                            </div>
                            <div className="col-12 mb-4 d-flex justify-content-between px-4">
                                <div className="dv-bg-light-terms">
                                    <form onSubmit={this.handleTextTerms}>
                                        <textarea name="doc_description" value={this.state.doc_description} onChange={this.inputHandler} rows="20" className='dv-textarea-description'/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal style={{textAlign: 'center'}} className='dv-gray-modal' centered={true} show={this.state.isOpen}
                           onHide={this.closeModal}>
                        <Modal.Body>
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <form onSubmit={this.setDocName} className="mb-0 dv-inventory-form">
                                        <label className="mb-5 d-flex align-items-center w-100">
                                            <input type="text" name='doc_name' className='dv-input w-100' value={this.state.doc_name} onChange={this.inputHandler} placeholder='Name of doc'/>
                                        </label>
                                        <label className='col-12 mb-0 d-flex justify-content-end'>
                                            <button type='button' className='dv-inventory-cancel mr-1' onClick={this.closeModal}>Cancel</button>
                                            <button type='submit' className='dv-inventory-submit-btn ml-1'>Submit</button>
                                        </label>

                                    </form>
                                </div>

                            </div>

                        </Modal.Body>
                    </Modal>
                </div>
            </>
        );
    }
}

export default AddTerms;