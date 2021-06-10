import React, {Component} from 'react';
import './store.scss';
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import Menu from './Menu'

class Fulfillment extends Component {

    async componentDidMount() {
        setTitle('Store');
    }


    render() {
        return (
            <div className='d-flex flex-column flex-md-row dv-vendor'>
                <div className="dv-vendors-right-admin dv-vendors-right-admin-2">
                    <Menu/>
                </div>
                <div className='dv-vendor-right-content dv-vendor-right-content-2 position-relative'>
                    <h1>Fulfillment</h1>
                </div>

            </div>
        );
    }
}

export default Fulfillment;