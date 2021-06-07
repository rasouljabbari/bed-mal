import React, {Component} from 'react';
import './store.scss';
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {Link, NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import Excel from '../../../assets/image/Icon awesome-file-import.svg';
import Mask from '../../../assets/image/Display Photo Mask.png'
import Menu from "./Menu";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions_item: []
        }
    }



    render() {
        return (
            <div className='d-flex flex-column flex-md-row dv-vendor'>
                <div className="dv-vendors-right-admin dv-vendors-right-admin-2">
                    <Menu/>
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