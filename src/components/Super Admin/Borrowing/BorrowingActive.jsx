import React, {Component} from 'react';
import './borrowing.scss'
import LeftSideBarBorrowing from "./LeftSideBarBorrowing/LeftSideBarBorrowing";
import {Link} from "react-router-dom";
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import Glass from '../../../assets/image/complete.png'

class BorrowingActive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_value: ''
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
    plusHandler = (id) =>{
        console.log(id)
    }
    minusHandler = (id) =>{
        console.log(id)
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
                                <h1>Active</h1>
                            </div>
                            <div className="col-12 col-md-4">
                                <form action="" onSubmit={this.searchHandler} dir='ltr'>
                                    <label htmlFor="dv-search" className='w-100 position-relative'>
                                        <input type="search" placeholder='search' onChange={this.handleInput}
                                               value={this.state.search_value} name='search_value'
                                               className='dv-search-input'
                                               id='dv-search'/>
                                        <button type='submit' className='dv-search-icon'><i className='la la-search'/>
                                        </button>
                                    </label>
                                </form>
                            </div>
                            <div className="col-12">
                                <div>
                                    <table className="table dv-orders-table text-center">
                                        <thead>
                                        <tr>
                                            <th scope="col">User ID</th>
                                            <th scope="col">User</th>
                                            <th scope="col">BorrowReceipt</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Due</th>
                                            <th scope="col">Extra day</th>
                                            <th scope="col">Free</th>
                                        </tr>
                                        </thead>
                                        <tbody className='text-center'>
                                        <tr>
                                            <td>123456</td>
                                            <td>Sophie Smith</td>
                                            <td><Link to={`/admin/borrow-receipts/1`} className='dv-borrowing-span'>O210501SSTC1</Link></td>
                                            <td className='pt-2'>
                                                <div className="dv-img-table-active-parent">
                                                    <img src={Glass} className='img-fluid' alt="bed mal"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="dv-borrowing-active-number">1</div>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.plusHandler(1)} className="dv-borrowing-active-icon-plus">
                                                    <i className='las la-plus'/>
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.minusHandler(2)} className="dv-borrowing-active-icon-minus">
                                                    <i className='las la-minus'/>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>123456</td>
                                            <td>Sophie Smith</td>
                                            <td><Link to={`/admin/borrow-receipts/1`} className='dv-borrowing-span'>O210501SSTC1</Link></td>
                                            <td className='pt-2'>
                                                <div className="dv-img-table-active-parent">
                                                    <img src={Glass} className='img-fluid' alt="bed mal"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="dv-borrowing-active-number">1</div>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.plusHandler(1)} className="dv-borrowing-active-icon-plus">
                                                    <i className='las la-plus'/>
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.minusHandler(2)} className="dv-borrowing-active-icon-minus">
                                                    <i className='las la-minus'/>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>123456</td>
                                            <td>Sophie Smith</td>
                                            <td><Link to={`/admin/borrow-receipts/1`} className='dv-borrowing-span'>O210501SSTC1</Link></td>
                                            <td className='pt-2'>
                                                <div className="dv-img-table-active-parent">
                                                    <img src={Glass} className='img-fluid' alt="bed mal"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="dv-borrowing-active-number">1</div>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.plusHandler(1)} className="dv-borrowing-active-icon-plus">
                                                    <i className='las la-plus'/>
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.minusHandler(2)} className="dv-borrowing-active-icon-minus">
                                                    <i className='las la-minus'/>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>123456</td>
                                            <td>Sophie Smith</td>
                                            <td><Link to={`/admin/borrow-receipts/1`} className='dv-borrowing-span'>O210501SSTC1</Link></td>
                                            <td className='pt-2'>
                                                <div className="dv-img-table-active-parent">
                                                    <img src={Glass} className='img-fluid' alt="bed mal"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="dv-borrowing-active-number">1</div>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.plusHandler(1)} className="dv-borrowing-active-icon-plus">
                                                    <i className='las la-plus'/>
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.minusHandler(2)} className="dv-borrowing-active-icon-minus">
                                                    <i className='las la-minus'/>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>123456</td>
                                            <td>Sophie Smith</td>
                                            <td><Link to={`/admin/borrow-receipts/1`} className='dv-borrowing-span'>O210501SSTC1</Link></td>
                                            <td className='pt-2'>
                                                <div className="dv-img-table-active-parent">
                                                    <img src={Glass} className='img-fluid' alt="bed mal"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="dv-borrowing-active-number">1</div>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.plusHandler(1)} className="dv-borrowing-active-icon-plus">
                                                    <i className='las la-plus'/>
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.minusHandler(2)} className="dv-borrowing-active-icon-minus">
                                                    <i className='las la-minus'/>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>123456</td>
                                            <td>Sophie Smith</td>
                                            <td><Link to={`/admin/borrow-receipts/1`} className='dv-borrowing-span'>O210501SSTC1</Link></td>
                                            <td className='pt-2'>
                                                <div className="dv-img-table-active-parent">
                                                    <img src={Glass} className='img-fluid' alt="bed mal"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="dv-borrowing-active-number">1</div>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.plusHandler(1)} className="dv-borrowing-active-icon-plus">
                                                    <i className='las la-plus'/>
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.minusHandler(2)} className="dv-borrowing-active-icon-minus">
                                                    <i className='las la-minus'/>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>123456</td>
                                            <td>Sophie Smith</td>
                                            <td><Link to={`/admin/borrow-receipts/1`} className='dv-borrowing-span'>O210501SSTC1</Link></td>
                                            <td className='pt-2'>
                                                <div className="dv-img-table-active-parent">
                                                    <img src={Glass} className='img-fluid' alt="bed mal"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="dv-borrowing-active-number">1</div>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.plusHandler(1)} className="dv-borrowing-active-icon-plus">
                                                    <i className='las la-plus'/>
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.minusHandler(2)} className="dv-borrowing-active-icon-minus">
                                                    <i className='las la-minus'/>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>123456</td>
                                            <td>Sophie Smith</td>
                                            <td><Link to={`/admin/borrow-receipts/1`} className='dv-borrowing-span'>O210501SSTC1</Link></td>
                                            <td className='pt-2'>
                                                <div className="dv-img-table-active-parent">
                                                    <img src={Glass} className='img-fluid' alt="bed mal"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="dv-borrowing-active-number">1</div>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.plusHandler(1)} className="dv-borrowing-active-icon-plus">
                                                    <i className='las la-plus'/>
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.minusHandler(2)} className="dv-borrowing-active-icon-minus">
                                                    <i className='las la-minus'/>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>123456</td>
                                            <td>Sophie Smith</td>
                                            <td><Link to={`/admin/borrow-receipts/1`} className='dv-borrowing-span'>O210501SSTC1</Link></td>
                                            <td className='pt-2'>
                                                <div className="dv-img-table-active-parent">
                                                    <img src={Glass} className='img-fluid' alt="bed mal"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="dv-borrowing-active-number">1</div>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.plusHandler(1)} className="dv-borrowing-active-icon-plus">
                                                    <i className='las la-plus'/>
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.minusHandler(2)} className="dv-borrowing-active-icon-minus">
                                                    <i className='las la-minus'/>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>123456</td>
                                            <td>Sophie Smith</td>
                                            <td><Link to={`/admin/borrow-receipts/1`} className='dv-borrowing-span'>O210501SSTC1</Link></td>
                                            <td className='pt-2'>
                                                <div className="dv-img-table-active-parent">
                                                    <img src={Glass} className='img-fluid' alt="bed mal"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="dv-borrowing-active-number">1</div>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.plusHandler(1)} className="dv-borrowing-active-icon-plus">
                                                    <i className='las la-plus'/>
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.minusHandler(2)} className="dv-borrowing-active-icon-minus">
                                                    <i className='las la-minus'/>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>123456</td>
                                            <td>Sophie Smith</td>
                                            <td><Link to={`/admin/borrow-receipts/1`} className='dv-borrowing-span'>O210501SSTC1</Link></td>
                                            <td className='pt-2'>
                                                <div className="dv-img-table-active-parent">
                                                    <img src={Glass} className='img-fluid' alt="bed mal"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="dv-borrowing-active-number">1</div>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.plusHandler(1)} className="dv-borrowing-active-icon-plus">
                                                    <i className='las la-plus'/>
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.minusHandler(2)} className="dv-borrowing-active-icon-minus">
                                                    <i className='las la-minus'/>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>123456</td>
                                            <td>Sophie Smith</td>
                                            <td><Link to={`/admin/borrow-receipts/1`} className='dv-borrowing-span'>O210501SSTC1</Link></td>
                                            <td className='pt-2'>
                                                <div className="dv-img-table-active-parent">
                                                    <img src={Glass} className='img-fluid' alt="bed mal"/>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="dv-borrowing-active-number">1</div>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.plusHandler(1)} className="dv-borrowing-active-icon-plus">
                                                    <i className='las la-plus'/>
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={()=>this.minusHandler(2)} className="dv-borrowing-active-icon-minus">
                                                    <i className='las la-minus'/>
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BorrowingActive;