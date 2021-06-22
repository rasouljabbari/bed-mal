import React, {Component} from 'react';
import './orders.scss'
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import {Link} from "react-router-dom";
import placeHolder_img from "../../../assets/image/bedmal-place-holder.jpg";
import Glass from "../../../assets/image/complete.png";
import OrderNoteImage from "../../../assets/image/Use borrow bags.png";
import OrderNoteImageEmpty from "../../../assets/image/Use borrow bags.jpg";
import {Modal} from "react-bootstrap";
import {toast} from "react-toastify";

class VOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_issue_refund_modal: false, issue_refund_number: 1, note_issue_refund: '', refund_total: ''
        }
        this.myRef2 = React.createRef()
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
    handleReject = async (id) => {
        console.log(id)
    }
    handleEdit = async (id) => {
        // console.log(id)
        this.props.history.push({
            pathname: '/vendor/orders-edit',
            // state: { detail: [{name:'rasoul'} , {name:'Farzan'}] }
        })
    }

    IssueRefundModal = () => {
        this.setState({show_issue_refund_modal: true})
    }
    closeModal = () => {
        this.setState({show_issue_refund_modal: false})
    }
    onChangeCollection = (collection) => {
        if (collection == 0) {
            this.setState({collection: 1})
        } else {
            this.setState({collection: 0})
        }
    }
    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    saveIssueRefund = (e) => {
        e.preventDefault()
        this.setState({show_issue_refund_modal: false})
        toast.success('updated successfully')
    }

    render() {
        return (
            <>
                <div className=" dv-vendor">
                    <div className="dv-vendors-right-admin">
                        <div className="dv-btn-add-vendor d-flex justify-content-center my-2">
                            <Link to={`/admin/add-vendor`}
                                  className="dv-bg-new-vendor-override d-flex align-items-center justify-content-center">
                                <span>New vendor</span>
                                <i className='las la-plus dv-plus-icon pl-3'/>
                            </Link>
                        </div>
                        <form action="" className='mb-0' onSubmit={this.searchHandler} dir='ltr'>
                            <label htmlFor="dv-search" className='w-100 dv-vendor-search-label mb-0 position-relative'>
                                <input type="search" placeholder='search' onChange={this.handleSearchHandler}
                                       value='search' name='search_value' className='dv-search-input'
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
                        <div className="custom-height-right-items d-flex">
                            <div
                                className="bg-custom-light bg-custom-light-1 d-flex flex-column align-items-start px-2 py-4">
                                <span className='dv-span-color'>#O210428TCSS1</span>
                                <p className='dv-p-name'>Sophie Smith</p>
                                <span className="dv-date-right mb-5">17.56 - 28/04/21</span>
                                <div className="d-flex align-items-center justify-content-start w-100 mb-5">
                                    <button className='mx-1 dv-message'
                                            onClick={() => this.handleMessage('11')}>Messages
                                    </button>
                                    <button className='mx-1 dv-call' onClick={() => this.handleCall('11')}>Call</button>
                                </div>
                                {/*<h2 className='mb-3 ml-2'>Delivery</h2>*/}
                                {/*<p className='dv-address-custom ml-2'>*/}
                                {/*    32 Brondesbury Rd,*/}
                                {/*    Brondesbury,*/}
                                {/*    London,*/}
                                {/*    MW4 6DU*/}
                                {/*</p>*/}


                                {/*TODO Orders Page - Ready to collect*/}
                                {/*<h2 className='mb-3 ml-2'>Pick up</h2>*/}
                                {/*<p className='dv-address-custom ml-2'></p>*/}

                                {/*TODO Orders Page - Delivered*/}
                                <h2 className='mb-3 ml-2'>Delivery</h2>
                                <p className='dv-address-custom ml-2'>
                                    32 Brondesbury Rd,
                                    Brondesbury,
                                    London,
                                    MW4 6DU
                                </p>

                                {/*TODO Orders Page - with return and borrow bags permitted*/}
                                {/*<h4 className="dv-color pl-2">RETURNING BORROWS</h4>*/}
                                {/*<div className="dv-borrows d-flex justify-content-center">*/}
                                {/*    <div className="d-flex pt-3 flex-column justify-content-start align-items-center">*/}
                                {/*        <div className="dv-circle d-flex justify-content-center align-items-center">0</div>*/}
                                {/*         <p className='mt-2 text-center dv-return-text'>sleeve</p>*/}
                                {/*    </div>*/}
                                {/*    <div className="d-flex pt-3 flex-column justify-content-start align-items-center">*/}
                                {/*        <div className="dv-circle d-flex justify-content-center align-items-center">3</div>*/}
                                {/*        <p className='mt-2 text-center dv-return-text'>cup</p>*/}
                                {/*    </div>*/}
                                {/*    <div className="d-flex pt-3 flex-column justify-content-start align-items-center">*/}
                                {/*        <div className="dv-circle d-flex justify-content-center align-items-center">0</div>*/}
                                {/*        <p className='mt-2 text-center dv-return-text'>lid</p>*/}
                                {/*    </div>*/}
                                {/*    <div className="d-flex pt-3 flex-column justify-content-start align-items-center">*/}
                                {/*        <div className="dv-circle d-flex justify-content-center align-items-center">2</div>*/}
                                {/*        <p className='mt-2 text-center dv-return-text'>bag</p>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*TODO Orders Page - Collected*/}
                                <h4 className="dv-color pl-2">RETURNED</h4>
                                <div className="dv-black-borrows d-flex justify-content-center">
                                    <div className="d-flex pt-3 flex-column justify-content-start align-items-center">
                                        <div className="dv-circle d-flex justify-content-center align-items-center">0
                                        </div>
                                        <p className='mt-2 text-center dv-return-text'>sleeve</p>
                                    </div>
                                    <div className="d-flex pt-3 flex-column justify-content-start align-items-center">
                                        <div className="dv-circle d-flex justify-content-center align-items-center">3
                                        </div>
                                        <p className='mt-2 text-center dv-return-text'>cup</p>
                                    </div>
                                    <div className="d-flex pt-3 flex-column justify-content-start align-items-center">
                                        <div className="dv-circle d-flex justify-content-center align-items-center">0
                                        </div>
                                        <p className='mt-2 text-center dv-return-text'>lid</p>
                                    </div>
                                    <div className="d-flex pt-3 flex-column justify-content-start align-items-center">
                                        <div className="dv-circle d-flex justify-content-center align-items-center">2
                                        </div>
                                        <p className='mt-2 text-center dv-return-text'>bag</p>
                                    </div>
                                </div>

                                {/*TODO ACCEPT PAGE*/}
                                {/*<div className="dv-pending mt-3 mb-2">*/}
                                {/*    PENDING*/}
                                {/*</div>*/}
                                {/*<div className="dv-accepted mt-3 mb-2">*/}
                                {/*    Accepted*/}
                                {/*</div>*/}

                                {/*TODO Orders Page - On its way*/}
                                {/*<div className="dv-on-way mt-3 mb-2">*/}
                                {/*    On its Way*/}
                                {/*</div>*/}

                                {/*TODO Orders Page - Ready to collect*/}
                                {/*<div className="dv-on-way mt-3 mb-2">*/}
                                {/*    Ready to Pick-up*/}
                                {/*</div>*/}

                                {/*TODO Orders Page - Collected*/}
                                {/*<div className="px-3 w-100">*/}
                                {/*    <div className="dv-black-delivered mt-3 mb-2">*/}
                                {/*        Delivered*/}
                                {/*    </div>*/}
                                {/*    <div className='dv-date-black-delivered mt-3 mb-5'>13:17-01/02/2021</div>*/}
                                {/*    <button className='dv-reject w-100' onClick={() => this.handleReject('11')}>Issue refund</button>*/}
                                {/*</div>*/}

                                {/*TODO Orders Page - Delivered*/}
                                <div className="px-3 w-100">
                                    <div className="dv-black-delivered mb-2">
                                        Picked-up
                                    </div>
                                    <div className='dv-date-black-delivered mt-3 mb-1'>13:17-01/02/2021</div>
                                    <div className='dv-date-black-delivered mb-3'>
                                        <span>Trans ID:</span><span>PXY-123-4564-HVCH&237</span></div>
                                    <button className='dv-reject w-100' onClick={() => this.IssueRefundModal()}>Issue
                                        refund
                                    </button>
                                </div>

                                {/*<button className='dv-accept-order mb-3' onClick={() => this.acceptOrderHandler(1)}>Accept Order</button>*/}
                                {/*<button className='dv-accept-order mb-3' onClick={() => this.acceptOrderHandler(1)}>Now Ready ?</button>*/}

                                {/*TODO Orders Page - On its way*/}
                                {/*<button className='dv-accept-order mb-3' onClick={() => this.acceptOrderHandler(1)}>Delivered ?</button>*/}

                                {/*TODO Orders Page - Ready to collect*/}
                                {/*<button className='dv-accept-order mb-3' onClick={() => this.acceptOrderHandler(1)}>Picked-up ?</button>*/}


                                {/*<div className="d-flex align-items-center justify-content-start w-100">*/}
                                {/*    <button className='mx-1 dv-reject' onClick={() => this.handleReject('11')}>Reject*/}
                                {/*    </button>*/}
                                {/*    <button className='mx-1 dv-edit' onClick={() => this.handleEdit('11')}>Edit</button>*/}
                                {/*</div>*/}
                            </div>
                            <div className="bg-custom-light bg-custom-light-2">
                                <div className="d-flex flex-column align-items-start p-4 dv-lazyLoad mb-3"
                                     ref={this.myRef2} onScroll={this.getDataOnScrolledBoards}>
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
                                        </tr>
                                    </table>
                                </div>
                                <div className="d-flex w-100 dv-bg-cc">
                                    <div className="dv-order-note">
                                        <div className="d-flex">
                                            <div className="dv-img-order-note-parent position-relative">
                                                {/*<img*/}
                                                {/*    onError={(e) => {*/}
                                                {/*        e.target.onerror = null;*/}
                                                {/*        e.target.src = `${placeHolder_img}`*/}
                                                {/*    }}*/}
                                                {/*    src={OrderNoteImage} alt="bed mal" className='img-fluid'/>*/}

                                                {/*TODO Orders Page - On its way*/}
                                                <img
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${placeHolder_img}`
                                                    }}
                                                    src={OrderNoteImageEmpty} alt="bed mal" className='img-fluid'/>
                                                <div className="dv-note-number">4</div>
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
                        </div>

                    </div>
                </div>
                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.show_issue_refund_modal}
                       onHide={this.closeModal} className='dv-plan-modal dv-issue-refund-modal'>
                    <Modal.Body className='p-3 pb-0'>
                        <form onSubmit={this.saveIssueRefund} className='row'>
                            <div className="col-12 col-md-8 mb-3">
                                <div className="dv-bg-light-issue-refund-modal">
                                    <h6 className='dv-right-header text-left mb-4'>RECEIPT DETAILS</h6>
                                    <table className='dv-orders-list-table w-100'>
                                        <tr className='border-bottom-0 mb-3'>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th style={{color: '#969292'}}>Qty</th>
                                        </tr>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <div className="d-flex flex-column align-items-start">
                                                    <span className="dv-name-of-item">Espresso</span>
                                                    <span className='dv-extra-item'>Extra Large</span>
                                                    <span className='dv-extra-item'>Oat Milk</span>
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
                                                    <span className="dv-name-of-item ">£2.45</span>
                                                    <span className='dv-extra-item'>£0.50</span>
                                                </div>
                                            </td>
                                            <td
                                                className={'dv-checkbox-logins vertical-align-middle'}>
                                                <input
                                                    type="checkbox"
                                                    checked={this.state.collection}
                                                    onChange={() => this.onChangeCollection(this.state.collection)}
                                                />
                                            </td>
                                            <td className='vertical-align-middle'>
                                                <input type="number" className='dv-number-input-issue-refund-modal'
                                                       value={this.state.issue_refund_number}
                                                       name='issue_refund_number' onChange={this.inputHandler}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <div className="d-flex flex-column align-items-start">
                                                    <span className="dv-name-of-item">Espresso</span>
                                                    <span className='dv-extra-item'>Extra Large</span>
                                                    <span className='dv-extra-item'>Oat Milk</span>
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
                                                    <span className="dv-name-of-item ">£2.45</span>
                                                    <span className='dv-extra-item'>£0.50</span>
                                                </div>
                                            </td>
                                            <td
                                                className={'dv-checkbox-logins vertical-align-middle'}>
                                                <input
                                                    type="checkbox"
                                                    checked={this.state.collection}
                                                    onChange={() => this.onChangeCollection(this.state.collection)}
                                                />
                                            </td>
                                            <td className='vertical-align-middle'>
                                                <input type="number" className='dv-number-input-issue-refund-modal'
                                                       value={this.state.issue_refund_number}
                                                       name='issue_refund_number' onChange={this.inputHandler}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <div className="d-flex flex-column align-items-start">
                                                    <span className="dv-name-of-item">Espresso</span>
                                                    <span className='dv-extra-item'>Extra Large</span>
                                                    <span className='dv-extra-item'>Oat Milk</span>
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
                                                    <span className="dv-name-of-item ">£2.45</span>
                                                    <span className='dv-extra-item'>£0.50</span>
                                                </div>
                                            </td>
                                            <td
                                                className={'dv-checkbox-logins vertical-align-middle'}>
                                                <input
                                                    type="checkbox"
                                                    checked={this.state.collection}
                                                    onChange={() => this.onChangeCollection(this.state.collection)}
                                                />
                                            </td>
                                            <td className='vertical-align-middle'>
                                                <input type="number" className='dv-number-input-issue-refund-modal'
                                                       value={this.state.issue_refund_number}
                                                       name='issue_refund_number' onChange={this.inputHandler}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <div className="d-flex flex-column align-items-start">
                                                    <span className="dv-name-of-item">Espresso</span>
                                                    <span className='dv-extra-item'>Extra Large</span>
                                                    <span className='dv-extra-item'>Oat Milk</span>
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
                                                    <span className="dv-name-of-item ">£2.45</span>
                                                    <span className='dv-extra-item'>£0.50</span>
                                                </div>
                                            </td>
                                            <td
                                                className={'dv-checkbox-logins vertical-align-middle'}>
                                                <input
                                                    type="checkbox"
                                                    checked={this.state.collection}
                                                    onChange={() => this.onChangeCollection(this.state.collection)}
                                                />
                                            </td>
                                            <td className='vertical-align-middle'>
                                                <input type="number" className='dv-number-input-issue-refund-modal'
                                                       value={this.state.issue_refund_number}
                                                       name='issue_refund_number' onChange={this.inputHandler}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <div className="d-flex flex-column align-items-start">
                                                    <span className="dv-name-of-item">Espresso</span>
                                                    <span className='dv-extra-item'>Extra Large</span>
                                                    <span className='dv-extra-item'>Oat Milk</span>
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
                                                    <span className="dv-name-of-item ">£2.45</span>
                                                    <span className='dv-extra-item'>£0.50</span>
                                                </div>
                                            </td>
                                            <td
                                                className={'dv-checkbox-logins vertical-align-middle'}>
                                                <input
                                                    type="checkbox"
                                                    checked={this.state.collection}
                                                    onChange={() => this.onChangeCollection(this.state.collection)}
                                                />
                                            </td>
                                            <td className='vertical-align-middle'>
                                                <input type="number" className='dv-number-input-issue-refund-modal'
                                                       value={this.state.issue_refund_number}
                                                       name='issue_refund_number' onChange={this.inputHandler}/>
                                            </td>
                                        </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="dv-bg-light-issue-refund-modal text-left pb-5">
                                    <p>Select individual items
                                        to refund,
                                        or enter custom amount.</p>
                                    <textarea name="note_issue_refund" rows="7" onChange={this.inputHandler}
                                              className='dv-issue-refund-inputs w-100 mb-3' value={this.state.note_issue_refund} placeholder='Add note:'/>                                   <div className='position-relative'>
                                       <h5 className='text-dark'>Refund total</h5>
                                    <div className="dv-issue-refund-unit">£</div>
                                       <input type='number' name="refund_total" className='dv-issue-refund-inputs w-100 pl-4'
                                              onChange={this.inputHandler} value={this.state.refund_total} placeholder='5.40'/>

                                   </div>
                                </div>
                                <label className='mt-5 d-flex justify-content-end'>
                                    <button type='button' className='dv-issue-refund-cancel mr-1' onClick={this.closeModal}>Cancel</button>
                                    <button type='submit' className='dv-issue-refund-submit-btn ml-1'>Refund</button>
                                </label>

                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </>

        );
    }
}

export default VOrders;