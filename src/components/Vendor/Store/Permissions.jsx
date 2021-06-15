import React, {Component} from 'react';
import './store.scss';
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {NavLink} from "react-router-dom";
import {Nav, Modal} from "react-bootstrap";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import Menu from "./Menu";
import Pen from "../../../assets/image/Icon material-mode-edit.svg";
import Swal from "sweetalert2";

class Permissions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new_login: false,
            edit_login: false,
            remove_show: false,
            isShow: false,
            is_confirm_show: false,
            isAllBoardsLoaded: true,
            vendor_name: '',
            vendor_email: '',
            vendor_password: '',
            vendor_confirm_password: '',
            vendor_username: '',
            vendor_type: '-1',
            vendor_id: '-1',
            logins: [],
            permissions: [],
            selectedCheckboxes: [],
            permissions_item: []
        }
    }

    async componentDidMount() {
        setTitle('Store');
        let loginsItems = await getData(MAIN_URL, `vendor/logins?limit=100&offset=0`, 'get', {}, true, true);
        if (loginsItems?.status === 200) {
            let vendorsItems = await getData(MAIN_URL, `vendor/permissions`, 'get', {}, true, true);
            this.setState({logins: loginsItems?.logins, permissions: vendorsItems.permissions})
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
        this.setState({
            new_login: true,
            vendor_name: '',
            vendor_email: '',
            vendor_password: '',
            vendor_username: '',
            vendor_confirm_password: '',
        })
    }
    onChange = id => {
        const selectedCheckboxes = this.state.selectedCheckboxes;

        // Find index
        const findIdx = selectedCheckboxes.indexOf(id);

        if (findIdx > -1) {
            selectedCheckboxes.splice(findIdx, 1);
        } else {
            selectedCheckboxes.push(id);
        }

        this.setState({
            selectedCheckboxes: selectedCheckboxes,
            selectedId: id
        });
    };
    addSubmitForm = async (e) => {
        e.preventDefault()
        const {
            vendor_name,
            vendor_email,
            vendor_password,
            vendor_username,
            vendor_confirm_password,
            selectedCheckboxes

        } = this.state
        let loginsItem = await getData(MAIN_URL, `vendor/logins/create`, 'post', {
            username: vendor_username,
            name: vendor_name,
            email: vendor_email,
            password: vendor_password,
            password_confirmation: vendor_confirm_password,
            permissions: JSON.stringify(selectedCheckboxes),
        }, true, true);
        if (loginsItem?.status === 200) {
            let logins_arr = this.state.logins;
            let newStatuses = [loginsItem.item].concat(logins_arr);
            this.setState({logins: newStatuses, new_login: false});
            Swal.fire({
                icon: 'success',
                title: 'created successfully',
            })
        }
    }
    /********************** ADD ***********/

    /********************** EDIT ***********/
    editLogins = (id) => {
        this.setState({selected_login: id, edit_login: true})
        let selected_item_for_edit = this.state.logins?.find((elem => elem.id === id));
        let permissions = selected_item_for_edit?.vendor_user_permissions;
        let permissions_ids = [];
        permissions?.map((item) => {
            permissions_ids.push(item.id)
        })
        this.setState({
            vendor_name: selected_item_for_edit.name,
            vendor_username: selected_item_for_edit.username,
            vendor_email: selected_item_for_edit.email,
            selectedCheckboxes: permissions_ids
        })
    }
    editSubmitForm = async (e) => {
        e.preventDefault()
        const {
            vendor_name,
            vendor_email,
            vendor_password,
            vendor_username,
            selectedCheckboxes,
            vendor_confirm_password,
            selected_login
        } = this.state
        this.setState({edit_login: false})
        let loginsItem = await getData(MAIN_URL, `vendor/logins/edit/${selected_login}`, 'post', {
            username: vendor_username,
            name: vendor_name,
            email: vendor_email,
            password: vendor_password,
            password_confirmation: vendor_confirm_password,
            permissions: JSON.stringify(selectedCheckboxes),
        }, true, true);
        if (loginsItem?.status === 200) {
            const updatedHeaders = this.state.logins.map((obj) => {
                return obj.id === loginsItem.item.id ? loginsItem.item : obj;
            });
            this.setState({
                logins: updatedHeaders
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
        this.setState({remove_show: true, selected_login: id})
    }
    removeLoginsModal = () => {
        this.setState({remove_show: true})
    }
    changeRemoveShow = async () => {
        let arr = [];
        let removeItem = await getData(MAIN_URL, `vendor/logins/remove/${this.state.selected_login}`, 'post', {}, true, true);
        // console.log(items)
        if (removeItem?.status === 200) {
            this.state.logins.map((item) => {
                if (this.state.selected_login !== item.id) {
                    arr.push(item)
                }
            })
            this.setState({logins: arr, remove_show: false, edit_login: false})
            Swal.fire({
                icon: 'success',
                title: 'removed successfully',
            })
        }
    }
    closeModalDelete = () => {
        this.setState({remove_show: false})
    }
    /********************** REMOVE ***********/
    closeModal = () => {
        this.setState({
            new_login: false, edit_login: false
        })
    }
    /**********************************************/
    // Lazy Load
    getDataOnScrolledBoards = async (obj) => {
        if (obj.target.offsetHeight + obj.target.scrollTop == obj.target.scrollHeight) {
            if (this.state.logins.length % 100 === 0 && this.state.isAllBoardsLoaded === true) {
                // this.setState({isboardsLoader: true});
                let moreData = await getData(MAIN_URL, `vendor/logins?limit=100&offset=${this.state.logins.length}`, 'get',
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
        const {selectedCheckboxes} = this.state
        return (
            <div className='d-flex flex-column flex-xl-row dv-vendor overflow-hidden'>
                <div className="dv-vendors-right-admin dv-vendors-right-admin-2">
                    <Menu/>
                </div>
                <div className='lazyLoad dv-vendor-right-content dv-vendor-right-content-2 position-relative dv-remove-ml'
                     onScroll={this.getDataOnScrolledBoards}>
                    <div className="row">
                        <div
                            className="col-12 my-2 d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <h2 className='pl-md-5'>Permissions</h2>
                            <button className='dv-add-btn' onClick={this.addLogin}>Create login</button>
                        </div>
                        <div className="col-12">
                            <div className="bg-light dv-border-radius dv-box-shadow">
                                <div className="container py-5">
                                    {
                                        this.state.logins?.length !== 0 ?
                                            <table className="table dv-permission">
                                                <thead>
                                                <tr>
                                                    <th className="dv-logins-title"><h4>Person</h4></th>
                                                    <th className="dv-logins-title"><h4>Permission levels</h4></th>
                                                    <th></th>

                                                </tr>
                                                </thead>
                                                {
                                                    this.state.logins?.map((item, i) => (
                                                        <tbody key={i}>
                                                        <tr>
                                                            <td className='dv-logins-item-title'><h3>{item.name}</h3></td>
                                                            <td className='dv-logins-item-title'><h3>{
                                                                item.vendor_user_permissions?.map((row, i) => (
                                                                    <span className='px-1 dv-logins-title'
                                                                          key={i}>{row.name}
                                                                        {
                                                                            i === item.vendor_user_permissions?.length - 1 ? '' : ' ,'
                                                                        }
                                                                            </span>
                                                                ))
                                                            }
                                                            </h3>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center justify-content-around">
                                                                    <img src={Pen} className='img-fluid dv-pen-icon pr-3'  onClick={() => this.editLogins(item.id)} alt="bed mal"/>
                                                                    <i className='las la-minus-circle dv-minus-icon pl-3'
                                                                       onClick={() => this.removeLogins(item.id)}/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    ))
                                                }
                                            </table>
                                            // <div className="row">
                                            //     <div className="col-12 mb-5 d-flex align-items-center justify-content-between">
                                            //         <h5 className='dv-logins-title'>Person</h5>
                                            //         <h5 className='dv-logins-title'>Permission levels</h5>
                                            //         <h5 className='dv-logins-title'></h5>
                                            //     </div>
                                            //     {
                                            //         this.state.logins?.map((item, i) => (
                                            //             <div key={i}
                                            //                  className="col-12 mb-5 d-flex align-items-center justify-content-between">
                                            //                 <h3 className='dv-logins-item-title'>{item.name}</h3>
                                            //                 <h3 className='dv-logins-item-title'>{
                                            //                     item.vendor_user_permissions?.map((row, i) => (
                                            //                         <span className='px-1 dv-logins-title'
                                            //                               key={i}>{row.name}
                                            //                             {
                                            //                                 i === item.vendor_user_permissions?.length-1 ? '' : ' ,'
                                            //                             }
                                            //                 </span>
                                            //                     ))
                                            //                 }</h3>
                                            //                 <div className="d-flex align-items-center justify-content-around">
                                            //                     <img src={Pen} className='img-fluid dv-pen-icon pr-3'  onClick={() => this.editLogins(item.id)} alt="bed mal"/>
                                            //                     <i className='las la-minus-circle dv-minus-icon pl-3'
                                            //                        onClick={() => this.removeLogins(item.id)}/>
                                            //                 </div>
                                            //             </div>
                                            //         ))
                                            //     }
                                            //
                                            // </div>
                                            : <h1 className='text-center'>There is no item</h1>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal style={{textAlign: 'center'}} className='dv-modal' centered={true} show={this.state.new_login}
                       onHide={this.closeModal}>
                    <Modal.Body className='pt-md-5 px-md-5'>
                        <form className="row" onSubmit={this.addSubmitForm}>
                            <div className="col-12 mb-4 d-flex dv-pr-custom flex-column">
                                <input type="text" placeholder='User name' value={this.state.vendor_username}
                                       onChange={this.inputHandler} name='vendor_username' className='dv-input mb-3'
                                       required={true}/>
                                <input type="text" placeholder='Name' value={this.state.vendor_name}
                                       onChange={this.inputHandler} name='vendor_name' className='dv-input mb-3'
                                       required={true}/>
                                <input type="email" placeholder='Email' value={this.state.vendor_email}
                                       onChange={this.inputHandler} name='vendor_email' className='dv-input mb-3'
                                       required={true}/>
                                <div className='position-relative'>
                                    {/*<i className='la la-eye dv-eye'/>*/}
                                    <i className={this.state.isShow ? 'la la-eye dv-eye' : "las la-eye-slash dv-eye"}
                                       onClick={this.handleShow}/>
                                    <input type={this.state.isShow ? 'text' : "password"} placeholder='Password'
                                           value={this.state.vendor_password} onChange={this.inputHandler}
                                           name='vendor_password' className='dv-input mb-3 w-100 pr-5' required={true}/>
                                </div>
                                <div className='position-relative'>
                                    {/*<i className='la la-eye dv-eye'/>*/}
                                    <i className={this.state.is_confirm_show ? 'la la-eye dv-eye' : "las la-eye-slash dv-eye"}
                                       onClick={this.handleConfirmShow}/>
                                    <input type={this.state.is_confirm_show ? 'text' : "password"}
                                           placeholder='Confirms Password'
                                           value={this.state.vendor_confirm_password} onChange={this.inputHandler}
                                           name='vendor_confirm_password' className='dv-input mb-3 w-100 pr-5'
                                           required={true}/>
                                </div>
                                <div className={'dv-text-modal text-left pt-4 pb-2'}>Permissions</div>
                                {this.state.permissions?.map(checkbox => (
                                    <label
                                        className={'dv-checkbox-logins d-flex justify-content-between align-items-center'}
                                        key={checkbox.id}>
                                        <span>{checkbox.name}</span>
                                        <input
                                            type="checkbox"
                                            checked={selectedCheckboxes?.find(element => element === checkbox.id) ? true : false}
                                            onChange={() => this.onChange(checkbox.id)}
                                            selected={selectedCheckboxes?.includes(checkbox.id)}
                                        />
                                    </label>
                                ))}
                            </div>
                            <div
                                className='col-12 d-flex justify-content-end align-items-center'>
                                <button type='button' onClick={this.closeModal}
                                        className='dv-btn-cancel-modal px-5'>Cancel
                                </button>
                                <button type='submit' className='dv-btn-save-modal px-5'>Save</button>
                            </div>
                        </form>

                    </Modal.Body>
                </Modal>

                <Modal style={{textAlign: 'center'}} className='dv-modal' centered={true} show={this.state.edit_login}
                       onHide={this.closeModal}>
                    <Modal.Body className='pt-md-5 px-md-5'>
                        <form className="row justify-content-center" onSubmit={this.editSubmitForm}>
                            <div className="col-12 mb-4 d-flex dv-pr-custom flex-column">
                                <input type="text" placeholder='User name' value={this.state.vendor_username}
                                       onChange={this.inputHandler} name='vendor_username' className='dv-input mb-3'
                                       required={true}/>
                                <input type="text" placeholder='Name' value={this.state.vendor_name}
                                       onChange={this.inputHandler} name='vendor_name' className='dv-input mb-3'
                                       required={true}/>
                                <input type="email" placeholder='Email' value={this.state.vendor_email}
                                       onChange={this.inputHandler} name='vendor_email' className='dv-input mb-3'
                                       required={true}/>
                                <div className='position-relative'>
                                    {/*<i className='la la-eye dv-eye'/>*/}
                                    <i className={this.state.isShow ? 'la la-eye dv-eye' : "las la-eye-slash dv-eye"}
                                       onClick={this.handleShow}/>
                                    <input type={this.state.isShow ? 'text' : "password"} placeholder='Password'
                                           value={this.state.vendor_password} onChange={this.inputHandler}
                                           name='vendor_password' className='dv-input mb-3 w-100 pr-5' required={true}/>
                                </div>
                                <div className='position-relative'>
                                    {/*<i className='la la-eye dv-eye'/>*/}
                                    <i className={this.state.is_confirm_show ? 'la la-eye dv-eye' : "las la-eye-slash dv-eye"}
                                       onClick={this.handleConfirmShow}/>
                                    <input type={this.state.is_confirm_show ? 'text' : "password"}
                                           placeholder='Confirms Password'
                                           value={this.state.vendor_confirm_password} onChange={this.inputHandler}
                                           name='vendor_confirm_password' className='dv-input mb-3 w-100 pr-5'
                                           required={true}/>
                                </div>
                                <div className={'dv-text-modal text-left pt-4 pb-2'}>Permissions</div>
                                {this.state.permissions?.map(checkbox => (
                                    <label
                                        className={'dv-checkbox-logins d-flex justify-content-between align-items-center'}
                                        key={checkbox.id}>
                                        <span>{checkbox.name}</span>
                                        <input
                                            type="checkbox"
                                            checked={selectedCheckboxes?.find(element => element === checkbox.id) ? true : false}
                                            onChange={() => this.onChange(checkbox.id)}
                                            selected={selectedCheckboxes?.includes(checkbox.id)}
                                        />
                                    </label>
                                ))}
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
                                            className='dv-btn-cancel-modal'>Cancel
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

            </div>
        );
    }
}

export default Permissions;