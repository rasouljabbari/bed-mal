import React, {Component} from 'react';
import './vendors.scss'
import {Link} from "react-router-dom";
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import Glass from '../../../assets/image/complete.png'
import Bag from '../../../assets/image/bag.png'
import Switch from 'react-input-switch';
import Swal from "sweetalert2";
import {Modal} from "react-bootstrap";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import placeHolder_img from "../../../assets/image/bedmal-place-holder.jpg";

class Vendors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_value: '',
            showPlan: false, items: [], vendor_info: '', default_active: '', department_list: [], suspend_show: false,
            suspend_id: '', show_edit_note: false, notes: '',
            plan_terms: {
                marketplace_per_transaction: props.marketplace_per_transaction,
                marketplace_fee: props.marketplace_fee,
                marketplace_borrow_cup_per_unit: props.marketplace_borrow_cup_per_unit,
                marketplace_Borrow_bag_per_unit: props.marketplace_Borrow_bag_per_unit,
                on_demand_borrow_cup_per_unit: props.on_demand_borrow_cup_per_unit,
                on_demand_borrow_bag_per_unit: props.on_demand_borrow_bag_per_unit,
            }
        }
    }

    async componentDidMount() {
        setTitle('Vendors')
        let vendorItems = await getData(MAIN_URL, `admin/vendors`, 'get', {}, true, true);
        if (vendorItems?.status === 200) {

            let default_item = vendorItems.items[0]

            let departmentList = await getData(MAIN_URL, `admin/departments`, 'get', {}, true, true);
            if (departmentList?.status === 200) {
                this.setState({department_list: departmentList.items})
            }

            let vendorItem = await getData(MAIN_URL, `admin/vendors/info/${default_item?.id}`, 'get', {}, true, true);
            if (vendorItem?.status === 200) {
                this.setState({
                    items: vendorItems.items,
                    vendor_info: vendorItem.vendor,
                    notes: vendorItem.vendor?.notes,
                    default_active: default_item.id
                })
            }

        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSearchHandler = async (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        let vendorItems = await getData(MAIN_URL, `admin/vendors?search=${e.target.value}`, 'get', {}, true, false);
        if (vendorItems?.status === 200) {
            let default_item = vendorItems.items[0]

            let vendorItem = await getData(MAIN_URL, `admin/vendors/info/${default_item?.id}`, 'get', {}, true, false);
            if (vendorItem?.status === 200) {
                this.setState({
                    items: vendorItems.items,
                    vendor_info: vendorItem.vendor,
                    default_active: default_item.id
                })
            }
        }
    }

    vendorListItemHandler = async (id) => {
        let vendorItem = await getData(MAIN_URL, `admin/vendors/info/${id}`, 'get', {}, true, true);
        if (vendorItem?.status === 200) {
            this.setState({vendor_info: vendorItem.vendor, default_active: id})
        }
    }

    handleMessage = (id) => {
        const location = {
            pathname: '/admin/messages',
            state: {
                id: id,
                type: 'vendor'
            }
        }
        this.props.history.push(location)
    }

    SuspendHandler = (id) => {
        this.setState({suspend_show: true, suspend_id: id})
    }
    changeSuspendStatus = async () => {
        let suspend_status;
        if (this.state.vendor_info.status === 'approved') {
            suspend_status = 'inactive'
        } else {
            suspend_status = 'approved'
        }
        this.setState({suspend_show: false})
        let suspendStatus = await getData(MAIN_URL, `admin/vendors/change-status/${this.state.suspend_id}?status=${suspend_status}`, 'get', {}, true, true);
        if (suspendStatus?.status === 200) {
            this.setState({vendor_info: suspendStatus.vendor_info})
        }
    }
    /******************************************************/
    //Change Status
    HandlerChangeStatusCup = async (id, e) => {
        console.log(id, e)
        if (e === 0) {
            e = 1
        } else {
            e = 0
        }
        const list = await getData(MAIN_URL, `admin/vendors/borrow-partner/${id}?borrow_cup=${e}`, 'get', {}, true, true);

        if (list?.status === 200) {
            let vendorItem = await getData(MAIN_URL, `admin/vendors/info/${id}`, 'get', {}, true, true);
            if (vendorItem?.status === 200) {
                this.setState({vendor_info: vendorItem.vendor})
            }
        }

    };
    HandlerChangeStatusBag = async (id, e) => {
        console.log(id, e)
        if (e === 0) {
            e = 1
        } else {
            e = 0
        }

        const list = await getData(MAIN_URL, `admin/vendors/borrow-partner/${id}?borrow_bag=${e}`, 'get', {}, true, true);

        if (list?.status === 200) {
            if (list?.status === 200) {
                let vendorItem = await getData(MAIN_URL, `admin/vendors/info/${id}`, 'get', {}, true, true);
                if (vendorItem?.status === 200) {
                    this.setState({vendor_info: vendorItem.vendor})
                }
            }
        }

    };
    /**********************************************/

    editPlans = (id) => {
        this.setState({showPlan: true, term_id: id})
    }
    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    marketplacePerTransaction = (e) => {
        let plan_terms = this.state.plan_terms;
        plan_terms.marketplace_per_transaction = e.target.value;
        this.setState({plan_terms: plan_terms});
    }
    marketplaceFee = (e) => {
        let plan_terms = this.state.plan_terms;
        plan_terms.marketplace_fee = e.target.value;
        this.setState({plan_terms: plan_terms});
    }
    marketplaceBorrowCupPerUnit = (e) => {
        let plan_terms = this.state.plan_terms;
        plan_terms.marketplace_borrow_cup_per_unit = e.target.value;
        this.setState({plan_terms: plan_terms});
    }
    marketplaceBorrowBagPerUnit = (e) => {
        let plan_terms = this.state.plan_terms;
        plan_terms.marketplace_Borrow_bag_per_unit = e.target.value;
        this.setState({plan_terms: plan_terms});
    }
    onDemandBorrowCupPerUnit = (e) => {
        let plan_terms = this.state.plan_terms;
        plan_terms.on_demand_borrow_cup_per_unit = e.target.value;
        this.setState({plan_terms: plan_terms});
    }
    onDemandBorrowBagPerUnit = (e) => {
        let plan_terms = this.state.plan_terms;
        plan_terms.on_demand_borrow_bag_per_unit = e.target.value;
        this.setState({plan_terms: plan_terms});
    }

    savePlanModal = async (e) => {
        e.preventDefault()
        this.setState({showPlan: false})
        let vendorItem = await getData(MAIN_URL, `admin/vendors/edit-details/${this.state.term_id}`, 'post', {
            plan_terms: JSON.stringify(this.state.plan_terms),
        }, true, true);
        if (vendorItem?.status === 200) {
            let vendorItems = await getData(MAIN_URL, `admin/vendors`, 'get', {}, true, true);
            if (vendorItems?.status === 200) {

                let default_item = vendorItems.items[0]

                let vendorItem = await getData(MAIN_URL, `admin/vendors/info/${default_item.id}`, 'get', {}, true, true);
                if (vendorItem?.status === 200) {
                    this.setState({
                        items: vendorItems.items,
                        vendor_info: vendorItem.vendor,
                        default_active: default_item.id
                    })
                }

            }
        }
    }
    editNote = (id) => {
        this.setState({show_edit_note: true, term_id: id})
    }
    notesInputHandler = (e) => {
        let notes = e.target.value;
        this.setState({notes: notes})
    }
    saveNoteModal = async (e) => {
        e.preventDefault();

        this.setState({show_edit_note: false})

        let vendorItem = await getData(MAIN_URL, `admin/vendors/edit-details/${this.state.term_id}`, 'post', {
            notes: this.state.notes,
        }, true, true);
        if (vendorItem?.status === 200) {
            let vendorItems = await getData(MAIN_URL, `admin/vendors`, 'get', {}, true, true);
            if (vendorItems?.status === 200) {

                let default_item = vendorItems.items[0]

                let vendorItem = await getData(MAIN_URL, `admin/vendors/info/${default_item.id}`, 'get', {}, true, true);
                if (vendorItem?.status === 200) {
                    this.setState({
                        items: vendorItems.items,
                        vendor_info: vendorItem.vendor,
                        default_active: default_item.id
                    })
                }

            }
        }
    }


    closeModal = () => {
        this.setState({showPlan: false, suspend_show: false, show_edit_note: false})
    }


    render() {
        const departments = this.state.vendor_info.departments;

        return (
            this.state.department_list?.length !== 0 ?
                <div className='d-flex flex-column flex-lg-row dv-vendor'>
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
                                       value={this.state.search_value} name='search_value' className='dv-search-input'
                                       id='dv-search'/>
                                <button type='submit' className='dv-search-icon'><i className='la la-search'/></button>
                            </label>
                        </form>
                        <ul>
                            {
                                this.state.items.length !== 0 ?
                                    this.state.items?.map((item, i) => (
                                        <li key={i}
                                            className={this.state.default_active === item.id ? "active dv-vendor-list-items d-flex flex-column align-items-start" : "dv-vendor-list-items d-flex flex-column align-items-start"}
                                            onClick={() => this.vendorListItemHandler(item.id)}>
                                            <h5 className='dv-vendor-list-title'>{item.name}</h5>
                                            <h5 className='mb-0 dv-vendor-list-title-2'>{item.postal_code}</h5>
                                        </li>
                                    )) : ''
                            }
                        </ul>
                    </div>
                    <div className={this.state.vendor_info.status === 'approved' ? 'dv-vendor-right-content ' :
                        this.state.vendor_info.status === 'inactive' ? 'dv-vendor-right-content dv-suspended' :
                            'dv-vendor-right-content dv-pending-approval'
                    }>
                        <div className="row" key={this.state.vendor_info.id}>
                            <div className="col-12 mb-3">
                                <div className="dv-bg-light-vendors">
                                    <div className="row">
                                        <div className="col-12 col-lg-6 mb-3 mb-lg-3">
                                            <div className='d-flex flex-column'>
                                                <h6>{this.state.vendor_info.name}</h6>
                                                <h6>{this.state.vendor_info.address}</h6>
                                                <h6>{this.state.vendor_info.postal_code}</h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 mb-3 mb-lg-3">
                                            <h6 className='mb-2'><span>Main contact: </span><span>Mary Magdeline</span>
                                            </h6>
                                            <h6 className='mb-2'>
                                                <span>Email: </span><span>{this.state.vendor_info.email}</span>
                                            </h6>
                                            <h6 className='mb-2'>
                                                <span>Coordinates: </span><span>x: {this.state.vendor_info.latitude} y: {this.state.vendor_info.longitude}</span>
                                            </h6>
                                            <div className="d-flex justify-content-start mt-3">
                                                <button className='dv-blue-btn mr-1'
                                                        onClick={() => this.handleMessage(this.state.vendor_info.id)}>Message
                                                </button>
                                                <a href={`tel:${this.state.vendor_info.phone}`}
                                                   className='dv-white-btn ml-1 d-flex align-items-center justify-content-center'>Call</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 pr-lg-2 mb-3">
                                <div className="dv-bg-light-vendors pb-3 mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5>Plan Terms</h5>
                                        <button className='dv-vendor-edit-btn'
                                                onClick={() => this.editPlans(this.state.vendor_info.id)}>Edit
                                        </button>
                                    </div>
                                    <div className="d-flex flex-column ">
                                        <div
                                            className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                            <p className='mb-0 pl-2'>Marketplace per transaction</p>
                                            <div
                                                className="dv-vendor-price">£ {this.state.vendor_info.plan_terms?.marketplace_per_transaction}</div>
                                        </div>
                                        <div
                                            className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                            <p className='mb-0 pl-2'>Marketplace fee</p>
                                            <div
                                                className="dv-vendor-price">{this.state.vendor_info.plan_terms?.marketplace_fee} %
                                            </div>
                                        </div>
                                        <div
                                            className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                            <p className='mb-0 pl-2'>MP - BorrowCup per unit</p>
                                            <div
                                                className="dv-vendor-price">£ {this.state.vendor_info.plan_terms?.marketplace_borrow_cup_per_unit}</div>
                                        </div>
                                        <div
                                            className="d-flex justify-content-between dv-light-gray-text align-items-start mb-3">
                                            <div className='d-flex flex-column'>
                                                <p className='mb-0 pl-2'>MP - BorrowBag per unit</p>
                                                <div className='dv-span-gray pl-2'>On-demand charges</div>
                                            </div>
                                            <div
                                                className="dv-vendor-price">£ {this.state.vendor_info.plan_terms?.marketplace_Borrow_bag_per_unit}</div>
                                        </div>
                                        <div
                                            className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                            <p className='mb-0 pl-2'>OD - BorrowCup per unit</p>
                                            <div
                                                className="dv-vendor-price">£ {this.state.vendor_info.plan_terms?.on_demand_borrow_cup_per_unit}</div>
                                        </div>
                                        <div
                                            className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                            <p className='mb-0 pl-2'>OD - BorrowCup per unit</p>
                                            <div
                                                className="dv-vendor-price">£ {this.state.vendor_info.plan_terms?.on_demand_borrow_bag_per_unit}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dv-bg-light-vendors mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className='mb-0'>Store descriptor</h5>
                                    </div>
                                    <div
                                        className="d-flex justify-content-start flex-wrap dv-light-gray-text align-items-center">
                                        {
                                            this.state.department_list?.map((row, index) => {
                                                if (departments?.indexOf(row.id) !== -1) {
                                                    return (
                                                        <div key={index} className="dv-blue-badge mb-2 mr-2"
                                                             id={row.id}>{row.name}</div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="dv-bg-light-vendor-override pb-3 mb-3">
                                    <h5 className='dv-vendor-override-h6'>Vendor Override</h5>
                                    <div
                                        className="d-flex justify-content-between flex-wrap dv-light-gray-text align-items-center">
                                        <div className="d-flex mb-3 mb-xl-0">
                                            {
                                                this.state.vendor_info.status === 'approved' ?
                                                    <div className="dv-vendor-override-circle mr-2 ml-2"></div> :
                                                    this.state.vendor_info.status === 'inactive' ?
                                                        <div className="dv-in-active-override-circle mr-2 ml-2"></div> :
                                                        <div className="dv-pending-override-circle mr-2 ml-2"></div>
                                            }

                                            <h6 className='dv-vendor-override-active mb-0'>{this.state.vendor_info.status}</h6>
                                            {/*<h6 className='dv-vendor-override-in-active mb-0'>Inactive</h6>*/}
                                        </div>
                                        <div className="d-flex">
                                            <Link to={`/admin/edit-overide/${this.state.vendor_info.id}`}
                                                  className="dv-bg-edit-vendor-override mr-3">Edit
                                            </Link>
                                            {
                                                this.state.vendor_info.status === 'approved' ? <button
                                                        className="dv-bg-suspend-vendor-override dv-bg-approve-vendor-override"
                                                        onClick={() => this.SuspendHandler(this.state.vendor_info.id)}>Suspend</button> :
                                                    this.state.vendor_info.status === 'inactive' ? <button
                                                            className="dv-bg-suspend-vendor-override dv-bg-approve-vendor-override"
                                                            onClick={() => this.SuspendHandler(this.state.vendor_info.id)}>Reactivate</button> :
                                                        <button className="dv-bg-suspend-vendor-override"
                                                                onClick={() => this.SuspendHandler(this.state.vendor_info.id)}>Approve</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 pl-lg-2 mb-3">
                                <div className="dv-bg-light-vendors pb-2 mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className='mb-0 pl-3'>Borrow Partner</h5>
                                    </div>
                                    <div className="dv-swiper-parent-bg mb-3">
                                        <div
                                            className="d-flex justify-content-around dv-light-gray-text align-items-center">
                                            <div className="dv-borrow-partner-img">
                                                <img
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${placeHolder_img}`
                                                    }}
                                                    src={Glass} className='img-fluid' alt="Bed mal"/>
                                            </div>
                                            <h5>BorrowCup</h5>
                                            <Switch
                                                // value={switchId == item.id ? switchValue : item.status}
                                                value={this.state.vendor_info.borrow_partner_cup}
                                                on={1}
                                                off={0}
                                                // id={item.id}
                                                // onChange={(e)=>this.HandlerChangeStatus(e,item.id)}
                                                onChange={() => this.HandlerChangeStatusCup(this.state.vendor_info.id, this.state.vendor_info.borrow_partner_cup)}
                                            />
                                        </div>
                                    </div>
                                    <div className="dv-swiper-parent-bg mb-3">
                                        <div
                                            className="d-flex justify-content-around dv-light-gray-text align-items-center">
                                            <div className="dv-borrow-partner-img">
                                                <img
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${placeHolder_img}`
                                                    }}
                                                    src={Bag} className='img-fluid' alt="Bed mal"/>
                                            </div>
                                            <h5>BorrowBag</h5>
                                            <Switch
                                                // value={switchId == item.id ? switchValue : item.status}
                                                value={this.state.vendor_info.borrow_partner_bag}
                                                on={1}
                                                off={0}
                                                // id={item.id}
                                                // onChange={(e)=>this.HandlerChangeStatus(e,item.id)}
                                                onChange={() => this.HandlerChangeStatusBag(this.state.vendor_info.id, this.state.vendor_info.borrow_partner_bag)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="dv-bg-light-vendors dv-note-height pb-2 mb-3">
                                    <div className="mb-3" style={{cursor: 'pointer'}}
                                         onClick={() => this.editNote(this.state.vendor_info.id)}>
                                        <h5 className='mb-4 pl-3'>Notes
                                            <i className='la la-pen pl-3'
                                                                      style={{fontSize: '1.5rem'}}/></h5>
                                        <p className='text-left f-18'>{this.state.vendor_info?.notes}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal style={{textAlign: 'center'}} centered={true} show={this.state.showPlan}
                           onHide={this.closeModal} className='dv-plan-modal'>
                        <Modal.Body className='p-3 pb-0'>
                            <form onSubmit={this.savePlanModal} id='myForm' className='d-flex flex-column'>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <h5 className='mb-0'>Plan Terms</h5>
                                    <div className="d-flex">
                                        <button type='button' onClick={this.closeModal}
                                                className='dv-btn-plan-close mr-1'>Close
                                        </button>
                                        <button type='submit' className='dv-btn-plan-save ml-1'>Save</button>
                                    </div>
                                </div>
                                <div
                                    className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                    <p className='mb-0'>Marketplace per transaction</p>
                                    <div className='position-relative'>
                                        <div className="dv-custom-unit">£</div>
                                        <input type='number' className="dv-vendor-price-input"
                                               name='marketplace_per_transaction'
                                               step={0.01}
                                               onChange={this.marketplacePerTransaction}
                                               value={this.state.marketplace_per_transaction}/>
                                    </div>
                                </div>
                                <div
                                    className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                    <p className='mb-0'>Marketplace fee</p>
                                    <div className='position-relative'>

                                        <input type='number' className="dv-vendor-price-input" name='marketplace_fee'
                                               onChange={this.marketplaceFee} step={0.01} value={this.state.marketplace_fee}/>
                                        <div className="dv-custom-unit-percent">%</div>
                                    </div>
                                </div>
                                <div
                                    className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                    <p className='mb-0'>MP - BorrowCup per unit</p>
                                    <div className='position-relative'>
                                        <div className="dv-custom-unit">£</div>
                                        <input type='number' className="dv-vendor-price-input"
                                               name='marketplace_borrow_cup_per_unit'
                                               onChange={this.marketplaceBorrowCupPerUnit} step={0.01}
                                               value={this.state.marketplace_borrow_cup_per_unit}/>
                                    </div>
                                </div>
                                <div
                                    className="d-flex justify-content-between dv-light-gray-text align-items-start mb-3">
                                    <div className='d-flex flex-column'>
                                        <p className='mb-0'>MP - BorrowBag per unit</p>
                                        <div className='dv-span-gray'>On-demand charges</div>
                                    </div>
                                    <div className='position-relative'>
                                        <div className="dv-custom-unit">£</div>
                                        <input type='number' className="dv-vendor-price-input"
                                               name='marketplace_Borrow_bag_per_unit'
                                               onChange={this.marketplaceBorrowBagPerUnit} step={0.01}
                                               value={this.state.marketplace_Borrow_bag_per_unit}/>
                                    </div>
                                </div>
                                <div
                                    className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                    <p className='mb-0'>OD - BorrowCup per unit</p>
                                    <div className='position-relative'>
                                        <div className="dv-custom-unit">£</div>
                                        <input type='number' className="dv-vendor-price-input"
                                               name='on_demand_borrow_cup_per_unit'
                                               onChange={this.onDemandBorrowCupPerUnit} step={0.01}
                                               value={this.state.on_demand_borrow_cup_per_unit}/>
                                    </div>
                                </div>
                                <div
                                    className="d-flex justify-content-between dv-light-gray-text align-items-center mb-3">
                                    <p className='mb-0'>OD - BorrowBag per unit</p>
                                    <div className='position-relative'>
                                        <div className="dv-custom-unit">£</div>
                                        <input type='number' className="dv-vendor-price-input"
                                               name='on_demand_borrow_bag_per_unit'
                                               onChange={this.onDemandBorrowBagPerUnit} step={0.01}
                                               value={this.state.on_demand_borrow_bag_per_unit}/>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    <Modal style={{textAlign: 'center'}} centered={true} show={this.state.suspend_show}
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
                                            onClick={this.changeSuspendStatus}>Yes
                                    </button>
                                </div>
                            </div>

                        </Modal.Body>
                    </Modal>

                    <Modal style={{textAlign: 'center'}} centered={true} show={this.state.show_edit_note}
                           onHide={this.closeModal} className='dv-plan-modal'>
                        <Modal.Body className='p-3 pb-0'>
                            <form onSubmit={this.saveNoteModal} id='myForm' className='d-flex flex-column'>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <h5 className='mb-0'>Note</h5>
                                    <div className="d-flex">
                                        <button type='button' onClick={this.closeModal}
                                                className='dv-btn-plan-close mr-1'>Close
                                        </button>
                                        <button type='submit' className='dv-btn-plan-save ml-1'>Save</button>
                                    </div>
                                </div>
                                <div className="d-flex mb-3">
                                    <textarea name="notes" className='dv-input w-100' onChange={this.notesInputHandler}
                                              value={this.state.notes} rows="7"></textarea>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>

                </div> : ''
        );
    }
}

export default Vendors;