import React, {Component} from 'react';
import './transaction.scss'
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {setTitle} from "../../../assets/scripts/GeneralFunctions";

class Transactions extends Component {
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
                    <h1>Not sure how this will function yet.</h1>
                </div>
            </>
        );
    }
}

export default Transactions;