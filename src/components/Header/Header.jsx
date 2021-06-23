import React, {Component} from 'react';
import {Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import './header.scss'
import {getData, loader, setTitle} from "../../assets/scripts/GeneralFunctions";
import LogoIcon from '../../assets/image/Icon feather-message-square.png'
import {Link, NavLink} from "react-router-dom";
import {MAIN_URL} from "../../assets/scripts/GeneralVariables";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false, sureLogout: false, permissions: []
        }
    }

    async componentDidMount() {
        if (localStorage.getItem('Token')) {
            let storeDetails = await getData(MAIN_URL, `vendor/dashboard`, 'get', {}, true, true);
            if (storeDetails?.status === 200) {
                let key_arr = [];
                storeDetails.permissions?.map((item) => {
                    key_arr.push(item.key)
                })
                this.setState({permissions: key_arr})
            }
        }
    }

    handleToggle = () => {
        this.setState({
            isOpen: true
        });
    };
    closeNav = () => {
        this.setState({
            isOpen: false
        });
    }
    handleLogout = () => {
        this.setState({sureLogout: true})
    }
    handleCloseMenu = () => {
        this.setState({
            isOpen: false
        });
    }
    allowLogout = () => {

        this.setState({sureLogout: false, isOpen: false})
        localStorage.removeItem('Token')
        localStorage.removeItem('type')
        window.location.replace('/login')
        // this.props.history.push("/login");
    }
    closeModal = () => {
        this.setState({sureLogout: false})
    }


    render() {
        const {permissions} = this.state;

        // console.log(permissions)

        return (
            <div className='dv-main-top-menu d-flex justify-content-between align-items-center'>
                {/*<div className='dv-main-top-menu dv-top-menu-red'>*/}
                <h4 className='mb-0' id='dv_header_title'></h4>
                <Link to={
                    localStorage.getItem('type') === 'super_admin' ? '/admin/messages' : '/vendor/messages'}
                      className=' ml-lg-auto dv-navbar-logo d-flex align-items-center'>
                    <div className='position-relative'>
                        <img src={LogoIcon} className='img-fluid dv-header-icon' alt="bed mal"/>
                        <div className='dv-circle-red'></div>
                    </div>
                    <span>messages</span>
                </Link>
                <button className='dv-btn-toggle' onMouseDown={this.handleToggle} aria-controls="basic-navbar-nav"><i
                    className='la la-bars'/></button>


                <div id="mySidenav" className={ this.state.isOpen ? "show sidenav" :  "sidenav"}>
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                    {
                        localStorage.getItem('type') === 'super_admin' ?
                                <Nav className="mr-auto d-flex flex-column">
                                    <NavLink onClick={this.handleCloseMenu} className='pb-1' activeClassName="active"
                                             to={'/admin/orders'}>Orders</NavLink>
                                    <NavLink onClick={this.handleCloseMenu} className='pb-1' activeClassName="active"
                                             to={'/admin/vendors'}>Vendors</NavLink>
                                    <NavLink onClick={this.handleCloseMenu} className='pb-1' activeClassName="active"
                                             to={'/admin/users'}>Users</NavLink>
                                    <NavLink onClick={this.handleCloseMenu} className='pb-1' activeClassName="active"
                                             to={'/admin/terms'}>Legals</NavLink>
                                    <NavLink onClick={this.handleCloseMenu} className='pb-1' activeClassName="active"
                                             to={'/admin/departments'}>Departments</NavLink>
                                    <NavDropdown title="Borrowing" className='pb-1' id="basic-nav-dropdown">
                                        <NavDropdown.Item>
                                            <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                     to={'/admin/borrow-receipts'}>BorrowReceipt</NavLink>
                                        </NavDropdown.Item>

                                        <NavDropdown.Item>
                                            <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                     to={'/admin/borrowing'}>Non-return
                                                fee</NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                     to={'/admin/borrowing-inventory'}>Inventory</NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                     to={'/admin/borrowing-active'}>Active</NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                     to={'/admin/borrowing-loan-report'}>Loan
                                                report</NavLink>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavLink onClick={this.handleCloseMenu} className='pb-1' activeClassName="active"
                                             to={'/admin/transaction'}>Transactions</NavLink>
                                    <NavLink onClick={this.handleCloseMenu} className='pb-1' activeClassName="active"
                                             to={'/admin/logins'}>Logins</NavLink>
                                    <button onClick={this.handleLogout} className='dv-logout'>Logout</button>
                                </Nav>
                            : localStorage.getItem('type') === 'vendor_admin' ?
                                <Nav className="mr-auto d-flex flex-column">
                                    <NavLink onClick={this.handleCloseMenu} activeClassName="active" className='pb-1'
                                             to={'/vendor/orders'}>Orders</NavLink>
                                    <NavDropdown title="Store" className='pb-1' id="basic-nav-dropdown">
                                        <NavDropdown.Item>
                                            <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                     to={{
                                                         pathname: "/vendor/store/details"
                                                     }}>Store details</NavLink>
                                        </NavDropdown.Item>

                                        <NavDropdown.Item>
                                            <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                     to={{
                                                         pathname: "/vendor/store/collections"
                                                     }}>Collections</NavLink>
                                        </NavDropdown.Item>

                                        <NavDropdown.Item>
                                            <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                     to={{
                                                         pathname: "/vendor/store/products"
                                                     }}>Products</NavLink>
                                        </NavDropdown.Item>

                                        <NavDropdown.Item>
                                            <NavLink onClick={this.handleCloseMenu} activeClassName="active" to={{
                                                pathname: "/vendor/store/fulfillment"
                                            }}>Fulfillment</NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                     to={{pathname: "/vendor/store/borrow-products"}}>BorrowProducts</NavLink>
                                        </NavDropdown.Item>

                                    </NavDropdown>
                                    <NavLink onClick={this.handleCloseMenu} activeClassName="active" className='pb-1'
                                             to={'/vendor/transaction'}>Transactions</NavLink>
                                    <NavLink onClick={this.handleCloseMenu} activeClassName="active" className='pb-1'
                                             to={{pathname: "/vendor/store/permissions"}}>Logins & Permissions</NavLink>
                                    <button onClick={this.handleLogout} className='dv-logout pb-1'>Logout</button>
                                </Nav>
                            :
                            <Nav className="mr-auto d-flex flex-column">
                                <NavLink onClick={this.handleCloseMenu} activeClassName="active" className='pb-1'
                                         to={'/vendor/orders'}>Orders</NavLink>
                                <NavDropdown title="Store" className='pb-1' id="basic-nav-dropdown">
                                    {
                                        permissions.length !== 0 ?
                                            permissions?.map((itm) => (
                                                itm === 'store-details' ?
                                                    <NavDropdown.Item>
                                                        <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                                 to={{
                                                                     pathname: "/vendor/store/details"
                                                                 }}>Store details</NavLink>
                                                    </NavDropdown.Item>
                                                    :  itm === 'collection' ?
                                                    <NavDropdown.Item>
                                                        <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                                 to={{
                                                                     pathname: "/vendor/store/collections"
                                                                 }}>Collections</NavLink>
                                                    </NavDropdown.Item>
                                                    : itm === 'products' ?
                                                        <NavDropdown.Item>
                                                            <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                                     to={{
                                                                         pathname: "/vendor/store/products"
                                                                     }}>Collections</NavLink>
                                                        </NavDropdown.Item>
                                                        : ''
                                            )) : ''
                                    }
                                    <NavDropdown.Item>
                                        <NavLink onClick={this.handleCloseMenu} activeClassName="active" to={{
                                            pathname: "/vendor/store/fulfillment"
                                        }}>Fulfillment</NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                 to={{pathname: "/vendor/store/borrow-products"}}>BorrowProducts</NavLink>
                                    </NavDropdown.Item>

                                </NavDropdown>
                                <NavLink onClick={this.handleCloseMenu} activeClassName="active" className='pb-1'
                                         to={'/vendor/transaction'}>Transactions</NavLink>
                                {
                                    permissions.length !== 0 ?
                                        permissions?.map((itm) => (
                                            itm === 'logins' ?
                                                <NavLink onClick={this.handleCloseMenu} activeClassName="active"
                                                         className='pb-1'
                                                         to={{pathname: "/vendor/store/permissions"}}>Logins &
                                                    Permissions</NavLink>
                                                : ''
                                        )) : ''

                                }

                                <button onClick={this.handleLogout} className='dv-logout pb-1'>Logout</button>
                            </Nav>
                    }
                </div>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.sureLogout}
                       onHide={this.closeModal}>
                    <Modal.Body className='p-5'>
                        <div className="row justify-content-center">
                            <div className="col-12 mb-4">
                                <h5 className='dv-h5'>Are you sure ?</h5>
                            </div>
                            <div className="col-12 mt-3 d-flex justify-content-center align-items-center">
                                <button className='dv-cancel-btn d-flex justify-content-center' type='button'
                                        onClick={this.closeModal}>No
                                </button>
                                <button className='dv-access-btn d-flex justify-content-center' type='button'
                                        onClick={this.allowLogout}>Yes
                                </button>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>

            </div>
        );
    }
}

export default Header;