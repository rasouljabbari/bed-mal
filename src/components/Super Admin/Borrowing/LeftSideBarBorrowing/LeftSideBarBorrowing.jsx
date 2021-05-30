import React, {Component} from 'react';
import './LeftSideBarBorrowing.scss'
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import LogoIcon from "../../../../assets/image/Icon feather-message-square.png";
import {NavLink} from "react-router-dom";

class LeftSideBarBorrowing extends Component {
    render() {
        return (
            <>
                <Navbar collapseOnSelect variant="dark" className='dv-navbar-borrowing'>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="d-flex flex-column w-100">
                            <NavLink activeClassName="active" to={'/admin/borrow-receipts'}>BorrowReceipts</NavLink>
                            <NavLink activeClassName="active" to={'/admin/borrowing'}>Non-return fee</NavLink>
                            <NavLink activeClassName="active" to={'/admin/borrowing-inventory'}>Inventory</NavLink>
                            <NavLink activeClassName="active" to={'/admin/borrowing-active'}>Active</NavLink>
                            <NavLink activeClassName="active" to={'/admin/borrowing-loan-report'}>Loan report</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }
}

export default LeftSideBarBorrowing;