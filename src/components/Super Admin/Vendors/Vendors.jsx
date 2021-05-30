import React, {Component} from 'react';
import './vendors.scss'
import {Link} from "react-router-dom";
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import Glass from '../../../assets/image/complete.png'
import Switch from 'react-input-switch';
import Swal from "sweetalert2";
import {Modal} from "react-bootstrap";

class Vendors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_value: '',
            showPlan: false,
            market_place_price:'',market_place_price_fee:'',borrow_cup_per_unit_price:'',borrow_bag_per_unit_price:'',
            od_borrow_cup_per_unit_price:'',od_borrow_bag_per_unit_price:''
        }
    }

    componentDidMount() {
        setTitle('Vendors')
    }

    vendorListItemHandler = (id) => {
        console.log(id)
    }
    handleMessage = (id) => {
        console.log(id)
    }

    handleCall = (id) => {
        console.log(id)
    }
    editVendorOverride = (id) => {
        console.log(id)
    }

    SuspendHandler = (id) => {
        console.log(id)
    }
    /******************************************************/
    //Change Status
    HandlerChangeStatus = async (e, id) => {
        // const list = await getData(MAIN_URL, `team/change-status/${id}`, 'post', {
        //     status: e
        // }, true, true);
        //
        // if(list?.status === 200){
        //     this.setState({switchId:id , switchValue: list.team.status})
        //
        //     let data = await getData(MAIN_URL, `team?limit=20&offset=0`, 'get', {}, true, true);
        //
        //     if (list?.status === 200) {
        //         this.setState({
        //             teams: data.items,
        //             users: data.users
        //         })
        //         Swal.fire({
        //             title: 'با موفقیت تغییر کرد',
        //             icon: 'success',
        //         })
        //     }
        // }

    };
    /**********************************************/

    editPlans = () => {
        this.setState({showPlan: true})
    }

    inputHandler = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    savePlanModal = (e) => {
        e.preventDefault()
    }

    closeModal = () => {
        this.setState({showPlan: false})
    }


    render() {
        return (
            <div className='d-flex flex-column flex-md-row dv-vendor'>
                <div className="dv-vendors-right-admin">
                    <form action="" className='mb-0' onSubmit={this.searchHandler} dir='ltr'>
                        <label htmlFor="dv-search" className='w-100 dv-vendor-search-label mb-0 position-relative'>
                            <input type="search" placeholder='search' onChange={this.handleInput}
                                   value={this.state.search_value} name='search_value' className='dv-search-input'
                                   id='dv-search'/>
                            <button type='submit' className='dv-search-icon'><i className='la la-search'/></button>
                        </label>
                    </form>
                    <ul>
                        <li className="dv-vendor-list-items active d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(1)}>
                            <h5 className='dv-vendor-list-title'>Starbucks</h5>
                            <h5 className='mb-0 dv-vendor-list-title-2'>NW3 4DU</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(2)}>
                            <h5 className='dv-vendor-list-title'>Starbucks</h5>
                            <h5 className='mb-0 dv-vendor-list-title-2'>NW3 4DU</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(3)}>
                            <h5 className='dv-vendor-list-title'>Starbucks</h5>
                            <h5 className='mb-0 dv-vendor-list-title-2'>NW3 4DU</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(4)}>
                            <h5 className='dv-vendor-list-title'>Starbucks</h5>
                            <h5 className='mb-0 dv-vendor-list-title-2'>NW3 4DU</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(1)}>
                            <h5 className='dv-vendor-list-title'>Starbucks</h5>
                            <h5 className='mb-0 dv-vendor-list-title-2'>NW3 4DU</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(1)}>
                            <h5 className='dv-vendor-list-title'>Starbucks</h5>
                            <h5 className='mb-0 dv-vendor-list-title-2'>NW3 4DU</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(1)}>
                            <h5 className='dv-vendor-list-title'>Starbucks</h5>
                            <h5 className='mb-0 dv-vendor-list-title-2'>NW3 4DU</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(1)}>
                            <h5 className='dv-vendor-list-title'>Starbucks</h5>
                            <h5 className='mb-0 dv-vendor-list-title-2'>NW3 4DU</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(1)}>
                            <h5 className='dv-vendor-list-title'>test</h5>
                            <h5 className='mb-0 dv-vendor-list-title-2'>NW3 4DU</h5>
                        </li>
                    </ul>
                </div>
                <div className='dv-vendor-right-content'>
                    {/*<div className='dv-vendor-right-content dv-suspended'>*/}
                    {/*<div className='dv-vendor-right-content dv-pending-approval'>*/}
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="dv-bg-light-vendors">
                                <div className="row">
                                    <div className="col-12 col-lg-6 mb-3 mb-lg-3">
                                        <div className='d-flex flex-column'>
                                            <h6>Starbucks of Belsize Park</h6>
                                            <h6>32 Brondesbury Rd,</h6>
                                            <h6>Brondesbury,</h6>
                                            <h6>London,</h6>
                                            <h6>MW4 6DU</h6>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6 mb-3 mb-lg-3">
                                        <h6 className='mb-2'><span>Main contact: </span><span>Mary Magdeline</span></h6>
                                        <h6 className='mb-2'><span>Email: </span><span>tracey@starbucks.co.uk</span>
                                        </h6>
                                        <h6 className='mb-2'><span>Coordinates: </span><span>x-1234 y-1234</span></h6>
                                        <div className="d-flex justify-content-start mt-3">
                                            <button className='dv-blue-btn mr-1'
                                                    onClick={() => this.handleMessage('10')}>Message
                                            </button>
                                            <button className='dv-white-btn ml-1'
                                                    onClick={() => this.handleCall('0')}>Call
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 pr-lg-2 mb-3">
                            <div className="dv-bg-light-vendors pb-3 mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5>Plan Terms</h5>
                                    <button className='dv-vendor-edit-btn' onClick={this.editPlans}>Edit</button>
                                </div>
                                <div className="d-flex flex-column ">
                                    <div
                                        className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                        <p className='mb-0'>Marketplace per transaction</p>
                                        <div className="dv-vendor-price">£0.20</div>
                                    </div>
                                    <div
                                        className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                        <p className='mb-0'>Marketplace fee</p>
                                        <div className="dv-vendor-price">1.99 %</div>
                                    </div>
                                    <div
                                        className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                        <p className='mb-0'>MP - BorrowCup per unit</p>
                                        <div className="dv-vendor-price">£0.20</div>
                                    </div>
                                    <div className="d-flex justify-content-between dv-light-gray-text align-items-start mb-3">
                                        <div className='d-flex flex-column'>
                                            <p className='mb-0'>MP - BorrowBag per unit</p>
                                            <div className='dv-span-gray'>On-demand charges</div>
                                        </div>
                                        <div className="dv-vendor-price">£0.20</div>
                                    </div>
                                    <div
                                        className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                        <p className='mb-0'>OD - BorrowCup per unit</p>
                                        <div className="dv-vendor-price">£0.20</div>
                                    </div>
                                    <div
                                        className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                        <p className='mb-0'>OD - BorrowCup per unit</p>
                                        <div className="dv-vendor-price">£0.20</div>
                                    </div>
                                </div>
                            </div>
                            <div className="dv-bg-light-vendors mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className='mb-0'>Store descriptor</h5>
                                </div>
                                <div
                                    className="d-flex justify-content-start flex-wrap dv-light-gray-text align-items-center">
                                    <div className="dv-blue-badge mb-2 mr-2">Coffee shop</div>
                                    <div className="dv-blue-badge mb-2 mr-2">Garden centre</div>
                                    <div className="dv-blue-badge mb-2 mr-2">DIY</div>
                                </div>
                            </div>
                            <div className="dv-bg-light-vendor-override pb-3 mb-3">
                                <h5 className='dv-vendor-override-h6'>Vendor Override</h5>
                                <div
                                    className="d-flex justify-content-between flex-wrap dv-light-gray-text align-items-center">
                                    <div className="d-flex">
                                        <div className="dv-vendor-override-circle mr-2"></div>
                                        {/*<div className="dv-in-active-override-circle mr-2"></div>*/}

                                        <h6 className='dv-vendor-override-active mb-0'>Active</h6>
                                        {/*<h6 className='dv-vendor-override-in-active mb-0'>Inactive</h6>*/}
                                    </div>
                                    <Link to={'/admin/edit-overide'} className="dv-bg-edit-vendor-override"
                                            onClick={this.editVendorOverride}>Edit
                                    </Link>

                                    <button className="dv-bg-suspend-vendor-override"
                                            onClick={this.SuspendHandler}>Suspend
                                    </button>
                                    {/*<button className="dv-bg-suspend-vendor-override dv-bg-approve-vendor-override" onClick={this.SuspendHandler}>Reactivate</button>*/}
                                    {/*<button className="dv-bg-suspend-vendor-override dv-bg-approve-vendor-override" onClick={this.SuspendHandler}>Approve</button>*/}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 pl-lg-2 mb-3">
                            <div className="dv-bg-light-vendors pb-2 mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className='mb-0'>Borrow Partner</h5>
                                </div>
                                <div className="dv-swiper-parent-bg mb-3">
                                    <div
                                        className="d-flex justify-content-around dv-light-gray-text align-items-center">
                                        <div className="dv-borrow-partner-img">
                                            <img src={Glass} className='img-fluid' alt="Bed mal"/>
                                        </div>
                                        <h5>BorrowCup</h5>
                                        <Switch
                                            // value={switchId == item.id ? switchValue : item.status}
                                            value={'active'}
                                            on='active'
                                            off='disabled'
                                            // id={item.id}
                                            // onChange={(e)=>this.HandlerChangeStatus(e,item.id)}
                                            onChange={(e) => this.HandlerChangeStatus(e, 1)}
                                        />
                                    </div>
                                </div>
                                <div className="dv-swiper-parent-bg mb-3">
                                    <div
                                        className="d-flex justify-content-around dv-light-gray-text align-items-center">
                                        <div className="dv-borrow-partner-img">
                                            <img src={Glass} className='img-fluid' alt="Bed mal"/>
                                        </div>
                                        <h5>BorrowCup</h5>
                                        <Switch
                                            // value={switchId == item.id ? switchValue : item.status}
                                            value={'disabled'}
                                            on='active'
                                            off='disabled'
                                            // id={item.id}
                                            // onChange={(e)=>this.HandlerChangeStatus(e,item.id)}
                                            onChange={(e) => this.HandlerChangeStatus(e, 1)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="dv-bg-light-vendors dv-note-height pb-2 mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className='mb-0'>Notes</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.showPlan}
                       onHide={this.closeModal} className='dv-plan-modal'>
                    <Modal.Body className='p-3 pb-0'>
                        <form onSubmit={this.savePlanModal} className='d-flex flex-column'>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className='mb-0'>Plan Terms</h5>
                                <div className="d-flex">
                                    <button type='button' onClick={this.closeModal}
                                            className='dv-btn-plan-close mr-1'>Close
                                    </button>
                                    <button type='submit' className='dv-btn-plan-save ml-1'>Save</button>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                <p className='mb-0'>Marketplace per transaction</p>
                                <input type='number' className="dv-vendor-price-input" name='market_place_price' onChange={this.inputHandler} value={this.state.market_place_price} placeholder='£'/>
                            </div>
                            <div className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                <p className='mb-0'>Marketplace fee</p>
                                <input type='number' className="dv-vendor-price-input" name='market_place_price_fee' onChange={this.inputHandler} value={this.state.market_place_price_fee} placeholder='%'/>
                            </div>
                            <div className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                <p className='mb-0'>MP - BorrowCup per unit</p>
                                <input type='number' className="dv-vendor-price-input" name='borrow_cup_per_unit_price' onChange={this.inputHandler} value={this.state.borrow_cup_per_unit_price} placeholder='£'/>
                            </div>
                            <div className="d-flex justify-content-between dv-light-gray-text align-items-start mb-3">
                               <div className='d-flex flex-column'>
                                   <p className='mb-0'>MP - BorrowBag per unit</p>
                                   <div className='dv-span-gray'>On-demand charges</div>
                               </div>
                                <input type='number' className="dv-vendor-price-input" name='borrow_bag_per_unit_price' onChange={this.inputHandler} value={this.state.borrow_bag_per_unit_price} placeholder='£'/>
                            </div>
                            <div className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                <p className='mb-0'>OD - BorrowCup per unit</p>
                                <input type='number' className="dv-vendor-price-input" name='od_borrow_cup_per_unit_price' onChange={this.inputHandler} value={this.state.od_borrow_cup_per_unit_price} placeholder='£'/>
                            </div>
                            <div className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                <p className='mb-0'>OD - BorrowBag per unit</p>
                                <input type='number' className="dv-vendor-price-input" name='od_borrow_bag_per_unit_price' onChange={this.inputHandler} value={this.state.od_borrow_bag_per_unit_price} placeholder='£'/>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

            </div>
        );
    }
}

export default Vendors;