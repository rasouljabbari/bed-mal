import React, {Component} from 'react';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import './header.scss'
import {setTitle} from "../../assets/scripts/GeneralFunctions";
import LogoIcon from '../../assets/image/Icon feather-message-square.png'
import {NavLink} from "react-router-dom";

class Header extends Component {


    render() {
        return (
            <div className='dv-main-top-menu'>
            {/*<div className='dv-main-top-menu dv-top-menu-red'>*/}
                <Navbar collapseOnSelect expand="false" variant="dark">
                    <h4 className='mb-0' id='dv_header_title'></h4>
                    <Navbar.Brand className=' ml-lg-auto dv-navbar-logo d-flex align-items-center' href="#home">
                        <div className='position-relative'>
                            <img src={LogoIcon} className='img-fluid dv-header-icon' alt="bed mal"/>
                            <div className='dv-circle-red'></div>
                        </div>
                        <span>messages</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink activeClassName="active" to={'/admin/orders'}>Orders</NavLink>
                            <NavLink activeClassName="active" to={'/admin/vendors'}>Vendors</NavLink>
                            <NavLink activeClassName="active" to={'/admin/users'}>Users</NavLink>
                            <NavLink activeClassName="active" to={'/admin/departments'}>Departments</NavLink>
                            <NavDropdown title="Borrowing" id="basic-nav-dropdown">

                                <NavDropdown.Item>
                                    <NavLink activeClassName="active"
                                             to={'/admin/borrow-receipts'}>BorrowReceipt</NavLink>
                                </NavDropdown.Item>

                                <NavDropdown.Item>
                                    <NavLink activeClassName="active" to={'/admin/borrowing'}>Non-return fee</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <NavLink activeClassName="active" to={'/admin/borrowing-inventory'}>Inventory</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <NavLink activeClassName="active" to={'/admin/borrowing-active'}>Active</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <NavLink activeClassName="active" to={'/admin/borrowing-loan-report'}>Loan report</NavLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavLink activeClassName="active" to={'/admin/transactions'}>Transactions</NavLink>
                            <NavLink activeClassName="active" to={'/admin/logins'}>Logins</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


            </div>
        );
    }
}

export default Header;