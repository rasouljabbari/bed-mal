import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";
import {getData, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions_item: []
        }
    }

    async componentDidMount() {
        setTitle('Store')
        if (localStorage.getItem('Token')) {
            let storeDetails = await getData(MAIN_URL, `vendor/dashboard`, 'get', {}, true, true);
            if (storeDetails?.status === 200) {
                let key_arr = [];
                storeDetails.permissions?.map((item) => {
                    key_arr.push(item.key)
                })
                this.setState({permissions_item: key_arr})
            }
        }
    }

    render() {
        return (
            <>
                <Nav>
                    {
                        localStorage.getItem('type') === 'vendor_admin' ?
                            <>
                                <NavLink activeClassName="active"
                                         className='dv-vendor-store-list-items d-flex flex-column align-items-start my-5'
                                         to={'/vendor/store/details'}>Store details</NavLink>
                                <NavLink activeClassName="active"
                                         className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                         to={'/vendor/store/collections'}>Collections</NavLink>
                                <NavLink activeClassName="active"
                                         className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                         to={'/vendor/store/fulfillment'}>Fulfillment</NavLink>
                                <NavLink activeClassName="active"
                                         className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                         to={'/vendor/store/borrow-products'}>Borrow products</NavLink>
                                <NavLink activeClassName="active"
                                         className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-0'
                                         to={'/vendor/store/products'}>Products</NavLink>
                                <NavLink activeClassName="active"
                                         className='dv-vendor-store-list-items d-flex flex-column align-items-start my-5'
                                         to={'/vendor/store/permissions'}>Permissions</NavLink>
                            </> :
                            <>
                                {
                                    this.state.permissions_item.length !== 0 ?
                                        this.state.permissions_item?.map((item) => (
                                            item === 'store-details' ?
                                                <NavLink activeClassName="active"
                                                         className='dv-vendor-store-list-items d-flex flex-column align-items-start mt-5 mb-3'
                                                         to={'/vendor/store/details'}>Store details</NavLink>
                                                : ''
                                        )) : ''
                                }
                                {
                                    this.state.permissions_item.length !== 0 ?
                                        this.state.permissions_item?.map((item) => (
                                            item === 'collection' ?
                                                <NavLink activeClassName="active"
                                                         className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                                         to={'/vendor/store/collections'}>Collections</NavLink>
                                                : ''
                                        ))
                                        : ''
                                }

                                {
                                    this.state.permissions_item.length !== 0 ?
                                        this.state.permissions_item?.map((item) => (
                                            item === 'fulfillment' ?
                                                <NavLink activeClassName="active"
                                                         className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                                         to={'/vendor/store/fulfillment'}>Fulfillment</NavLink>
                                                : ''
                                        ))
                                        : ''
                                }

                                {
                                    this.state.permissions_item.length !== 0 ?
                                        this.state.permissions_item?.map((item) => (
                                            item === 'borrow-products' ?
                                                <NavLink activeClassName="active"
                                                         className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                                         to={'/vendor/store/borrow-products'}>Borrow products</NavLink>
                                                : ''
                                        ))
                                        : ''
                                }

                                {
                                    this.state.permissions_item.length !== 0 ?
                                        this.state.permissions_item?.map((item) => (
                                            item === 'product' ?
                                                <NavLink activeClassName="active"
                                                         className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                                         to={'/vendor/store/products'}>Products</NavLink> : ''
                                        )) : ''
                                }
                                {
                                    this.state.permissions_item.length !== 0 ?
                                        this.state.permissions_item?.map((item) => (
                                            item === 'logins' ?
                                                <NavLink activeClassName="active"
                                                         className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                                         to={'/vendor/store/permissions'}>Permissions</NavLink>
                                                : ''
                                        )) : ''
                                }
                            </>
                    }

                </Nav>
            </>
        );
    }
}

export default Menu;