import React, {Component} from 'react';
import './store.scss';
import {getData} from "../../../assets/scripts/GeneralFunctions";
import {Link} from "react-router-dom";
import {MAIN_URL, MAIN_URL_IMAGE} from "../../../assets/scripts/GeneralVariables";
import Excel from '../../../assets/image/Icon awesome-file-import.svg';
import Mask from '../../../assets/image/Display Photo Mask.png'
import Menu from "./Menu";
import placeHolder_img from "../../../assets/image/bedmal-place-holder.jpg";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_items: []
        }
    }
    async componentDidMount() {
        let items = await getData(MAIN_URL, `vendor/products`, 'get', {}, true, true);
        if (items?.status === 200) {
            this.setState({product_items: items.products})
        }
    }
    changeEyeStatus = async (id) => {
        let items = await getData(MAIN_URL, `vendor/products/change-status/${id}`, 'get', {}, true, true);
        if (items?.status === 200) {
            let product_items = this.state.product_items;
            let selected_item = product_items.find(element=> element.id === id);
            if(selected_item.live === 1){
                selected_item.live = 0
            }else{
                selected_item.live = 1
            }
            this.setState({product_items : product_items})
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
                    <div className="dv-overflow-auto">
                        {
                            this.state.product_items?.length !== 0 ?
                                <table className='dv-product-table w-100'>
                                    <thead>
                                    <tr>
                                        <th>Display photo</th>
                                        <th colSpan='2'>Product name</th>
                                        <th>Price</th>
                                        <th>Live</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.product_items?.map((item, i) => (
                                            <tr>
                                                <td>
                                                    <Link to={`/vendor/store/products/edit/${item.id}`}>
                                                        <div className="dv-table-img">
                                                            <img
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = `${placeHolder_img}`
                                                                }}
                                                                src={`${MAIN_URL_IMAGE}${item?.images[0]}`}
                                                                alt="bed mal" className='img-fluid'/>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td colSpan='2' className='pt-2 dv-product-name'>
                                                    <Link to={'/vendor/store/products/edit/1'}><p className='dv-custom-width'>{item.name}</p></Link>
                                                </td>
                                                <td>
                                                    <Link to={'/vendor/store/products/edit/1'}><span>£</span>
                                                        <span>{item.price}</span></Link>
                                                </td>
                                                <td>
                                                    <i className={item.live === 1 ? 'las la-eye dv-table-eye' : 'las la-eye-slash dv-table-eye'}
                                                       onClick={() => this.changeEyeStatus(item.id)}/>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table> : <h1 className='text-center'>There is no item</h1>
                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default Products;