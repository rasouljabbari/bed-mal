import React, {Component} from 'react';
import './store.scss';

import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import {NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";

class Collections extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        setTitle('Store')
    }


    render() {
        return (
            <div className='d-flex flex-column flex-md-row dv-vendor overflow-hidden'>
                <div className="dv-vendors-right-admin dv-vendors-right-admin-2">

                    <Nav>
                        <NavLink activeClassName="active" className='dv-vendor-store-list-items d-flex flex-column align-items-start my-5' to={'/vendor/store/details'}>Store details</NavLink>
                        <NavLink activeClassName="active" className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3' to={'/vendor/store/collections'}>Collections</NavLink>
                        <NavLink activeClassName="active" className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3' to={'/vendor/store/fulfilment'}>Fulfilment</NavLink>
                        <NavLink activeClassName="active" className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3' to={'/vendor/store/borrow-products'}>Borrow products</NavLink>
                        <NavLink activeClassName="active" className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-0' to={'/vendor/store/products'}>Products</NavLink>
                        <NavLink activeClassName="active" className='dv-vendor-store-list-items d-flex flex-column align-items-start my-5' to={'/vendor/store/permissions'}>Permissions</NavLink>
                    </Nav>

                </div>
                <div className='dv-vendor-right-content dv-vendor-right-content-2 position-relative'>
                    <h1>Collections</h1>
                </div>

            </div>
        );
    }
}

export default Collections;