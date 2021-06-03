import React, {Component} from 'react';
import './borrowing.scss'
import {Link} from "react-router-dom";
import Glass from '../../../assets/image/complete.png'
import OrderNoteImage from '../../../assets/image/Use borrow bags.png'
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import LeftSideBarBorrowing from "./LeftSideBarBorrowing/LeftSideBarBorrowing";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import placeHolder_img from "../../../assets/image/bedmal-place-holder.jpg";

class BorrowReceiptsSelected extends Component {
    constructor(props) {
        super(props);
        this.myRef2 = React.createRef()
        this.state = {
            showEdit : false,
            cup:'',lid:'',sleeve:'',bags:'',cup2:'',lid2:'',sleeve2:'',bags2:''
        }
    }

    componentDidMount() {
        setTitle('Borrowing')
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

    handleEdit = (id) => {
        console.log(id)
        this.setState({showEdit2: true , showEdit : true})
    }

    handleEditBorrow = (e) =>{
        e.preventDefault();
        this.setState({showEdit : false , showEdit2: false})
    }
    handleClose = () =>{
        this.setState({showEdit : false , showEdit2: false})
    }
    inputHandler = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {

        const {showEdit ,showEdit2} = this.state

        return (
            <div className='d-flex'>
                <div className="d-none d-md-block">
                    <LeftSideBarBorrowing/>
                </div>
                <div className="row w-100 py-3 pl-3 pl-md-4 mb-5 dv-margin-left-borrow">
                    <div className="col-12 pr-1 pl-0">
                        <div className="dv-borrowing-content">
                            <div className="d-flex py-3">
                                <button className='mr-3 dv-back-btn'><Link to={'/admin/borrow-receipts'}><i
                                    className="las la-arrow-left"/></Link></button>
                                <h3>BorrowReceipts</h3>
                            </div>
                            <div className="position-relative">
                                <div className="bg-borrow-receipts pt-4 pb-3 px-3 mb-3">
                                    <div className='bg-borrow-receipt-first d-flex justify-content-start'>
                                        <div className="d-flex flex-column align-items-center pl-md-5">
                                            <h4 className='mb-1'>Sophie Smith</h4>
                                            <span className='mb-2 dv-span-color'>User ID: 123456</span>
                                            <div className="d-flex">
                                                <button className='dv-blue-btn mx-1'
                                                        onClick={() => this.handleMessage('10')}>Message
                                                </button>
                                                <button className='dv-white-btn mx-1' onClick={() => this.handleCall('0')}>Call
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-borrow-receipts pt-4 pb-3 px-3 mb-3">
                                    <div className='bg-borrow-receipt-first d-flex justify-content-start'>
                                        <div className="d-flex flex-column align-items-center pl-md-5">
                                            <h4 className='mb-1'>Sophie Smith</h4>
                                            <span className='mb-2 dv-span-color'>User ID: 123456</span>
                                            <div className="d-flex">
                                                <button className='dv-blue-btn mx-1'
                                                        onClick={() => this.handleMessage('10')}>Message
                                                </button>
                                                <button className='dv-white-btn mx-1' onClick={() => this.handleCall('0')}>Call
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={showEdit ? "d-none" : 'dv-right-borrow-item'}>
                                    <button className='dv-edit-borrow-item d-block ml-auto mb-4' onClick={()=>this.handleEdit(10)}>Edit</button>
                                    <div className="px-md-5 dv-right-borrow-text">
                                        <h2 className='mb-4'>32 Hampstead High Street, Hampstead, London, NW3 4UU</h2>
                                        <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                                            <h2>Borrow receipt BR210428SSSB1</h2>
                                            <h2>28/04/2021 | 15:36</h2>
                                        </div>
                                    </div>
                                    <h2>Borrowed</h2>
                                    <Swiper
                                        spaceBetween={10}
                                        slidesPerView={3}
                                        autoPlay={true}
                                        className='dv-swiper-wrapper-borrow'
                                    >
                                        <SwiperSlide className="dv-swiper-bg-slide d-flex flex-column align-items-center justify-content-center">
                                            <div className='dv-bg-slide-parent'>
                                                <img
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${placeHolder_img}`
                                                    }}
                                                    src={Glass} className='img-fluid' alt="bed mal"/>
                                            </div>
                                            <h2>1</h2>
                                        </SwiperSlide>
                                        <SwiperSlide className="dv-swiper-bg-slide d-flex flex-column align-items-center justify-content-center">
                                            <div className='dv-bg-slide-parent'>
                                                <img
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${placeHolder_img}`
                                                    }}
                                                    src={Glass} className='img-fluid' alt="bed mal"/>
                                            </div>
                                            <h2>2</h2>
                                        </SwiperSlide>
                                        <SwiperSlide className="dv-swiper-bg-slide d-flex flex-column align-items-center justify-content-center">
                                            <div className='dv-bg-slide-parent'>
                                                <img
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${placeHolder_img}`
                                                    }}
                                                    src={Glass} className='img-fluid' alt="bed mal"/>
                                            </div>
                                            <h2>3</h2>
                                        </SwiperSlide>
                                        <SwiperSlide className="dv-swiper-bg-slide d-flex flex-column align-items-center justify-content-center">
                                            <div className='dv-bg-slide-parent'>
                                                <img
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `${placeHolder_img}`
                                                    }}
                                                    src={Glass} className='img-fluid' alt="bed mal"/>
                                            </div>
                                            <h2>4</h2>
                                        </SwiperSlide>
                                    </Swiper>
                                    <h2>Returned</h2>
                                    <div className="dv-black-bg mb-3">
                                        <div className="d-flex flex-wrap align-items-center">
                                            <span className="dv-black-title mr-5">b.Cups</span>
                                            <div className="d-flex flex-column align-items-center mx-2">
                                                <div className="dv-circle-black">1</div>
                                                <span className='dv-span-black'>sleeve</span>
                                            </div>
                                            <div className="d-flex flex-column align-items-center mx-2">
                                                <div className="dv-circle-black">3</div>
                                                <span className='dv-span-black'>cup</span>
                                            </div>
                                            <div className="d-flex flex-column align-items-center mx-2">
                                                <div className="dv-circle-black">1</div>
                                                <span className='dv-span-black'>lid</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dv-black-bg mb-3">
                                        <div className="d-flex flex-wrap align-items-center">
                                            <span className="dv-black-title mr-5">b.Bags</span>
                                            <div className="d-flex flex-column align-items-center mx-2">
                                                <div className="dv-circle-black">5</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={this.handleEditBorrow} className={showEdit2 ? "dv-right-borrow-item" : 'd-none'}>
                                    <div className="d-flex justify-content-end mb-4">
                                        <button className='dv-cancel-borrow-item mx-1' type='button' onClick={this.handleClose}>Cancel</button>
                                        <button className='dv-update-borrow-item mx-1' type='submit'>Update</button>
                                    </div>
                                    <div className="px-md-5 dv-right-borrow-text">
                                        <h2 className='mb-4'>32 Hampstead High Street, Hampstead, London, NW3 4UU</h2>
                                        <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
                                            <h2>Borrow receipt BR210428SSSB1</h2>
                                            <h2>28/04/2021 | 15:36</h2>
                                        </div>
                                        <div className="d-flex justify-content-end mb-5 dv-yellow-borrow">
                                            <h2>Amended</h2>
                                            <h2 className='pl-4'>30/04/2021 | 10:12</h2>
                                        </div>
                                    </div>
                                    <h2>Borrowed</h2>
                                    <div className="dv-gray-bg mb-3">
                                        <div className="d-flex flex-wrap align-items-center">
                                            <span className="dv-black-title mr-5">b.Cups</span>
                                            <div className="d-flex flex-column align-items-center mx-2">
                                                <label htmlFor="dv-borrow-sleeve">
                                                    <input type="number" id='dv-borrow-sleeve' name={'sleeve'} onChange={this.inputHandler} value={this.state.sleeve} className='dv-borrow-cups-input'/>
                                                </label>
                                                <span className='dv-span-black'>sleeve</span>
                                            </div>
                                            <div className="d-flex flex-column align-items-center mx-2">
                                                <label htmlFor="dv-borrow-cups">
                                                    <input type="number" id={'dv-borrow-cups'} name={'cup'} onChange={this.inputHandler} value={this.state.cup} className='dv-borrow-cups-input'/>
                                                </label>
                                                <span className='dv-span-black'>cup</span>
                                            </div>
                                            <div className="d-flex flex-column align-items-center mx-2">
                                                <label htmlFor="dv-borrow-cups">
                                                    <input type="number" id={'dv-borrow-cups'} name={'lid'} onChange={this.inputHandler} value={this.state.lid} className='dv-borrow-cups-input'/>
                                                </label>
                                                <span className='dv-span-black'>lid</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dv-gray-bg mb-3">
                                        <div className="d-flex flex-wrap align-items-center">
                                            <span className="dv-black-title mr-5">b.Bags</span>
                                            <div className="d-flex flex-column align-items-center mx-2">
                                                <label htmlFor="dv-borrow-bags">
                                                    <input type="number" id={'dv-borrow-bags'} name={'bags'} onChange={this.inputHandler} value={this.state.bags} className='dv-borrow-cups-input'/>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <h2>Returned</h2>
                                    <div className="dv-black-bg mb-3">
                                        <div className="d-flex flex-wrap align-items-center">
                                            <span className="dv-black-title mr-5">b.Cups</span>
                                            <div className="d-flex flex-column align-items-center mx-2">
                                                <label htmlFor="dv-borrow-sleeve1">
                                                    <input type="number" id='dv-borrow-sleeve1' name={'sleeve1'} onChange={this.inputHandler} value={this.state.sleeve1} className='dv-borrow-cups-input'/>
                                                </label>
                                                <span className='dv-span-black'>sleeve</span>
                                            </div>
                                            <div className="d-flex flex-column align-items-center mx-2">
                                                <label htmlFor="dv-borrow-cups1">
                                                    <input type="number" id={'dv-borrow-cups1'} name={'cup1'} onChange={this.inputHandler} value={this.state.cup1} className='dv-borrow-cups-input'/>
                                                </label>
                                                <span className='dv-span-black'>cup</span>
                                            </div>
                                            <div className="d-flex flex-column align-items-center mx-2">
                                                <label htmlFor="dv-borrow-lid1">
                                                    <input type="number" id={'dv-borrow-lid1'} name={'lid1'} onChange={this.inputHandler} value={this.state.lid1} className='dv-borrow-cups-input'/>
                                                </label>
                                                <span className='dv-span-black'>lid</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dv-black-bg mb-3">
                                        <div className="d-flex flex-wrap align-items-center">
                                            <span className="dv-black-title mr-5">b.Bags</span>
                                            <div className="d-flex flex-column align-items-center mx-2">
                                                <label htmlFor="dv-borrow-bags2">
                                                    <input type="number" id={'dv-borrow-bags2'} name={'bags2'} onChange={this.inputHandler} value={this.state.bags2} className='dv-borrow-cups-input'/>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default BorrowReceiptsSelected;