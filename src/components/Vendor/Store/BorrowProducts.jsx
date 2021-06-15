import React, {Component} from 'react';
import './store.scss';
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import Menu from "./Menu";
import Cup from "../../../assets/image/complete.png"
import Glass from "../../../assets/image/bag.png";
import {Modal} from "react-bootstrap";

class BorrowProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    UpdateHandlerCup = (id) => {
        console.log(id)
        this.setState({BorrowCup : true})
    }
    UpdateHandlerBag = (id) => {
        console.log(id)
        this.setState({BorrowBag: true})
    }
    BorrowCupHandler = (e) =>{
        e.preventDefault()
        this.setState({BorrowCup : false})
    }
    BorrowBagHandler = (e) =>{
        e.preventDefault()
        this.setState({BorrowBag: false})
    }
    closeModal = () =>{
        this.setState({BorrowCup : false , BorrowBag: false})
    }

    render() {
        return (
            <div className='d-flex flex-column flex-xl-row dv-vendor'>
                <div className="dv-vendors-right-admin dv-vendors-right-admin-2">
                    <Menu/>
                </div>
                <div className='dv-vendor-right-content dv-vendor-right-content-2 position-relative'>
                    <h1>BorrowProducts</h1>
                    <div className='row mt-4'>
                        <div className='col-12 mb-4'>
                            <div className="bg-inventory">
                                <div className="d-flex flex-column flex-md-row">
                                    <div className="img-parent-inventory">
                                        <div className="dv-parent-of-img">
                                            <img src={Cup} className='img-fluid' alt="bed mal"/>
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
                                    <div className="dv-current-inventory w-100 d-flex flex-column mt-4">
                                        <h5>You do not currently offer BorrowBag.</h5>
                                        {/*<div className="dv-title-inventory d-flex align-items-center justify-content-start mb-3">*/}
                                        {/*    <div className='pr-5 dv-inventory-text'><span>Bag </span> <span>24</span></div>*/}
                                        {/*</div>*/}
                                        <button className='dv-btn-inventory-glass ml-md-auto' onClick={()=>this.UpdateHandlerBag(1)}>Get more info</button>
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
                                        <p className='modal-inventory-title-p'>Items lost or broken in-house do not require inputting.
                                            We’ll review this update within 48hrs & arrange collection of
                                            any downgrades / delivery of replacements.</p>
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
                                        <p className='modal-inventory-title-p'>Items lost or broken in-house do not require inputting.
                                            We’ll review this update within 48hrs & arrange collection of
                                            any downgrades / delivery of replacements.</p>
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