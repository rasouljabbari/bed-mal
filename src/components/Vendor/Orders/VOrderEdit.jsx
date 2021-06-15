import React, {Component} from 'react';
import './orders.scss'
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import placeHolder_img from "../../../assets/image/bedmal-place-holder.jpg";
import Glass from "../../../assets/image/complete.png";
import OrderNoteImage from "../../../assets/image/Use borrow bags.jpg";
import {Modal} from "react-bootstrap";
import Swal from "sweetalert2";
import DeleteImg from '../../../assets/image/Icon ionic-md-remove-circle-outline.png'
class VOrderEdit extends Component {
    constructor(props) {
        super(props);
        this.myRef2 = React.createRef()
        this.state = {
            show_edit_borrow : false,
            search_value: '',
            number_edit_input: '',
            borrow_selected:'',
            show_remove: false
        }
    }

    componentDidMount() {
        setTitle('Order view')
    }

    handleMessage = (id) => {
        console.log(id)
    }

    handleCall = (id) => {
        console.log(id)
    }
    /**********************************************/
    // Lazy Load
    getDataOnScrolledBoards = async (obj) => {
        console.log(obj.target.offsetHeight + obj.target.scrollTop, obj.target.scrollHeight)
        return false
        // let offset = 0;
        // if (obj.target.offsetHeight + obj.target.scrollTop == obj.target.scrollHeight) {
        //     if (this.state.boards.length % 20 === 0 && this.state.isAllBoardsLoaded === true) {
        //         // this.setState({isboardsLoader: true});
        //         let moreData = await getData(MAIN_URL, `board?limit=20&offset=${this.state.boards.length}`, 'get',
        //             {
        //                 // search: this.state.search_value,
        //             }, true, true);
        //
        //         if (moreData) {
        //             this.setState(prevState => ({
        //                 items: {
        //                     ...prevState.items, ...moreData,
        //                     boards: this.state.boards.concat(moreData.items),
        //                 },
        //                 boards: this.state.boards.concat(moreData.items),
        //             }));
        //
        //             // console.log(moreData.boards.length);
        //
        //             if (moreData.boards?.length < 20) {
        //                 this.setState({isAllBoardsLoaded: false})
        //             }
        //         }
        //     }
        //
        // }
    }
    /**********************************************/

    acceptOrderHandler = async (id) => {
        console.log(id)
    }
    handleReject = async () => {
        this.props.history.push('/vendor/orders')
    }
    handleEdit = async (id) => {
        console.log(id)
    }

    handleSearchHandler = async (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        // let vendorItems = await getData(MAIN_URL, `admin/vendors?search=${e.target.value}`, 'get', {}, true, false);
        // if (vendorItems?.status === 200) {
        //     let default_item = vendorItems.items[0]
        //
        //     let vendorItem = await getData(MAIN_URL, `admin/vendors/info/${default_item?.id}`, 'get', {}, true, false);
        //     if (vendorItem?.status === 200) {
        //         this.setState({
        //             items: vendorItems.items,
        //             vendor_info: vendorItem.vendor,
        //             default_active: default_item.id
        //         })
        //     }
        // }
    }

    searchHandler = (e) => {
        e.preventDefault()
        console.log(this.state.search_value)
        // let vendorItems = await getData(MAIN_URL, `admin/vendors?search=${e.target.value}`, 'get', {}, true, false);
        // if (vendorItems?.status === 200) {
        //     let default_item = vendorItems.items[0]
        //
        //     let vendorItem = await getData(MAIN_URL, `admin/vendors/info/${default_item?.id}`, 'get', {}, true, false);
        //     if (vendorItem?.status === 200) {
        //         this.setState({
        //             items: vendorItems.items,
        //             vendor_info: vendorItem.vendor,
        //             default_active: default_item.id
        //         })
        //     }
        // }
    }

    handleEditBorrows = () => {
        this.setState({show_edit_borrow: true})
    }

    handleRadioInput = (e) => {
        this.setState({borrow_selected: e.target.value, number_edit_input: ''})
    }
    handleAfterRadioInput = (e) => {
        this.setState({borrow_selected: '', number_edit_input: e.target.value})
    }
    saveNumberBorrows = async (e) => {
        e.preventDefault();
        const {number_edit_input,borrow_selected} = this.state

        console.log(number_edit_input,borrow_selected)

        this.setState({show_edit_borrow: false})
    }

    handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log('main form')
        Swal.fire({
            icon: 'success',
            title: 'edited successfully',
        })

    }

    removeOrderNote = (id) => {
        console.log('remove ID : ' ,id)
    }

    removeReceipt = (id) => {
        console.log('remove ID : ' ,id)
        this.setState({show_remove: true})
    }
    handleYesRemove = async () => {
        this.setState({show_remove: false})
        Swal.fire({
            icon: 'success',
            title: 'removed successfully',
        })
    }
    closeModal = () => {
        this.setState({show_edit_borrow : false , show_remove: false})
    }

    render() {
        return (
            <div className="dv-vendor">
                <div className="dv-vendors-right-admin">
                    <form action="" className='mb-0' onSubmit={this.searchHandler} dir='ltr'>
                        <label htmlFor="dv-search" className='w-100 dv-vendor-search-label mb-0 position-relative'>
                            <input type="search" placeholder='search' onChange={this.handleSearchHandler}
                                   value={this.state.search_value} name='search_value' className='dv-search-input'
                                   id='dv-search'/>
                            <button type='submit' className='dv-search-icon'><i className='la la-search'/></button>
                        </label>
                    </form>
                    <ul>
                        <li className="dv-vendor-list-items-order d-flex pt-2 pb-1 px-4 mb-3">
                            <div className="dv-left-border"></div>
                            <div className="d-flex flex-column w-100 py-1 pl-4">
                                <h5>Luke Smith</h5>
                                <div className="d-flex justify-content-between">
                                    <h5>#200301LJS1</h5>
                                    <h5>£13.16</h5>
                                </div>
                            </div>
                        </li>
                        <li className="dv-vendor-list-items-order active d-flex pt-2 pb-1 px-4 mb-3">
                            <div className="dv-left-border"></div>
                            <div className="d-flex flex-column w-100 py-1 pl-4">
                                <h5>Luke Smith</h5>
                                <div className="d-flex justify-content-between">
                                    <h5>#200301LJS1</h5>
                                    <h5>£13.16</h5>
                                </div>
                            </div>
                        </li>
                        <li className="dv-vendor-list-items-order d-flex pt-2 pb-1 px-4 mb-3">
                            <div className="dv-left-border"></div>
                            <div className="d-flex flex-column w-100 py-1 pl-4">
                                <h5>Luke Smith</h5>
                                <div className="d-flex justify-content-between">
                                    <h5>#200301LJS1</h5>
                                    <h5>£13.16</h5>
                                </div>
                            </div>
                        </li>
                        <li className="dv-vendor-list-items-order d-flex pt-2 pb-1 px-4 mb-3">
                            <div className="dv-left-border-green"></div>
                            <div className="d-flex flex-column w-100 py-1 pl-4">
                                <h5>Luke Smith</h5>
                                <div className="d-flex justify-content-between">
                                    <h5>#200301LJS1</h5>
                                    <h5>£13.16</h5>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="dv-vorder-right-content">
                    <form onSubmit={this.handleSubmitForm} className="custom-height-right-items d-flex">
                        <div className="bg-custom-light bg-custom-light-1 d-flex flex-column align-items-start p-4">
                            <span className='dv-span-color'>#O210428TCSS1</span>
                            <p className='dv-p-name'>Sophie Smith</p>
                            <span className="dv-date-right mb-5">17.56 - 28/04/21</span>
                            <div className="d-flex align-items-center justify-content-start w-100 mb-5">
                                <button className='mx-1 dv-message' type='button' onClick={() => this.handleMessage('11')}>Messages
                                </button>
                                <button className='mx-1 dv-call' type='button' onClick={() => this.handleCall('11')}>Call</button>
                            </div>
                            <h2 className='mb-3 ml-2'>Delivery</h2>
                            <p className='dv-address-custom ml-2'>
                                32 Brondesbury Rd,
                                Brondesbury,
                                London,
                                MW4 6DU
                            </p>
                            <h4 className="dv-edit-color d-flex justify-content-center mx-auto" onClick={this.handleEditBorrows}>Tap to edit</h4>
                            <div className="dv-borrows d-flex justify-content-center">
                                <div className="d-flex pt-3 flex-column justify-content-start align-items-center mx-1">
                                    <div className="dv-circle d-flex justify-content-center align-items-center">0</div>
                                    <p className='mt-2 text-center dv-return-text'>sleeve</p>
                                </div>
                                <div className="d-flex pt-3 flex-column justify-content-start align-items-center mx-1">
                                    <div className="dv-circle d-flex justify-content-center align-items-center">3</div>
                                    <p className='mt-2 text-center dv-return-text'>cup</p>
                                </div>
                                <div className="d-flex pt-3 flex-column justify-content-start align-items-center mx-1">
                                    <div className="dv-circle d-flex justify-content-center align-items-center">0</div>
                                    <p className='mt-2 text-center dv-return-text'>lid</p>
                                </div>
                                <div className="d-flex pt-3 flex-column justify-content-start align-items-center mx-1">
                                    <div className="dv-circle d-flex justify-content-center align-items-center">2</div>
                                    <p className='mt-2 text-center dv-return-text'>bag</p>
                                </div>
                            </div>
                            <div className="dv-pending mt-3 mb-2">
                                PENDING
                            </div>
                            {/*<button className='dv-accept-order mb-3' onClick={() => this.acceptOrderHandler(1)}>Accept Order</button>*/}
                            <button className='mx-1 dv-editing mb-3' type='button'>Editing</button>
                            <div className="d-flex align-items-center justify-content-start w-100">
                                <button className='mx-1 dv-reject' type='button' onClick={() => this.handleReject()}>Back</button>
                                <button className='mx-1 dv-save' type='submit'>Save</button>
                            </div>
                        </div>
                        <div className="bg-custom-light bg-custom-light-2">
                            <div className="d-flex flex-column align-items-start p-4 dv-lazyLoad mb-3" ref={this.myRef2} onScroll={this.getDataOnScrolledBoards}>
                                <h2 className='dv-right-header mb-4'>RECEIPT DETAILS</h2>
                                <table className='dv-orders-list-table'>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className="d-flex flex-column align-items-start">
                                                <span className="dv-name-of-item mb-2">Espresso</span>
                                                <span className='dv-extra-item mb-2'>Extra Large</span>
                                                <span className='dv-extra-item mb-2'>Oat Milk</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="dv-img-glass-parent">
                                                <img
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${placeHolder_img}`
                                                    }}
                                                    src={Glass} alt="bed mal" className='img-fluid'/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column align-items-start">
                                                <span className="dv-name-of-item mb-2">£2.45</span>
                                                <span className='dv-extra-item mb-2'>£0.50</span>
                                            </div>
                                        </td>
                                        <td><img src={DeleteImg} className='dv-remove-receipt mt-4' onClick={()=>this.removeReceipt(1)} alt="Bedmal"/></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className="d-flex flex-column align-items-start">
                                                <span className="dv-name-of-item mb-2">Espresso</span>
                                                <span className='dv-extra-item mb-2'>Extra Large</span>
                                                <span className='dv-extra-item mb-2'>Oat Milk</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="dv-img-glass-parent">
                                                <img
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${placeHolder_img}`
                                                    }}
                                                    src={Glass} alt="bed mal" className='img-fluid'/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column align-items-start">
                                                <span className="dv-name-of-item mb-2">£2.45</span>
                                                <span className='dv-extra-item mb-2'>£0.50</span>
                                            </div>
                                        </td>
                                        <td><img src={DeleteImg} className='dv-remove-receipt mt-4' onClick={()=>this.removeReceipt(1)} alt="Bedmal"/></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className="d-flex flex-column align-items-start">
                                                <span className="dv-name-of-item mb-2">Espresso</span>
                                                <span className='dv-extra-item mb-2'>Extra Large</span>
                                            </div>
                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <div className="d-flex flex-column align-items-start">
                                                <span className="dv-name-of-item mb-2">£2.45</span>
                                                <span className='dv-extra-item mb-2'>£0.50</span>
                                            </div>
                                        </td>
                                        <td><img src={DeleteImg} className='dv-remove-receipt mt-4' onClick={()=>this.removeReceipt(1)} alt="Bedmal"/></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className="d-flex flex-column align-items-start">
                                                <span className="dv-name-of-item mb-2">Espresso</span>
                                                <span className='dv-extra-item mb-2'>Extra Large</span>
                                                <span className='dv-extra-item mb-2'>Oat Milk</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="dv-img-glass-parent">
                                                <img
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${placeHolder_img}`
                                                    }}
                                                    src={Glass} alt="bed mal" className='img-fluid'/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column align-items-start">
                                                <span className="dv-name-of-item mb-2">£2.45</span>
                                                <span className='dv-extra-item mb-2'>£0.50</span>
                                            </div>
                                        </td>
                                        <td><img src={DeleteImg} className='dv-remove-receipt mt-4' onClick={()=>this.removeReceipt(1)} alt="Bedmal"/></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className="d-flex flex-column align-items-start">
                                                <span className="dv-name-of-item mb-2">Espresso</span>
                                                <span className='dv-extra-item mb-2'>Extra Large</span>
                                                <span className='dv-extra-item mb-2'>Oat Milk</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="dv-img-glass-parent">
                                                <img
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${placeHolder_img}`
                                                    }}
                                                    src={Glass} alt="bed mal" className='img-fluid'/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column align-items-start">
                                                <span className="dv-name-of-item mb-2">£2.45</span>
                                                <span className='dv-extra-item mb-2'>£0.50</span>
                                            </div>
                                        </td>
                                        <td><img src={DeleteImg} className='dv-remove-receipt mt-4' onClick={()=>this.removeReceipt(1)} alt="Bedmal"/></td>
                                    </tr>
                                </table>
                            </div>
                            <div className="d-flex w-100 dv-bg-cc">
                                <div className="dv-order-note">
                                    <div className="d-flex">
                                        <div className="dv-img-order-note-parent position-relative">
                                            <img
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `${placeHolder_img}`
                                                }}
                                                src={OrderNoteImage} alt="bed mal" className='img-fluid'/>
                                            <img src={DeleteImg} className='img-fluid dv-remove-on-img' onClick={()=>this.removeOrderNote(1)} alt="Bedmal"/>
                                        </div>
                                        <div className="d-flex flex-column align-items-start">
                                            <h3 className='dv-order-note-title'>ORDER NOTE</h3>
                                            <p className='dv-order-note-text'>Please use no milk products.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dv-total">
                                    <div className="d-flex flex-column">
                                        <h3 className='mb-1'>Delivery</h3>
                                        <p className='mb-1'>Free</p>
                                        <h3 className='mb-1'>Total</h3>
                                        <p className='mb-1'>£39.65</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.show_edit_borrow}
                       onHide={this.closeModal}>
                    <Modal.Body className='p-3 pb-0'>
                        <button className='mr-3 dv-back-btn-order' type='button' onClick={this.closeModal}><i
                            className="las la-arrow-left"/></button>
                        <h2 className='mt-5'>How many BorrowBags used?</h2>
                        <form onSubmit={this.saveNumberBorrows} id='myForm' className='d-flex flex-column'>
                            <label className='my-4 d-flex flex-column align-items-center w-100'>
                                <div className="custom-radios2">
                                    <div>
                                        <input onChange={this.handleRadioInput} type="radio" id="color-1"
                                               name="option_count" value="1"
                                               className={this.state.borrow_selected == 1 ? 'dv-checked' : ''}/>
                                        <label htmlFor="color-1">
                                          <span>
                                            1
                                          </span>
                                        </label>
                                    </div>
                                    <div>
                                        <input onChange={this.handleRadioInput} type="radio" id="color-2"
                                               name="option_count" value="2"
                                               className={this.state.borrow_selected == 2 ? 'dv-checked' : ''}/>
                                        <label htmlFor="color-2">
                                          <span>
                                            2
                                          </span>
                                        </label>
                                    </div>
                                    <div>
                                        <input onChange={this.handleRadioInput} type="radio" id="color-3"
                                               name="option_count" value="3"
                                               className={this.state.borrow_selected == 3 ? 'dv-checked' : ''}/>
                                        <label htmlFor="color-3">
                                          <span>
                                            3
                                          </span>
                                        </label>
                                    </div>
                                    <div>
                                        <input onChange={this.handleRadioInput} type="radio" id="color-4"
                                               name="option_count" value="4"
                                               className={this.state.borrow_selected == 4 ? 'dv-checked' : ''}/>
                                        <label htmlFor="color-4">
                                          <span>
                                            4
                                          </span>
                                        </label>
                                    </div>
                                </div>
                                <div className='pl-3 pt-3 d-flex'>
                                    <input type="number" className='dv-number-input-edit mr-3 ml-5 w-50'
                                           placeholder='Other:'
                                           value={this.state.number_edit_input}
                                           name='number_edit_input' onChange={this.handleAfterRadioInput}/>
                                    <button type='submit' className='dv-btn-edit-number ml-1 mr-5'>Done</button>
                                </div>
                            </label>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.show_remove}
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
                                        onClick={this.handleYesRemove}>Yes
                                </button>
                            </div>

                        </div>

                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default VOrderEdit;