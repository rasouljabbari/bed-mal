import React, {Component} from 'react';
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import './orders-style..scss'
import {Link} from 'react-router-dom'

class Orders extends Component {
    constructor(props) {
        super(props);
        this.myRef2 = React.createRef()
        this.state = {
            search_value: ''
        }
    }

    componentDidMount() {
        setTitle('Orders')
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    searchHandler = (e) => {
        e.preventDefault()
        console.log(this.state.search_value)
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

    render() {
        return (
            <div className='lazyLoad container-fluid py-3 px-md-4' ref={this.myRef2}
                 onScroll={this.getDataOnScrolledBoards}>
                <div className='row'>
                    <div className="col-12 offset-md-8 col-md-4">
                        <form action="" onSubmit={this.searchHandler} dir='ltr'>
                            <label htmlFor="dv-search" className='w-100 position-relative'>
                                <input type="search" placeholder='search' onChange={this.handleInput}
                                       value={this.state.search_value} name='search_value' className='dv-search-input'
                                       id='dv-search'/>
                                <button type='submit' className='dv-search-icon'><i className='la la-search'/></button>
                            </label>
                        </form>
                    </div>
                    <div className="col-12">
                        <div >
                            <table className="table dv-orders-table text-center">
                                <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Vendor</th>
                                    <th scope="col">Order ref</th>
                                    <th scope="col">Value</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>01/05/21</td>
                                    <td>Sophie Smith</td>
                                    <td>Tulip Cafe</td>
                                    <td>O210501SSTC1</td>
                                    <td>£24.99</td>
                                    <td className='dv-arrow-right'><Link to={`/admin/orders/1`}><i
                                        className="las la-arrow-right"/></Link></td>
                                </tr>
                                <tr>
                                    <td>01/05/21</td>
                                    <td>Sophie Smith</td>
                                    <td>Tulip Cafe</td>
                                    <td>O210501SSTC1</td>
                                    <td>£24.99</td>
                                    <td className='dv-arrow-right'><Link to={`/admin/orders/1`}><i
                                        className="las la-arrow-right"/></Link></td>
                                </tr>
                                <tr>
                                    <td>01/05/21</td>
                                    <td>Sophie Smith</td>
                                    <td>Tulip Cafe</td>
                                    <td>O210501SSTC1</td>
                                    <td>£24.99</td>
                                    <td className='dv-arrow-right'><Link to={`/admin/orders/1`}><i
                                        className="las la-arrow-right"/></Link></td>
                                </tr>
                                <tr>
                                    <td>01/05/21</td>
                                    <td>Sophie Smith</td>
                                    <td>Tulip Cafe</td>
                                    <td>O210501SSTC1</td>
                                    <td>£24.99</td>
                                    <td className='dv-arrow-right'><Link to={`/admin/orders/1`}><i
                                        className="las la-arrow-right"/></Link></td>
                                </tr>
                                <tr>
                                    <td>01/05/21</td>
                                    <td>Sophie Smith</td>
                                    <td>Tulip Cafe</td>
                                    <td>O210501SSTC1</td>
                                    <td>£24.99</td>
                                    <td className='dv-arrow-right'><Link to={`/admin/orders/1`}><i
                                        className="las la-arrow-right"/></Link></td>
                                </tr>
                                <tr>
                                    <td>01/05/21</td>
                                    <td>Sophie Smith</td>
                                    <td>Tulip Cafe</td>
                                    <td>O210501SSTC1</td>
                                    <td>£24.99</td>
                                    <td className='dv-arrow-right'><Link to={`/admin/orders/1`}><i
                                        className="las la-arrow-right"/></Link></td>
                                </tr>
                                <tr>
                                    <td>01/05/21</td>
                                    <td>Sophie Smith</td>
                                    <td>Tulip Cafe</td>
                                    <td>O210501SSTC1</td>
                                    <td>£24.99</td>
                                    <td className='dv-arrow-right'><Link to={`/admin/orders/1`}><i
                                        className="las la-arrow-right"/></Link></td>
                                </tr>
                                <tr>
                                    <td>01/05/21</td>
                                    <td>Sophie Smith</td>
                                    <td>Tulip Cafe</td>
                                    <td>O210501SSTC1</td>
                                    <td>£24.99</td>
                                    <td className='dv-arrow-right'><Link to={`/admin/orders/1`}><i
                                        className="las la-arrow-right"/></Link></td>
                                </tr>
                                <tr>
                                    <td>01/05/21</td>
                                    <td>Sophie Smith</td>
                                    <td>Tulip Cafe</td>
                                    <td>O210501SSTC1</td>
                                    <td>£24.99</td>
                                    <td className='dv-arrow-right'><Link to={`/admin/orders/1`}><i
                                        className="las la-arrow-right"/></Link></td>
                                </tr>
                                <tr>
                                    <td>01/05/21</td>
                                    <td>Sophie Smith</td>
                                    <td>Tulip Cafe</td>
                                    <td>O210501SSTC1</td>
                                    <td>£24.99</td>
                                    <td className='dv-arrow-right'><Link to={`/admin/orders/1`}><i
                                        className="las la-arrow-right"/></Link></td>
                                </tr>
                                <tr>
                                    <td>01/05/21</td>
                                    <td>Sophie Smith</td>
                                    <td>Tulip Cafe</td>
                                    <td>O210501SSTC1</td>
                                    <td>£24.99</td>
                                    <td className='dv-arrow-right'><Link to={`/admin/orders/1`}><i
                                        className="las la-arrow-right"/></Link></td>
                                </tr>
                                <tr>
                                    <td>01/05/21</td>
                                    <td>Sophie Smith</td>
                                    <td>Tulip Cafe</td>
                                    <td>O210501SSTC1</td>
                                    <td>£24.99</td>
                                    <td className='dv-arrow-right'><Link to={`/admin/orders/1`}><i
                                        className="las la-arrow-right"/></Link></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Orders;