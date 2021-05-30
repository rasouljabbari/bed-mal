import React, {Component} from 'react';
import './borrowing.scss'
import LeftSideBarBorrowing from "./LeftSideBarBorrowing/LeftSideBarBorrowing";
import {Link} from "react-router-dom";
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import Glass from '../../../assets/image/complete.png'
import {Modal} from "react-bootstrap";

class LoanReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_value: '',
            isAllBoardsLoaded: true,
            date_from: '',
            date_to: ''
        }
    }

    componentDidMount() {
        setTitle('Borrowing')
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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
    GenerateReport = (e) => {
        e.preventDefault()
    }


    render() {
        return (
            <div className='d-flex'>
                <div className="d-none d-md-block">
                    <LeftSideBarBorrowing/>
                </div>
                <div className="dv-borrowing-content dv-borrowing-content2 py-3 w-100">
                    <div className='lazyLoad container-fluid py-3 px-md-4' ref={this.myRef2}
                         onScroll={this.getDataOnScrolledBoards}>
                        <div className='row'>
                            <div className="col-12 col-md-8">
                                <h1>Loan report</h1>
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
                                <div className="d-flex flex-column align-items-start">
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
                            <div className='col-12'>
                                <form onSubmit={this.GenerateReport}
                                      className="dv-filter-loan align-items-center d-flex flex-column flex-md-row justify-content-center justify-content-md-between px-3 px-md-5">
                                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                                        <h5>Date Range</h5>
                                        <label className='ml-1'>
                                            <input type="date" name='date_from' value={this.state.date_from}
                                                   placeholder='From' onChange={this.handleInput}/>
                                        </label>
                                        <label className='ml-3'>
                                            <input type="date" name='date_to' value={this.state.date_to}
                                                   placeholder='To' onChange={this.handleInput}/>
                                        </label>
                                    </div>
                                    <button type='submit' className='dv-loan-btn mt-3 mt-md-0'>Generate Report</button>
                                </form>
                            </div>

                            <div className="col-12 mb-1">
                                <div className="dv-bg-items-loan mb-2">
                                    <h4 className='text-right dv-h4-loan mb-3'>01/04/21 - 30/04/21</h4>
                                    <div className='d-flex flex-column flex-sm-row w-100'>
                                        <div className="dv-glass-items d-flex flex-column mb-3 mb-md-0">
                                            <div className="img-parent-loan">
                                                <img src={Glass} className='img-fluid' alt="Bed mal"/>
                                            </div>
                                            <span>BorrowCup</span>
                                        </div>
                                        <div className="dv-glass-items-count d-flex flex-column mb-3 mb-md-0">
                                            <span className='dv-number-loan'>40</span>
                                            <span className='dv-loan-items-title'>Quantity</span>
                                        </div>
                                        <div className="dv-right-items-loan d-flex flex-column mb-3 mb-md-0">
                                            <div className="d-flex justify-content-between mb-3">
                                                <div className="dv-item-back-loan-title">On-demand</div>
                                                <div className="dv-item-back-loan-count">18</div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div className="dv-item-back-loan-title">Marketplace</div>
                                                <div className="dv-item-back-loan-count">18</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="col-12 mb-1">
                                <div className="dv-bg-items-loan mb-2">
                                    <h4 className='text-right dv-h4-loan mb-3'>01/04/21 - 30/04/21</h4>
                                    <div className='d-flex flex-column flex-sm-row w-100'>
                                        <div className="dv-glass-items d-flex flex-column mb-3 mb-md-0">
                                            <div className="img-parent-loan">
                                                <img src={Glass} className='img-fluid' alt="Bed mal"/>
                                            </div>
                                            <span>BorrowCup</span>
                                        </div>
                                        <div className="dv-glass-items-count d-flex flex-column mb-3 mb-md-0">
                                            <span className='dv-number-loan'>40</span>
                                            <span className='dv-loan-items-title'>Quantity</span>
                                        </div>
                                        <div className="dv-right-items-loan d-flex flex-column mb-3 mb-md-0">
                                            <div className="d-flex justify-content-between mb-3">
                                                <div className="dv-item-back-loan-title">On-demand</div>
                                                <div className="dv-item-back-loan-count">18</div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div className="dv-item-back-loan-title">Marketplace</div>
                                                <div className="dv-item-back-loan-count">18</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default LoanReport;