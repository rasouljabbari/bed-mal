import React, {Component} from 'react';
import './transaction.scss'
import {setTitle} from "../../../assets/scripts/GeneralFunctions";

class VendorTransactions extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        setTitle('Transactions');
    }

    render() {
        return (
            <>
                <div className='d-flex align-items-center justify-content-center h-100'>
                    <h1>Not sure how this and invoice export will function yet.</h1>
                </div>
            </>
        );
    }
}

export default VendorTransactions;