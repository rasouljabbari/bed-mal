import React, {Component} from 'react';
import './borrowing.scss'
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import LeftSideBarBorrowing from "./LeftSideBarBorrowing/LeftSideBarBorrowing";
class Borrowing extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        setTitle('Borrowing')
    }
    editHandler = (id) =>{
        console.log(id)
    }

    render() {
        return (
            <div className='d-flex'>
                <div className="d-none d-md-block">
                    <LeftSideBarBorrowing/>
                </div>
                <div className="dv-borrowing-content py-3 px-4 w-100">
                    <h1 className='mb-3'>Non-return fees</h1>
                    <div className="dv-borrowing-content-light w-100">
                        <table className='w-100 dv-table-borrowing mb-3'>
                            <tr>
                                <th>Borrow item</th>
                                <th className='text-center'>Fee</th>
                                <th className='text-center'>Edit</th>
                            </tr>
                            <tr>
                                <td>Sleeve</td>
                                <td className='dv-fee-number text-center'>£1.99</td>
                                <td className='text-center'>
                                    <button className='dv-btn-edit-borrowing-table' onClick={()=>this.editHandler(20)}><i className='las la-pen'></i></button>
                                </td>
                            </tr>

                            <tr>
                                <td>Cup</td>
                                <td className='dv-fee-number text-center'>£1.99</td>
                                <td className='text-center'>
                                    <button className='dv-btn-edit-borrowing-table' onClick={()=>this.editHandler(20)}><i className='las la-pen'></i></button>
                                </td>
                            </tr>

                            <tr>
                                <td>Lid</td>
                                <td className='dv-fee-number text-center'>£3.99</td>
                                <td className='text-center'>
                                    <span className='dv-save-borrowing'>save</span>
                                </td>
                            </tr>

                            <tr>
                                <td>Bag</td>
                                <td className='dv-fee-number text-center'>£5.99</td>
                                <td className='text-center'>
                                    <button className='dv-btn-edit-borrowing-table' onClick={()=>this.editHandler(20)}><i className='las la-pen'></i></button>
                                </td>
                            </tr>
                        </table>
                        <div className='dv-text-after-table'>
                            <p>NB - Remember to update the legal documents to match these terms.</p>
                            <ol>
                                <li>Borrow terms</li>
                                <li>Borrow term overlay links</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Borrowing;