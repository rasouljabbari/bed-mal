import React, {Component} from 'react';
import './store.scss';
import {setTitle , getData} from "../../../assets/scripts/GeneralFunctions";
import {NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";

class Fulfilment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions_item:[]
        }
    }

    async componentDidMount() {
        setTitle('Store');
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
                    <h1>Fulfilment</h1>
                </div>

            </div>
        );
    }
}

export default Fulfilment;