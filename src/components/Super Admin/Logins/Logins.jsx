import React, {Component} from 'react';
import './logins.scss'
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {Modal} from "react-bootstrap";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import Swal from "sweetalert2";
import Pen from '../../../assets/image/Icon material-mode-edit.svg'

class Logins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new_login: false,edit_login: false,remove_show: false,isShow: false,is_confirm_show: false,isAllBoardsLoaded:true,
            vendor_name: '',vendor_email: '',vendor_password: '',vendor_confirm_password:'',vendor_username:'',
            vendor_type:'-1',vendor_id:'-1',
            logins:[],vendors:[]
        }
    }

    async componentDidMount() {
        setTitle('Logins')
        let loginsItems = await getData(MAIN_URL, `admin/logins?limit=100&offset=0`, 'get', {}, true, true);
        if (loginsItems?.status === 200) {
            let vendorsItems = await getData(MAIN_URL, `admin/vendors`, 'get', {}, true, true);
            this.setState({logins: loginsItems?.logins , vendors: vendorsItems.items})
        }
    }
    handleShow = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    handleConfirmShow = () => {
        this.setState({
            is_confirm_show: !this.state.is_confirm_show
        })
    }
    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    /********************** ADD ***********/
    addLogin = () => {
        this.setState({new_login: true,
            vendor_name: '',vendor_email: '',vendor_password: '',vendor_confirm_password:'',vendor_username:'',
            vendor_type:'-1',vendor_id:'-1',
        })
    }
    addSubmitForm = async (e) => {
        e.preventDefault()
        const {vendor_name,vendor_email,vendor_password,vendor_username,vendor_type,vendor_id,vendor_confirm_password} = this.state
        this.setState({new_login:false })
        let loginsItem = await getData(MAIN_URL, `admin/logins/create`, 'post', {
            username: vendor_username,
            name: vendor_name,
            email: vendor_email,
            password: vendor_password,
            password_confirmation: vendor_confirm_password,
            type: vendor_type,
            vendor_id: vendor_id
        }, true, true);
        if (loginsItem?.status === 200) {
            let logins_arr = this.state.logins;
            let newStatuses = [loginsItem.item].concat(logins_arr);
            this.setState({logins: newStatuses});
            Swal.fire({
                icon: 'success',
                title: 'created successfully',
            })
        }
    }
    /********************** ADD ***********/

    /********************** EDIT ***********/
    editLogins = (id) => {
        this.setState({selected_login: id , edit_login: true})
        let selected_item_for_edit = this.state.logins?.find((elem=> elem.id === id));
        this.setState({
            vendor_name:selected_item_for_edit.name,
            vendor_username:selected_item_for_edit.username,
            vendor_email:selected_item_for_edit.email,
            vendor_type:selected_item_for_edit.type,
            vendor_id:selected_item_for_edit.vendor_info_id,
        })
    }
    editSubmitForm = async (e) => {
        e.preventDefault()
        const {vendor_name,vendor_email,vendor_password,vendor_username,vendor_type,vendor_id,vendor_confirm_password} = this.state

        this.setState({edit_login:false})
        let loginsItem = await getData(MAIN_URL, `admin/logins/edit/${this.state.selected_login}`, 'post', {
            username: vendor_username,
            name: vendor_name,
            email: vendor_email,
            type: vendor_type,
            vendor_id: vendor_id
        }, true, true);
        if (loginsItem?.status === 200) {
            const updatedHeaders = this.state.logins.map((obj) => {
                return obj.id === loginsItem.item.id ? loginsItem.item : obj;
            });
            this.setState({
                logins: updatedHeaders,
            })
            Swal.fire({
                icon: 'success',
                title: 'edited successfully',
            })
        }
    }
    /********************** EDIT ***********/

    /********************** REMOVE ***********/
    removeLogins = (id) => {
        this.setState({remove_show: true , selected_login: id})
    }
    removeLoginsModal = () => {
        this.setState({remove_show: true})
    }
    changeRemoveShow = async () => {
        let arr = [];
        this.setState({remove_show: false , edit_login: false})
        let removeItem = await getData(MAIN_URL, `admin/logins/remove/${this.state.selected_login}`, 'post', {}, true, true);
        // console.log(items)
        if (removeItem?.status === 200) {
            this.state.logins.map((item) => {
                if(this.state.selected_login !== item.id){
                    arr.push(item)
                }
            })
            this.setState({logins: arr})
            Swal.fire({
                icon: 'success',
                title: 'removed successfully',
            })
        }
    }
    closeModalDelete = () => {
        this.setState({remove_show:false})
    }
    /********************** REMOVE ***********/
    closeModal = () => {
        this.setState({
            new_login: false,edit_login:false
        })
    }
    /**********************************************/
    // Lazy Load
    getDataOnScrolledBoards = async (obj) => {
        if (obj.target.offsetHeight + obj.target.scrollTop == obj.target.scrollHeight) {
            if (this.state.logins.length % 100 === 0 && this.state.isAllBoardsLoaded === true) {
                // this.setState({isboardsLoader: true});
                let moreData = await getData(MAIN_URL, `admin/logins??limit=100&offset=${this.state.logins.length}`, 'get',
                    {
                        // search: this.state.search_value,
                    }, true, true);

                if (moreData) {
                    this.setState(prevState => ({
                        items: {
                            ...prevState.items, ...moreData,
                            logins: this.state.logins.concat(moreData.logins),
                        },
                        logins: this.state.logins.concat(moreData.logins),
                    }));

                    // console.log(moreData.boards.length);

                    if (moreData.logins?.length < 100) {
                        this.setState({isAllBoardsLoaded: false})
                    }
                }
            }

        }
    }
    /**********************************************/

    render() {
        return (
            <>
                <div className='lazyLoad container-fluid'
                     onScroll={this.getDataOnScrolledBoards}>
                    <div className="row">
                        <div
                            className="col-12 my-2 d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <h2 className='dv-custom-pl'>Super Admin</h2>
                            <button className='dv-add-btn' onClick={this.addLogin}>Create login</button>
                        </div>
                        <div className="col-12">
                            <div className="bg-light dv-border-radius dv-box-shadow">
                                <div className="container py-5">
                                    <div className="row">
                                        <div className="col-12 mb-5">
                                            <h5 className='dv-logins-title'>Person</h5>
                                        </div>
                                        {
                                            this.state.logins?.map((item , i)=> (
                                                <div key={i} className="col-12 mb-5 d-flex align-items-center justify-content-between">
                                                    <h3 className='dv-logins-item-title'>{item.name}</h3>
                                                    <div className="d-flex align-items-center justify-content-around">
                                                        <img src={Pen} className='img-fluid dv-pen-icon pr-3' onClick={() => this.editLogins(item.id)} alt=""/>
                                                        <i className='las la-minus-circle dv-minus-icon pl-3'
                                                           onClick={() => this.removeLogins(item.id)}/>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.new_login}
                       onHide={this.closeModal}>
                    <Modal.Body className='pt-md-5 px-md-5'>
                        <form className="row justify-content-center" onSubmit={this.addSubmitForm}>
                            <div className="col-12 mb-4 d-flex dv-pr-custom flex-column">
                                <input type="text" placeholder='User name' value={this.state.vendor_username}
                                       onChange={this.inputHandler} name='vendor_username' className='dv-input mb-3' required={true}/>
                                <input type="text" placeholder='Name' value={this.state.vendor_name}
                                       onChange={this.inputHandler} name='vendor_name' className='dv-input mb-3' required={true}/>
                                <input type="email" placeholder='Email' value={this.state.vendor_email}
                                       onChange={this.inputHandler} name='vendor_email' className='dv-input mb-3' required={true}/>
                                <div className='position-relative'>
                                    {/*<i className='la la-eye dv-eye'/>*/}
                                    <i className={this.state.isShow ? 'la la-eye dv-eye' : "las la-eye-slash dv-eye"}
                                       onClick={this.handleShow}/>
                                    <input type={this.state.isShow ? 'text' : "password"} placeholder='Password'
                                           value={this.state.vendor_password} onChange={this.inputHandler}
                                           name='vendor_password' className='dv-input mb-3 w-100 pr-5'/>
                                </div>
                                <div className='position-relative'>
                                    {/*<i className='la la-eye dv-eye'/>*/}
                                    <i className={this.state.is_confirm_show ? 'la la-eye dv-eye' : "las la-eye-slash dv-eye"}
                                       onClick={this.handleConfirmShow}/>
                                    <input type={this.state.is_confirm_show ? 'text' : "password"} placeholder='Confirms Password'
                                           value={this.state.vendor_confirm_password} onChange={this.inputHandler}
                                           name='vendor_confirm_password' className='dv-input mb-3 w-100 pr-5'/>
                                </div>
                                <select required={true} name="vendor_type" defaultValue={this.state.vendor_type} className='dv-input mb-3' onChange={this.inputHandler}>
                                    <option value='-1' disabled={true} selected={true}>choose type</option>
                                    <option value='super_admin'>super admin</option>
                                    <option value='vendor_admin'>vendor admin</option>
                                    <option value='vendor_user'>vendor user</option>
                                </select>
                                {
                                    this.state.vendor_type === 'vendor_admin' || this.state.vendor_type === 'vendor_user' ?
                                    <select required={true} name="vendor_id" defaultValue={this.state.vendor_id} className='dv-input mb-3' onChange={this.inputHandler}>
                                        <option value='-1' disabled={true} selected={true}>choose vendor</option>
                                        {
                                            this.state.vendors?.map((item , i)=>(
                                                <option value={item.id} key={i}>{item.name}</option>
                                            ))
                                        }
                                    </select> : ''
                                }

                            </div>
                            <div
                                className='col-12 d-flex justify-content-end align-items-center'>
                                <button type='button' onClick={this.closeModal} className='dv-btn-cancel-modal px-5 mr-2'>Cancel
                                </button>
                                <button type='submit' className='dv-btn-save-modal px-5'>Save</button>
                            </div>
                        </form>

                    </Modal.Body>
                </Modal>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.edit_login}
                       onHide={this.closeModal}>
                    <Modal.Body className='pt-md-5 px-md-5'>
                        <form className="row justify-content-center" onSubmit={this.editSubmitForm}>
                            <div className="col-12 mb-4 d-flex dv-pr-custom flex-column">
                                <input type="text" placeholder='User name' value={this.state.vendor_username}
                                       onChange={this.inputHandler} name='vendor_username' className='dv-input mb-3' required={true}/>
                                <input type="text" placeholder='Name' value={this.state.vendor_name}
                                       onChange={this.inputHandler} name='vendor_name' className='dv-input mb-3' required={true}/>
                                <input type="email" placeholder='Email' value={this.state.vendor_email}
                                       onChange={this.inputHandler} name='vendor_email' className='dv-input mb-3' required={true}/>
                                {/*<div className='position-relative'>*/}
                                {/*    /!*<i className='la la-eye dv-eye'/>*!/*/}
                                {/*    <i className={this.state.isShow ? 'la la-eye dv-eye' : "las la-eye-slash dv-eye"}*/}
                                {/*       onClick={this.handleShow}/>*/}
                                {/*    <input type={this.state.isShow ? 'text' : "password"} placeholder='Password'*/}
                                {/*           value={this.state.vendor_password} onChange={this.inputHandler}*/}
                                {/*           name='vendor_password' className='dv-input mb-3 w-100 pr-5'/>*/}
                                {/*</div>*/}
                                {/*<div className='position-relative'>*/}
                                {/*    /!*<i className='la la-eye dv-eye'/>*!/*/}
                                {/*    <i className={this.state.is_confirm_show ? 'la la-eye dv-eye' : "las la-eye-slash dv-eye"}*/}
                                {/*       onClick={this.handleConfirmShow}/>*/}
                                {/*    <input type={this.state.is_confirm_show ? 'text' : "password"} placeholder='Confirms Password'*/}
                                {/*           value={this.state.vendor_confirm_password} onChange={this.inputHandler}*/}
                                {/*           name='vendor_confirm_password' className='dv-input mb-3 w-100 pr-5'/>*/}
                                {/*</div>*/}
                                <select required={true} name="vendor_type" defaultValue={this.state.vendor_type} className='dv-input mb-3' onChange={this.inputHandler}>
                                    {/*<option value='-1' disabled={true} selected={true}>choose type</option>*/}
                                    <option value='super_admin'>super admin</option>
                                    <option value='vendor_admin'>vendor admin</option>
                                    <option value='vendor_user'>vendor user</option>
                                </select>
                                {
                                    this.state.vendor_type === 'vendor_admin' || this.state.vendor_type === 'vendor_user' ?
                                        <select required={true} name="vendor_id" defaultValue={this.state.vendor_id} className='dv-input mb-3' onChange={this.inputHandler}>
                                            <option value='-1' disabled={true} selected={true}>choose vendor</option>
                                            {
                                                this.state.vendors?.map((item , i)=>(
                                                    <option value={item.id} key={i}>{item.name}</option>
                                                ))
                                            }
                                        </select> : ''
                                }
                            </div>
                            <div
                                className='col-12 d-flex justify-content-between flex-column flex-md-row align-items-center'>
                                <div>
                                    <button type='button' className='dv-btn-remove-modal'
                                            onClick={this.removeLoginsModal}>Delete login
                                    </button>
                                </div>
                                <div className="d-flex">
                                    <button type='button' onClick={this.closeModal}
                                            className='dv-btn-cancel-modal mr-2'>Cancel
                                    </button>
                                    <button type='submit' className='dv-btn-save-modal'>Save</button>
                                </div>
                            </div>
                        </form>

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
            </>
        );
    }
}

export default Logins;