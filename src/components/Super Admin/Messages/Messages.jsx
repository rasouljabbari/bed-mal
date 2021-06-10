import React, {Component} from 'react';
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import {Col, Modal, Nav, Row, Tab} from "react-bootstrap";
import Trash from '../../../assets/image/Icon material-delete.svg'
import './messages.scss'

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false, search_value: ''
        }
    }

    componentDidMount() {
        setTitle('Messages');
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    searchHandler = (e) => {
        e.preventDefault()
        console.log(this.state.search_value)
    }
    closeModal = () => {
        this.setState({show: false})
    }

    render() {
        return (
            <>
                <div className='d-flex flex-column flex-md-row w-100'>
                    {/*<LeftSideBarTerms/>*/}
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <div className='dv-left-sidebar-terms dv-left-sidebar-message'>
                            <div className="dv-btn-message-parent-sidebar">
                                <form action="" className='mb-0' onSubmit={this.searchHandler} dir='ltr'>
                                    <label htmlFor="dv-search"
                                           className='w-100 dv-vendor-search-label mb-0 position-relative'>
                                        <input type="search" placeholder='search' onChange={this.handleInput}
                                               value={this.state.search_value} name='search_value'
                                               className='dv-search-input'
                                               id='dv-search'/>
                                        <button type='submit' className='dv-search-icon'><i
                                            className='la la-search'/></button>
                                    </label>
                                </form>
                            </div>
                            <Nav variant="pills" className="flex-column dv-navbar-message">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">
                                        <div
                                            className='dv-list-items d-flex align-items-center justify-content-around w-100'>
                                            <div
                                                className="w-10 d-flex align-items-center justify-content-center">
                                                <div className='dv-circle-red'></div>
                                            </div>
                                            <div className="w-90 d-flex flex-column pl-2">
                                                <div
                                                    className="d-flex justify-content-between align-items-center">
                                                    <p className='dv-message-name my-2'>Tulips Cafe</p>
                                                    <p className='dv-message-date my-2 pr-3'>24/01/2021</p>
                                                </div>
                                                <p className='dv-message-text mb-1'>
                                                    Can I ask whether you have any gluten
                                                    free things in at the moment. My dcdasc sdalcasdc;l acvasd
                                                    nvk vdkvd
                                                    free things in at the moment. My dcdasc sdalcasdc;l acvasd
                                                    nvk vdkvd
                                                    free things in at the moment. My dcdasc sdalcasdc;l acvasd
                                                    nvk vdkvd
                                                    free things in at the moment. My dcdasc sdalcasdc;l acvasd
                                                    nvk vdkvd
                                                </p>
                                            </div>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">
                                        <div
                                            className='dv-list-items d-flex align-items-center justify-content-around w-100'>
                                            <div
                                                className="w-10 d-flex align-items-center justify-content-center">
                                                <div className='dv-circle-red'></div>
                                            </div>
                                            <div className="w-90 d-flex flex-column pl-2">
                                                <div
                                                    className="d-flex justify-content-between align-items-center">
                                                    <p className='dv-message-name my-2'>Tulips Cafe</p>
                                                    <p className='dv-message-date my-2 pr-3'>24/01/2021</p>
                                                </div>
                                                <p className='dv-message-text mb-1'>
                                                    Can I ask whether you have any gluten
                                                    free things in at the moment. My dcdasc sdalcasdc;l acvasd
                                                    nvk vdkvd
                                                    free things in at the moment. My dcdasc sdalcasdc;l acvasd
                                                    nvk vdkvd
                                                    free things in at the moment. My dcdasc sdalcasdc;l acvasd
                                                    nvk vdkvd
                                                    free things in at the moment. My dcdasc sdalcasdc;l acvasd
                                                    nvk vdkvd
                                                </p>
                                            </div>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <Tab.Content
                            className="dv-right-content-terms dv-bg-message dv-right-content-message py-3 position-relative">
                            <Tab.Pane eventKey="first">
                                <div>
                                    <div className="dv-user-name-parent mb-5">
                                        <div className='dv-user-name'>Sophie</div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="dv-messages-content">
                                            <div className="dv-user-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-admin-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>
                                                    Please try calling in. We stock different items every day.
                                                    Remember to contact us later.
                                                    Thanks for every for contacting us.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-user-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-admin-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>
                                                    Please try calling in. We stock different items every day.
                                                    Remember to contact us later.
                                                    Thanks for every for contacting us.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-user-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-admin-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>
                                                    Please try calling in. We stock different items every day.
                                                    Remember to contact us later.
                                                    Thanks for every for contacting us.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-user-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-admin-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>
                                                    Please try calling in. We stock different items every day.
                                                    Remember to contact us later.
                                                    Thanks for every for contacting us.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-user-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-admin-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>
                                                    Please try calling in. We stock different items every day.
                                                    Remember to contact us later.
                                                    Thanks for every for contacting us.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>

                                        </div>
                                    </div>

                                    <div
                                        className="mb-3 dv-messages-footer d-flex align-items-center justify-content-between">
                                        <h1>xdxv zv</h1>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div>
                                    <div className="dv-user-name-parent mb-5">
                                        <div className='dv-user-name'>Tulips Cafe</div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="dv-messages-content">
                                            <div className="dv-user-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-admin-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>
                                                    Please try calling in. We stock different items every day.
                                                    Remember to contact us later.
                                                    Thanks for every for contacting us.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-user-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-admin-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>
                                                    Please try calling in. We stock different items every day.
                                                    Remember to contact us later.
                                                    Thanks for every for contacting us.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-user-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-admin-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>
                                                    Please try calling in. We stock different items every day.
                                                    Remember to contact us later.
                                                    Thanks for every for contacting us.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-user-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-admin-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>
                                                    Please try calling in. We stock different items every day.
                                                    Remember to contact us later.
                                                    Thanks for every for contacting us.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-user-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>
                                            <div className="dv-admin-message-send d-flex flex-column mb-5">
                                                <p>We’re unable to accept BorrowBags we are very sorry about
                                                    that.</p>
                                                <p>
                                                    Please try calling in. We stock different items every day.
                                                    Remember to contact us later.
                                                    Thanks for every for contacting us.</p>
                                                <div className="dv-message-send-time">13:32</div>
                                            </div>

                                        </div>
                                    </div>

                                    <div
                                        className="mb-3 dv-messages-footer d-flex align-items-center justify-content-between">
                                        <h1>xdxv zv</h1>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>

            </>
        );
    }
}

export default Messages;