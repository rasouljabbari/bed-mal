import React, {Component} from 'react';
import {setTitle} from "../../../assets/scripts/GeneralFunctions";

class VendorMessages extends Component {
    componentDidMount() {
        setTitle('Messages');
    }
    render() {

        return (
            <>
                <div className='d-flex align-items-center justify-content-center h-100'>
                    <h1>Messages</h1>
                </div>
            </>
        );
    }
}

export default VendorMessages;