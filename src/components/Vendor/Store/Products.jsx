import React, {Component} from 'react';
import './store.scss';
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {Link, NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import Excel from '../../../assets/image/Icon awesome-file-import.svg';
import Mask from '../../../assets/image/Display Photo Mask.png'

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions_item: []
        }
    }

    async componentDidMount() {
        setTitle('Store')
        if(localStorage.getItem('Token')){
            let storeDetails = await getData(MAIN_URL, `vendor/dashboard`, 'get', {}, true, true);
            if (storeDetails?.status === 200) {
                let key_arr = [];
                storeDetails.permissions?.map((item)=>{
                    key_arr.push(item.key)
                })
                this.setState({permissions_item : key_arr})
            }
        }
    }


    render() {
        return (
            <div className='d-flex flex-column flex-md-row dv-vendor'>
                <div className="dv-vendors-right-admin dv-vendors-right-admin-2">

                    <Nav>
                        {
                            this.state.permissions_item?.map((item)=>(
                                item === 'store-details' ?
                                    <NavLink activeClassName="active"
                                             className='dv-vendor-store-list-items d-flex flex-column align-items-start my-5'
                                             to={'/vendor/store/details'}>Store details</NavLink>
                                    : ''
                            ))
                        }
                        {
                            this.state.permissions_item?.map((item)=>(
                                item === 'collection' && item !== 'store-details' ?
                                    <NavLink activeClassName="active"
                                             className='dv-vendor-store-list-items d-flex flex-column align-items-start my-5 mb-3'
                                             to={'/vendor/store/collections'}>Collections</NavLink>
                                    : item === 'collection' ?
                                    <NavLink activeClassName="active"
                                             className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                             to={'/vendor/store/collections'}>Collections</NavLink>
                                    : ''
                            ))
                        }
                        <NavLink activeClassName="active"
                                 className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                 to={'/vendor/store/fulfilment'}>Fulfilment</NavLink>
                        <NavLink activeClassName="active"
                                 className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                 to={'/vendor/store/borrow-products'}>Borrow products</NavLink>
                        <NavLink activeClassName="active"
                                 className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-0'
                                 to={'/vendor/store/products'}>Products</NavLink>
                        {
                            this.state.permissions_item?.map((item)=>(
                                item === 'logins' ?
                                    <NavLink activeClassName="active"
                                             className='dv-vendor-store-list-items d-flex flex-column align-items-start my-5'
                                             to={'/vendor/store/permissions'}>Permissions</NavLink>
                                    : ''
                            ))
                        }

                    </Nav>

                </div>
                <div className='dv-vendor-right-content dv-vendor-right-content-2 position-relative'>
                    <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center mb-3">
                        <h2>Products</h2>
                        <div className="d-flex align-items-center">
                            <div className="dv-excel-parent mr-2">
                                <img src={Excel} alt="bedmal"/>
                            </div>
                            <Link to={'/vendor/store/products/create'} className='dv-btn-new-product'>New product</Link>
                        </div>
                    </div>
                    <div className="overflow-auto">
                        <table className='dv-product-table w-100'>
                            <thead>
                            <tr>
                                <th >Display photo</th>
                                <th colSpan='2'>Product name</th>
                                <th >Price</th>
                                <th >Live</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div className="dv-table-img">
                                        <img src={Mask} alt="bed mal" className='img-fluid'/>
                                    </div>
                                </td>
                                <td  colSpan='2' className='pt-2 dv-product-name'>Product name</td>
                                <td >£1000.01</td>
                                <td>
                                    <i className='las la-eye dv-table-eye'/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="dv-table-img">
                                        <img src={Mask} alt=""/>
                                    </div>
                                </td>
                                <td colSpan={2} className='pt-2 dv-product-name'>Product name</td>
                                <td >£1000.01</td>
                                <td>
                                    <i className='las la-eye-slash dv-table-eye'/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        );
    }
}

export default Products;