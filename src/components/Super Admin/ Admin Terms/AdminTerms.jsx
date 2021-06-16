import React, {Component} from 'react';
import './admin-terms.scss'
import Trash from '../../../assets/image/Icon material-delete.svg'
import {Link} from "react-router-dom";


class AdminTerms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doc_description: ''
        }
    }

    editTerms = () => {
        this.props.history.push('/admin/edit-terms')
    }

    render() {
        return (
            <>
                <div className='d-flex flex-column flex-xl-row dv-vendor'>
                    <div className="dv-terms-right-admin">
                        <div className="dv-btn-add-terms d-flex justify-content-center my-2">
                            <Link to={`/admin/add-terms`}
                                  className="dv-btn-term-new-doc d-flex align-items-center justify-content-center">
                                <span>New doc</span>
                                <i className='las la-plus dv-plus-icon pl-3'/>
                            </Link>
                        </div>
                        <ul>
                            {/*{*/}
                            {/*    this.state.items.length !== 0 ?*/}
                            {/*        this.state.items?.map((item, i) => (*/}
                            {/*            <li key={i}*/}
                            {/*                className={this.state.default_active === item.id ? "active dv-vendor-list-items d-flex flex-column align-items-start" : "dv-vendor-list-items d-flex flex-column align-items-start"}*/}
                            {/*                onClick={() => this.vendorListItemHandler(item.id)}>*/}
                            {/*                <h5 className='dv-vendor-list-title'>{item.name}</h5>*/}
                            {/*                <h5 className='mb-0 dv-vendor-list-title-2'>{item.postal_code}</h5>*/}
                            {/*            </li>*/}
                            {/*        )) : ''*/}
                            {/*}*/}
                            <li className={"dv-list-items active dv-vendor-list-items d-flex justify-content-between align-items-center"}>
                                <h5 className='dv-vendor-list-title mb-0'>Privacy Policy</h5>
                                <div className="d-flex align-items-center justify-content-end">
                                    <i className="las la-arrow-down dv-terms-sidebar-icon"
                                       onClick={() => this.downDepartment('down')}/>
                                    <i className="las la-arrow-up dv-terms-sidebar-icon mx-2"
                                       onClick={() => this.upDepartment('up')}/>
                                    <div className='dv-terms-sidebar-icon'>
                                        <img src={Trash} className='img-fluid' alt="bed mal" onClick={() => this.removeDepartment('trash')}/>
                                    </div>
                                    {/*<i className="las la-trash dv-terms-sidebar-icon"*/}
                                    {/*   onClick={() => this.removeDepartment('trash')}/>*/}
                                </div>
                            </li>
                            <li className={"dv-list-items dv-vendor-list-items d-flex justify-content-between align-items-center"}>
                                <h5 className='dv-vendor-list-title mb-0'>Borrow Terms</h5>
                                <div className="d-flex align-items-center justify-content-end">
                                    <i className="las la-arrow-down dv-terms-sidebar-icon"
                                       onClick={() => this.downDepartment('down')}/>
                                    <i className="las la-arrow-up dv-terms-sidebar-icon mx-2"
                                       onClick={() => this.upDepartment('up')}/>
                                    <div className='dv-terms-sidebar-icon'>
                                        <img src={Trash} className='img-fluid' alt="bed mal" onClick={() => this.removeDepartment('trash')}/>
                                    </div>
                                </div>
                            </li>
                            <li className={"dv-list-items dv-vendor-list-items d-flex justify-content-between align-items-center"}>
                                <h5 className='dv-vendor-list-title mb-0'>Terms of Use</h5>
                                <div className="d-flex align-items-center justify-content-end">
                                    <i className="las la-arrow-down dv-terms-sidebar-icon"
                                       onClick={() => this.downDepartment('down')}/>
                                    <i className="las la-arrow-up dv-terms-sidebar-icon mx-2"
                                       onClick={() => this.upDepartment('up')}/>
                                    <div className='dv-terms-sidebar-icon'>
                                        <img src={Trash} className='img-fluid' alt="bed mal" onClick={() => this.removeDepartment('trash')}/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='dv-terms-right-content'>
                        <div className="row">
                            <div className="col-12 mb-4 d-flex justify-content-between px-4 px-md-5">
                                <h2 className='mb-0'>Borrow Terms</h2>
                                <button onClick={this.editTerms} className='dv-edit-terms'>Edit</button>
                            </div>
                            <div className="col-12 mb-4 d-flex justify-content-between px-4">
                                {
                                    this.state.doc_description?
                                        <div className="dv-bg-light-terms">
                                            <p>{this.state.doc_description.replace(/\n\r?/g, '<br />')}</p>
                                        </div> :
                                        <div className="dv-bg-light-terms">
                                            <h2 className='text-center'>There is no item</h2>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>


                </div>
            </>
        );
    }
}

export default AdminTerms;