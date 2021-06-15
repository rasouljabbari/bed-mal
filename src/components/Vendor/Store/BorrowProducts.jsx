import React, {Component} from 'react';
import './store.scss';
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import Menu from "./Menu";
import Glass from "../../../assets/image/complete.png";
import {Modal} from "react-bootstrap";

class BorrowProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_value: '',
            isAllBoardsLoaded: true,
            BorrowCup: false,
            BorrowBag: false,
            sleeves: '',lids:'',eight_oz_cups:'',twelve_oz_cups:'',
            sleeves2: '',lids2:'',eight_oz_cups2:'',twelve_oz_cups2:'',
            bags:'',bags2:''
        }
    }

    async componentDidMount() {
        setTitle('Store')
    }


    render() {
        return (
            <div className='d-flex flex-column flex-md-row dv-vendor'>
                <div className="dv-vendors-right-admin dv-vendors-right-admin-2">
                    <Menu/>
                </div>
                <div className='dv-vendor-right-content dv-vendor-right-content-2 position-relative'>
                    <h1>BorrowProducts</h1>
                    <div className='row'>
                        <div className="col-12 col-md-8">
                            <h1>Inventory</h1>
                        </div>
                        <div className="col-12 col-md-4">
                            <form action="" onSubmit={this.searchHandler} dir='ltr'>
                                <label htmlFor="dv-search" className='w-100 position-relative'>
                                    <input type="search" placeholder='Search for store' onChange={this.handleInput}
                                           value={this.state.search_value} name='search_value'
                                           className='dv-search-input'
                                           id='dv-search'/>
                                    <button type='submit' className='dv-search-icon'><i className='la la-search'/>
                                    </button>
                                </label>
                            </form>
                        </div>
                        <div className="col-12 mb-4">
                            <div className="d-flex flex-column align-items-start pl-md-5">
                                <h4 className='mb-1'>Tulip Cafe</h4>
                                <span className='mb-1 dv-span-color-gray'>User ID: 123456</span>
                                <span className='dv-span-color-gray mb-2'>32 Hampstead High Street, Hampstead, London, NW3 4UU</span>
                                <div className="d-flex">
                                    <button className='dv-blue-btn mr-1'
                                            onClick={() => this.handleMessage('10')}>Message
                                    </button>
                                    <button className='dv-white-btn ml-1' onClick={() => this.handleCall('0')}>Call
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 mb-4'>
                            <div className="bg-inventory">
                                <div className="d-flex flex-column flex-md-row">
                                    <div className="img-parent-inventory">
                                        <div className="dv-parent-of-img">
                                            <img src={Glass} className='img-fluid' alt="bed mal"/>
                                        </div>
                                        <p className={'dv-p-inventory'}>BorrowCup</p>
                                    </div>
                                    <div className="dv-current-inventory w-100 d-flex flex-column">
                                        <h5>Current inventory figures</h5>
                                        <div className="dv-title-inventory d-flex align-items-center justify-content-start mb-3">
                                            <div className='pr-5 dv-inventory-text'><span>Sleeve </span> <span>24</span></div>
                                            <div className='pr-5 dv-inventory-text'><span>Cup </span> <span>32</span></div>
                                            <div className='pr-5 dv-inventory-text'><span>Lid </span> <span>24</span></div>
                                        </div>
                                        <button className='dv-btn-inventory ml-md-auto' onClick={()=>this.UpdateHandlerCup(1)}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 mb-4'>
                            <div className="bg-inventory">
                                <div className="d-flex flex-column flex-md-row">
                                    <div className="img-parent-inventory">
                                        <div className="dv-parent-of-img">
                                            <img src={Glass} className='img-fluid' alt="bed mal"/>
                                        </div>
                                        <p className={'dv-p-inventory'}>BorrowBag</p>
                                    </div>
                                    <div className="dv-current-inventory w-100 d-flex flex-column">
                                        <h5>Current inventory figures</h5>
                                        <div className="dv-title-inventory d-flex align-items-center justify-content-start mb-3">
                                            <div className='pr-5 dv-inventory-text'><span>Bag </span> <span>24</span></div>
                                        </div>
                                        <button className='dv-btn-inventory ml-md-auto' onClick={()=>this.UpdateHandlerBag(1)}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <Modal style={{textAlign: 'center'}} className='dv-gray-modal' centered={true} show={this.state.BorrowCup}
                       onHide={this.closeModal}>
                    <Modal.Body>
                        <div className="row justify-content-center">
                            <div className="col-12 mb-3">
                                <p className='modal-inventory-title mb-3'>BorrowCup inventory update</p>
                                <p className='modal-inventory-title-p'>Tell us the inventory levels for items still reusable?</p>
                            </div>
                            <div className="col-12">
                                <form onSubmit={this.BorrowCupHandler} className="row mb-0 dv-inventory-form">
                                    <label className="col-6 mb-3 d-flex align-items-center">
                                        <div className="dv-borrow-cup-title">Sleeves</div>
                                        <input type="number" name='sleeves' value={this.state.sleeves} onChange={this.handleInput}/>
                                    </label>
                                    <label className="col-6 mb-3 d-flex align-items-center">
                                        <div className="dv-borrow-cup-title">Lids</div>
                                        <input type="number" name='lids' value={this.state.lids} onChange={this.handleInput}/>
                                    </label>
                                    <label className="col-6 mb-3 d-flex align-items-center">
                                        <div className="dv-borrow-cup-title">8oz Cups</div>
                                        <input type="number" name='eight_oz_cups' value={this.state.eight_oz_cups} onChange={this.handleInput}/>
                                    </label>
                                    <label className="col-6 mb-3 d-flex align-items-center">
                                        <div className="dv-borrow-cup-title">12oz Cups</div>
                                        <input type="number" name='twelve_oz_cups' value={this.state.twelve_oz_cups} onChange={this.handleInput}/>
                                    </label>

                                    <label className="col-12">
                                        <p className='modal-inventory-title-p'>Tell us the inventory levels that require downgrading?</p>
                                    </label>

                                    <label className="col-6 mb-3 d-flex align-items-center">
                                        <div className="dv-borrow-cup-title">Sleeves</div>
                                        <input type="number" name='sleeves2' value={this.state.sleeves2} onChange={this.handleInput}/>
                                    </label>
                                    <label className="col-6 mb-3 d-flex align-items-center">
                                        <div className="dv-borrow-cup-title">Lids</div>
                                        <input type="number" name='lids2' value={this.state.lids2} onChange={this.handleInput}/>
                                    </label>
                                    <label className="col-6 mb-3 d-flex align-items-center">
                                        <div className="dv-borrow-cup-title">8oz Cups</div>
                                        <input type="number" name='eight_oz_cups2' value={this.state.eight_oz_cups2} onChange={this.handleInput}/>
                                    </label>
                                    <label className="col-6 mb-3 d-flex align-items-center">
                                        <div className="dv-borrow-cup-title">12oz Cups</div>
                                        <input type="number" name='twelve_oz_cups2' value={this.state.twelve_oz_cups2} onChange={this.handleInput}/>
                                    </label>
                                    <label className="col-12 mb-5">
                                        <p className='modal-inventory-title-p'>Ensure delivery of new inventory has arrived before updating.</p>
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

                <Modal style={{textAlign: 'center'}} className='dv-gray-modal' centered={true} show={this.state.BorrowBag}
                       onHide={this.closeModal}>
                    <Modal.Body>
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <p className='modal-inventory-title mb-3'>BorrowBag inventory update</p>
                                <p className='modal-inventory-title-p'>Tell us the inventory levels for items still reusable?</p>
                            </div>
                            <div className="col-12">
                                <form onSubmit={this.BorrowBagHandler} className="row mb-0 dv-inventory-form">
                                    <label className="col-6 mb-md-5 d-flex align-items-center">
                                        <div className="dv-borrow-cup-title">Bags</div>
                                        <input type="number" name='bags' value={this.state.bags} onChange={this.handleInput}/>
                                    </label>

                                    <label className="col-12 mt-4 mt-md-5">
                                        <p className='modal-inventory-title-p'>Tell us the inventory levels that require downgrading?</p>
                                    </label>

                                    <label className="col-6 d-flex align-items-center mb-md-4">
                                        <div className="dv-borrow-cup-title">Bags</div>
                                        <input type="number" name='bags2' value={this.state.bags2} onChange={this.handleInput}/>
                                    </label>
                                    <label className="col-12 my-3 my-md-5">
                                        <p className='modal-inventory-title-p'>Ensure delivery of new inventory has arrived before updating.</p>
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
        );
    }
}

export default BorrowProducts;