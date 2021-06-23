import React, {Component} from 'react';
import './store.scss';
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import Menu from './Menu'
import Pen from "../../../assets/image/Icon material-mode-edit.svg";
import {Modal} from "react-bootstrap";
import Checkmark from '../../../assets/image/Icon ionic-ios-checkmark.svg'
import MetronNot from '../../../assets/image/Icon metro-not.svg'
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import Swal from "sweetalert2";

class Fulfillment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_fulfilment: '', edit_fulfilment: false,
            time: '', instructions: '', postcodes: '', cost: '',over_order:'',delivery_time:'',
        }
    }


    async componentDidMount() {
        setTitle('Store');
    }

    /********************** EDIT ***********/
    editFulfillment = (name) => {
        this.setState({selected_fulfilment: name, edit_fulfilment: true})
    }
    // editSubmitForm = async (e) => {
    //     e.preventDefault()
    //     const {
    //         vendor_name,
    //         vendor_email,
    //         vendor_password,
    //         vendor_username,
    //         selectedCheckboxes,
    //         vendor_confirm_password,
    //         selected_login
    //     } = this.state
    //     this.setState({edit_fulfilment: false})
    //     let loginsItem = await getData(MAIN_URL, `vendor/logins/edit/${selected_login}`, 'post', {
    //         username: vendor_username,
    //         name: vendor_name,
    //         email: vendor_email,
    //         password: vendor_password,
    //         password_confirmation: vendor_confirm_password,
    //         permissions: JSON.stringify(selectedCheckboxes),
    //     }, true, true);
    //     if (loginsItem?.status === 200) {
    //         const updatedHeaders = this.state.logins.map((obj) => {
    //             return obj.id === loginsItem.item.id ? loginsItem.item : obj;
    //         });
    //         this.setState({
    //             logins: updatedHeaders
    //         })
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'edited successfully',
    //         })
    //     }
    // }
    /********************** EDIT ***********/
    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    saveModal = async (e) => {
        e.preventDefault();
        console.log(this.state.selected_fulfilment)
        this.setState({selected_fulfilment: false})

        // let vendorItem = await getData(MAIN_URL, `admin/vendors/edit-details/${this.state.term_id}`, 'post', {
        //     notes: this.state.notes,
        // }, true, true);
        // if (vendorItem?.status === 200) {
        //     let vendorItems = await getData(MAIN_URL, `admin/vendors`, 'get', {}, true, true);
        //     if (vendorItems?.status === 200) {
        //
        //         let default_item = vendorItems.items[0]
        //
        //         let vendorItem = await getData(MAIN_URL, `admin/vendors/info/${default_item.id}`, 'get', {}, true, true);
        //         if (vendorItem?.status === 200) {
        //             this.setState({
        //                 items: vendorItems.items,
        //                 vendor_info: vendorItem.vendor,
        //                 default_active: default_item.id
        //             })
        //         }
        //
        //     }
        // }
    }

    removeLoginsModal = () => {
        this.setState({remove_show: true})
    }
    changeRemoveShow = async () => {
        // let arr = [];
        // let removeItem = await getData(MAIN_URL, `vendor/logins/remove/${this.state.selected_login}`, 'post', {}, true, true);
        // // console.log(items)
        // if (removeItem?.status === 200) {
        //     this.state.logins.map((item) => {
        //         if (this.state.selected_login !== item.id) {
        //             arr.push(item)
        //         }
        //     })
        this.setState({remove_show: false, selected_fulfilment: false})
        // this.setState({logins: arr, remove_show: false, edit_login: false})
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'removed successfully',
        //     })
        // }
    }
    closeModalDelete = () => {
        this.setState({remove_show: false})
    }

    closeModal = () => {
        this.setState({
            selected_fulfilment: false, remove_show: false
        })
    }

    render() {
        return (
            <div className='d-flex flex-column flex-xl-row dv-vendor'>
                <div className="dv-vendors-right-admin dv-vendors-right-admin-2">
                    <Menu/>
                </div>
                <div className='dv-vendor-right-content dv-vendor-right-content-2 position-relative mb-3'>
                    <h1>Fulfilment options</h1>

                    <table className="table dv-orders-table dv-fulfilment-table text-center">
                        <thead>
                        <tr>
                            <th className='text-left pl-5' scope="col">Options</th>
                            <th className='text-right' scope="col">Set</th>
                            <th scope="col">Created</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className='text-left pl-5'>Pick up</td>
                            <td className='text-right'><img src={Pen} className='img-fluid dv-pen-icon'
                                                            onClick={() => this.editFulfillment('Pick up')}
                                                            alt="bed mal"/></td>
                            <td><img src={MetronNot} className='img-fluid' alt="Bedmal"/></td>
                        </tr>
                        <tr>
                            <td className='text-left pl-5'>Local delivery</td>
                            <td className='text-right'><img src={Pen} className='img-fluid dv-pen-icon'
                                                            onClick={() => this.editFulfillment('Local delivery')}
                                                            alt="bed mal"/></td>
                            <td><img src={Checkmark} className='img-fluid' alt="Bedmal"/></td>
                        </tr>
                        <tr>
                            <td className='text-left pl-5'>Nationwide delivery</td>
                            <td className='text-right'><img src={Pen} className='img-fluid dv-pen-icon'
                                                            onClick={() => this.editFulfillment('Nationwide delivery')}
                                                            alt="bed mal"/></td>
                            <td><img src={MetronNot} className='img-fluid' alt="Bedmal"/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.selected_fulfilment}
                       onHide={this.closeModal} className='dv-plan-modal'>
                    <Modal.Body className='p-3 pb-0 pl-3 pl-md-5'>
                        {
                            this.state.selected_fulfilment === 'Pick up' ?
                                <form onSubmit={this.saveModal} id='myForm' className='d-flex flex-column'>
                                    <div className="dv-fulfilment-modal">
                                        <h5 className='mb-0 text-left py-4'>Pick up</h5>
                                        <div className='d-flex flex-column w-100 mb-5'>
                                            <label className='w-50 mb-3'>
                                                <p className='text-left mb-1'>Est. time</p>
                                                <input type="text" name='time' value={this.state.time}
                                                       onChange={this.inputHandler} placeholder='e.g up to 1hr'
                                                       className='dv-fulfilment-input'/>
                                            </label>
                                            <label className='w-100 mb-3'>
                                                <p className='text-left mb-1'>Instructions</p>
                                                <textarea rows='3' name='instructions' value={this.state.instructions}
                                                          onChange={this.inputHandler} placeholder='Please do not arrive before your order is ready.
                                                    Check store opening & address times.'
                                                          className='dv-fulfilment-input'/>
                                            </label>
                                            <div className="d-flex align-items-center dv-borrow-switch">

                                                <label className="switch">
                                                    <input type="checkbox"
                                                           value={0}
                                                           on={1}
                                                           off={0}
                                                           // checked={this.state.borrow_value === 1 ? true : false}
                                                           onChange={() => this.HandlerChangeStatusBorrow(this.state.borrow_value, this.state.product_id)}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>

                                                <div className='pl-2 dv-switch-text'>Can users return Borrow
                                                    Products? <span> (Mandatory)</span></div>
                                            </div>
                                            <div className="d-flex align-items-center dv-borrow-switch">
                                                <label className="switch">
                                                    <input type="checkbox"
                                                           value={0}
                                                           on={1}
                                                           off={0}
                                                        // checked={this.state.borrow_value === 1 ? true : false}
                                                           onChange={() => this.HandlerChangeStatusBorrow(this.state.borrow_value, this.state.product_id)}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>

                                                <div className='pl-2 dv-switch-text'>Can users have their items packed
                                                    in BorrowBags?
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className='d-flex justify-content-between align-items-center'>
                                            <div>
                                                <button type='button' className='dv-btn-remove-modal'
                                                        onClick={this.removeLoginsModal}>Delete
                                                </button>
                                            </div>
                                            <div className="d-flex">
                                                <button type='button' onClick={this.closeModal}
                                                        className='dv-btn-cancel-modal mr-2'>Cancel
                                                </button>
                                                <button type='submit' className='dv-btn-save-modal'>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form> : this.state.selected_fulfilment === 'Local delivery' ?
                                <form onSubmit={this.saveModal} id='myForm' className='d-flex flex-column'>
                                    <div className="dv-fulfilment-modal">
                                        <h5 className='mb-0 text-left py-4'>Local delivery</h5>
                                        <div className='d-flex flex-column w-100 mb-5'>
                                            <label className='w-100 mb-5'>
                                                <p className='text-left mb-1'>Set postcodes (separate with a comma)</p>
                                                <input type="text" name='postcodes' value={this.state.postcodes}
                                                       onChange={this.inputHandler} placeholder='e.g NW3, NW5, N8, N6'
                                                       className='dv-fulfilment-input'/>
                                            </label>
                                            <div className="d-flex w-100">
                                                <label className='w-50 mb-3 mr-3'>
                                                    <p className='text-left mb-1'>Est. delivery time</p>
                                                    <input type="text" name='time' value={this.state.time}
                                                           onChange={this.inputHandler} placeholder='e.g 1hr, 2 days'
                                                           className='dv-fulfilment-input'/>
                                                </label>
                                                <label className='w-30 mb-3'>
                                                    <p className='text-left mb-1'>Cost</p>
                                                    <div className='position-relative'>
                                                        <div className="dv-custom-unit dv-fulfilment-unit">£</div>
                                                        <input type="number" name='cost' value={this.state.cost}
                                                               onChange={this.inputHandler}
                                                               className='dv-fulfilment-input pl-4'/>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className="d-flex align-items-center dv-borrow-switch mb-4">

                                                <label className="switch">
                                                    <input type="checkbox"
                                                           value={0}
                                                           on={1}
                                                           off={0}
                                                        // checked={this.state.borrow_value === 1 ? true : false}
                                                           onChange={() => this.HandlerChangeStatusBorrow(this.state.borrow_value, this.state.product_id)}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>

                                                <div className="d-flex flex-column">
                                                    <div className='pl-2 dv-switch-text text-left'>Free for orders over</div>
                                                    <div className='pl-2 position-relative'>
                                                        <div className="dv-custom-unit dv-fulfilment-unit2">£</div>
                                                        <input type="number" name='over_order' value={this.state.over_order}
                                                               onChange={this.inputHandler}
                                                               className='dv-fulfilment-input pl-3'/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center dv-borrow-switch mb-3">
                                                <label className="switch">
                                                    <input type="checkbox"
                                                           value={0}
                                                           on={1}
                                                           off={0}
                                                        // checked={this.state.borrow_value === 1 ? true : false}
                                                           onChange={() => this.HandlerChangeStatusBorrow(this.state.borrow_value, this.state.product_id)}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                                <div className='pl-2 dv-switch-text'>Can users return Borrow Products?</div>
                                            </div>
                                            <div className="d-flex align-items-center dv-borrow-switch">
                                                <label className="switch">
                                                    <input type="checkbox"
                                                           value={0}
                                                           on={1}
                                                           off={0}
                                                        // checked={this.state.borrow_value === 1 ? true : false}
                                                           onChange={() => this.HandlerChangeStatusBorrow(this.state.borrow_value, this.state.product_id)}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                                <div className='pl-2 dv-switch-text'>Can users have their items packed in BorrowBags?</div>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div>
                                                <button type='button' className='dv-btn-remove-modal'
                                                        onClick={this.removeLoginsModal}>Delete
                                                </button>
                                            </div>
                                            <div className="d-flex">
                                                <button type='button' onClick={this.closeModal}
                                                        className='dv-btn-cancel-modal mr-2'>Cancel
                                                </button>
                                                <button type='submit' className='dv-btn-save-modal'>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form> :
                                <form onSubmit={this.saveModal} id='myForm' className='d-flex flex-column'>
                                    <div className="dv-fulfilment-modal">
                                        <h5 className='mb-0 text-left py-4'>Nationwide delivery</h5>
                                        <div className='d-flex flex-column w-100 mb-5'>
                                            <label className='w-100 mb-5'>
                                                <p className='text-left mb-1'>Set postcodes (separate with a comma)</p>
                                                <input type="text" name='postcodes' value={this.state.postcodes}
                                                       onChange={this.inputHandler} placeholder='e.g NW3, NW5, N8, N6'
                                                       className='dv-fulfilment-input'/>
                                            </label>
                                            <div className="d-flex w-100">
                                                <label className='w-50 mb-3 mr-3'>
                                                    <p className='text-left mb-1'>Est. delivery time</p>
                                                    <input type="text" name='time' value={this.state.time}
                                                           onChange={this.inputHandler} placeholder='e.g 1hr, 2 days'
                                                           className='dv-fulfilment-input'/>
                                                </label>
                                                <label className='w-30 mb-3'>
                                                    <p className='text-left mb-1'>Cost</p>
                                                    <div className='position-relative'>
                                                        <div className="dv-custom-unit dv-fulfilment-unit">£</div>
                                                        <input type="number" name='cost' value={this.state.cost}
                                                               onChange={this.inputHandler}
                                                               className='dv-fulfilment-input pl-4'/>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className="d-flex align-items-center dv-borrow-switch mb-4">
                                                <label className="switch">
                                                    <input type="checkbox"
                                                           value={0}
                                                           on={1}
                                                           off={0}
                                                        // checked={this.state.borrow_value === 1 ? true : false}
                                                           onChange={() => this.HandlerChangeStatusBorrow(this.state.borrow_value, this.state.product_id)}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                                <div className="d-flex flex-column">
                                                    <div className='pl-2 dv-switch-text text-left'>Free for orders over</div>
                                                    <div className='pl-2 position-relative'>
                                                        <div className="dv-custom-unit dv-fulfilment-unit2">£</div>
                                                        <input type="number" name='over_order' value={this.state.over_order}
                                                               onChange={this.inputHandler}
                                                               className='dv-fulfilment-input pl-3'/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center dv-borrow-switch mb-3">
                                                <label className="switch">
                                                    <input type="checkbox"
                                                           value={0}
                                                           on={1}
                                                           off={0}
                                                        // checked={this.state.borrow_value === 1 ? true : false}
                                                           onChange={() => this.HandlerChangeStatusBorrow(this.state.borrow_value, this.state.product_id)}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                                <div className='pl-2 dv-switch-text'>Can users return Borrow Products?</div>
                                            </div>
                                            <div className="d-flex align-items-center dv-borrow-switch">
                                                <label className="switch">
                                                    <input type="checkbox"
                                                           value={0}
                                                           on={1}
                                                           off={0}
                                                        // checked={this.state.borrow_value === 1 ? true : false}
                                                           onChange={() => this.HandlerChangeStatusBorrow(this.state.borrow_value, this.state.product_id)}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                                <div className='pl-2 dv-switch-text'>Can users have their items packed in BorrowBags?</div>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div>
                                                <button type='button' className='dv-btn-remove-modal'
                                                        onClick={this.removeLoginsModal}>Delete
                                                </button>
                                            </div>
                                            <div className="d-flex">
                                                <button type='button' onClick={this.closeModal}
                                                        className='dv-btn-cancel-modal mr-2'>Cancel
                                                </button>
                                                <button type='submit' className='dv-btn-save-modal'>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                        }

                    </Modal.Body>
                </Modal>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.remove_show}
                       onHide={this.closeModal}>
                    <Modal.Body className='p-5'>
                        <div className="row justify-content-center">
                            <div className="col-12 mb-4">
                                <h5 className='dv-h5'>Are you sure ?</h5>
                            </div>
                            <div className="col-12 mt-3 d-flex justify-content-center align-items-center">
                                <button className='dv-cancel-btn d-flex justify-content-center' type='button'
                                        onClick={this.closeModalDelete}>No
                                </button>
                                <button className='dv-access-btn d-flex justify-content-center' type='button'
                                        onClick={this.changeRemoveShow}>Yes
                                </button>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>

            </div>
        );
    }
}

export default Fulfillment;