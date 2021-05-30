import React, {Component} from 'react';
import './admin-terms.scss'
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

class LeftSideBarTerms extends Component {
    constructor(props) {
        super(props);

    }
    newDoc = () => {
        console.log('new doc')
    }
    removeDepartment = (id) =>{
        console.log(id)
    }
    downDepartment = (id) =>{
        console.log(id)
    }
    upDepartment = (id) =>{
        console.log(id)
    }

    render() {
        return (
            <div className='dv-left-sidebar-terms'>
                <div className="dv-btn-terms-parent-sidebar">
                    <button onClick={this.newDoc} className='dv-btn-term-new-doc'>New doc</button>
                </div>
                <div className='dv-navbar-terms'>
                    <div className="d-flex flex-column w-100">
                        <div className='dv-list-items d-flex align-items-center justify-content-around'>
                            <span>Privacy Policy</span>
                            <div className="d-flex align-items-center justify-content-end">
                                <i className="las la-arrow-down dv-terms-sidebar-icon" onClick={()=>this.downDepartment('down')}/>
                                <i className="las la-arrow-up dv-terms-sidebar-icon mx-2" onClick={()=>this.upDepartment('up')}/>
                                <i className="las la-trash dv-terms-sidebar-icon" onClick={()=>this.removeDepartment('trash')}/>
                            </div>
                        </div>
                        <div className='dv-list-items active d-flex align-items-center justify-content-around' >
                            <span>Borrow Terms</span>
                            <div className="d-flex align-items-center justify-content-end">
                                <i className="las la-arrow-down dv-terms-sidebar-icon" onClick={()=>this.downDepartment('down')}/>
                                <i className="las la-arrow-up dv-terms-sidebar-icon mx-2" onClick={()=>this.upDepartment('up')}/>
                                <i className="las la-trash dv-terms-sidebar-icon" onClick={()=>this.removeDepartment('trash')}/>
                            </div>
                        </div>
                        <div className='dv-list-items d-flex align-items-center justify-content-around' >
                            <span>Terms of Use</span>
                            <div className="d-flex align-items-center justify-content-end">
                                <i className="las la-arrow-down dv-terms-sidebar-icon" onClick={()=>this.downDepartment('down')}/>
                                <i className="las la-arrow-up dv-terms-sidebar-icon mx-2" onClick={()=>this.upDepartment('up')}/>
                                <i className="las la-trash dv-terms-sidebar-icon" onClick={()=>this.removeDepartment('trash')}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftSideBarTerms;