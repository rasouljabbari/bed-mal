import React, {Component} from 'react';
import './admin-terms.scss'
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import {Col, Modal, Nav, Row, Tab} from "react-bootstrap";
import Trash from '../../../assets/image/Icon material-delete.svg'


class AdminTerms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    newDoc = () => {
        this.props.history.push('/admin/add-terms')
    }
    editTerms = () => {
        this.props.history.push('/admin/edit-terms')
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

    removeDepartment = async (id) => {
        this.setState({show: true, removeSelectedId: id})
    }
    removeItemFromList = async () => {
        // let arr = [];
        this.setState({show: false})
        // let removeItem = await getData(MAIN_URL, `admin/departments/remove/${this.state.removeSelectedId}`, 'get', {}, true, true);
        // // console.log(items)
        // if (removeItem?.status === 200) {
        //     this.state.items.map((item) => {
        //         if (this.state.removeSelectedId !== item.id) {
        //             arr.push(item)
        //         }
        //     })
        //     this.setState({items: arr})
        // }
    }
    closeModal = () => {
        this.setState({show: false})
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



                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.show}
                       onHide={this.closeModal}>
                    <Modal.Body className='p-5'>
                        <div className="row justify-content-center">
                            <div className="col-12 mb-4">
                                <h5 className='dv-h5'>Are you sure ?</h5>
                            </div>
                            <div className="col-12 mt-3 d-flex justify-content-center align-items-center">
                                <button className='dv-cancel-btn d-flex justify-content-center' type='button'
                                        onClick={this.closeModal}>No
                                </button>
                                <button className='dv-access-btn d-flex justify-content-center' type='button'
                                        onClick={this.removeItemFromList}>Yes
                                </button>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default AdminTerms;