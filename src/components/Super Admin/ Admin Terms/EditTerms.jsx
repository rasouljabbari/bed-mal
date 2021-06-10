import React, {Component} from 'react';
import './admin-terms.scss'
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {Col, Modal, Nav, Row, Tab} from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from "sweetalert2";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import Trash from "../../../assets/image/Icon material-delete.svg";


class EditTerms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddTerms: false,sureCancel:false,new_term_name:'Name',term_data:''
        }
    }

    newDoc = () => {
        this.props.history.push('/admin/add-terms')
    }
    editTerms = () => {
        this.setState({showAddTerms: true})
    }


    removeDepartment = (id) => {
        this.setState({show: true , removeSelectedId: id})
    }
    removeItemFromList = async () =>{
        // let arr = [];
        this.setState({show:false})
        // let removeItem = await getData(MAIN_URL, `admin/departments/remove/${this.state.removeSelectedId}`, 'get', {}, true, true);
        // // console.log(items)
        // if (removeItem?.status === 200) {
        //     this.state.items.map((item) => {
        //         if(this.state.removeSelectedId !== item.id){
        //             arr.push(item)
        //         }
        //     })
        //     this.setState({items: arr})
        // }
    }

    downDepartment = (id) => {
        console.log(id)
    }
    upDepartment = (id) => {
        console.log(id)
    }


    componentDidMount() {
        setTitle('Legals');
    }

    cancelHandler = () => {
        this.setState({sureCancel: true})
    }
    backToTerms = () =>{
        this.props.history.push('/admin/terms')
    }

    inputHandler = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    saveNewTermName = (e) =>{
        e.preventDefault()
        this.setState({showAddTerms: false})
    }

    addTextTerms = (e) =>{
        e.preventDefault();
        console.log(this.state.term_data)
        Swal.fire({
            icon: 'success',
            title: 'access denied',
            allowOutsideClick: false,
            // text: e.response.data.errors[0],
            text: 'An unwanted error occurred',
            // footer: '<a href="/profile">انتقال به صفحه پروفایل</Link>'
        })
    }

    closeModal = () => {
        this.setState({showAddTerms: false , sureCancel: false,show:false})
    }

    render() {
        return (
            <>
                <div className='d-flex flex-column flex-md-row'>
                    {/*<LeftSideBarTerms/>*/}
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col xl={3}>
                                <div className='dv-left-sidebar-terms dv-left-sidebar-message'>
                                    <div className="dv-btn-terms-parent-sidebar">
                                        <button onClick={this.newDoc} className='dv-btn-term-new-doc'>New doc</button>
                                    </div>
                                    <Nav variant="pills" className="flex-column dv-navbar-terms">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">
                                                <div
                                                    className='dv-list-items d-flex align-items-center justify-content-around'>
                                                    <span>Privacy Policy</span>
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
                                                </div>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">
                                                <div
                                                    className='dv-list-items d-flex align-items-center justify-content-around'>
                                                    <span>Privacy Policy</span>
                                                    <div className="d-flex align-items-center justify-content-end">
                                                        <i className="las la-arrow-down dv-terms-sidebar-icon"
                                                           onClick={() => this.downDepartment('down')}/>
                                                        <i className="las la-arrow-up dv-terms-sidebar-icon mx-2"
                                                           onClick={() => this.upDepartment('up')}/>
                                                        <div className='dv-terms-sidebar-icon'>
                                                            <img src={Trash} className='img-fluid' alt="bed mal" onClick={() => this.removeDepartment('trash')}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </Col>
                            <Col xl={9}>
                                <Tab.Content className="dv-right-content-terms dv-bg-message dv-right-content-message py-3">
                                    <Tab.Pane eventKey="first">
                                        <div className="row">
                                            <div
                                                className="col-12 d-flex flex-column flex-sm-row mb-3 px-md-4 justify-content-between align-items-center">
                                                <h1>Borrow Terms</h1>
                                                <button className='dv-terms-edit-btn' onClick={this.editTerms}>Edit</button>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <div className="dv-terms-content p-3 p-md-5">
                                                    <p>
                                                        1. All of our borrow products are free for 5 days.

                                                    </p>
                                                    <p>
                                                        2. Return to any partnering store on-time, in good condition.

                                                    </p>
                                                    <p>
                                                        3. Good condition, means in a reusable state or last use due to
                                                        wear and tear only. Damage is not wear and tear.
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <div className="row">
                                            <div
                                                className="col-12 d-flex flex-column flex-sm-row mb-3 px-md-4 justify-content-between align-items-center">
                                                <h1>Borrow Terms</h1>
                                                <button className='dv-terms-edit-btn' onClick={this.editTerms}>Edit</button>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <div className="dv-terms-content p-3 p-md-5">
                                                    <p>
                                                        1. All of our borrow products are free for 5 days.

                                                    </p>
                                                    <p>
                                                        2. Return to any partnering store on-time, in good condition.

                                                    </p>
                                                    <p>
                                                        3. Good condition, means in a reusable state or last use due to
                                                        wear and tear only. Damage is not wear and tear.
                                                    </p>
                                                    <p>
                                                        1. All of our borrow products are free for 5 days.

                                                    </p>
                                                    <p>
                                                        2. Return to any partnering store on-time, in good condition.

                                                    </p>
                                                    <p>
                                                        3. Good condition, means in a reusable state or last use due to
                                                        wear and tear only. Damage is not wear and tear.
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.showAddTerms}
                       onHide={this.closeModal} className='dv-plan-modal'>
                    <Modal.Body className='p-3 pb-0'>
                        <form onSubmit={this.saveNewTermName} className='d-flex flex-column'>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className='mb-0'>Edit name of term</h5>
                                <div className="d-flex">
                                    <button type='button' onClick={this.closeModal}
                                            className='dv-btn-plan-close mr-1'>Close
                                    </button>
                                    <button type='submit' className='dv-btn-plan-save ml-1'>Save</button>
                                </div>
                            </div>
                            <div className="mb-3 mt-5">
                                <input type='text' className="dv-input w-100" name='new_term_name'
                                       onChange={this.inputHandler} value={this.state.new_term_name}/>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.sureCancel}
                       onHide={this.closeModal}>
                    <Modal.Body className='p-5'>
                        <div className="row justify-content-center">
                            <div className="col-12 mb-4">
                                <h5 className='dv-h5'>Are you sure?</h5>
                            </div>
                            <div className=" mt-3 d-flex justify-content-center align-items-center">
                                <button className='dv-cancel-btn d-flex justify-content-center' type='button'
                                        onClick={this.closeModal}>No
                                </button>
                                <button className='dv-access-btn d-flex justify-content-center' type='button'
                                        onClick={this.backToTerms}>Yes
                                </button>
                            </div>

                        </div>

                    </Modal.Body>
                </Modal>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.show}
                       onHide={this.closeModal}>
                    <Modal.Body className='p-5'>
                        <div className="row justify-content-center">
                            <div className="col-12 mb-4">
                                <h5 className='dv-h5'>Are you sure ?</h5>
                            </div>
                            <div className="col-12 mt-3 d-flex justify-content-center align-items-center">
                                <button className='dv-cancel-btn d-flex justify-content-center' type='button' onClick={this.closeModal}>No</button>
                                <button className='dv-access-btn d-flex justify-content-center' type='button' onClick={this.removeItemFromList}>Yes</button>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default EditTerms;