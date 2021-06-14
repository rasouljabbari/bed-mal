import React, {Component} from 'react';
import {editedItems, loader, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {Col, Modal, Nav, Row, Tab} from "react-bootstrap";
import Trash from '../../../assets/image/Icon material-delete.svg'
import './messages.scss'
import Camera from "../../../assets/image/Icon feather-camera.svg";
import MessageSendIcon from '../../../assets/image/Send button.svg'
import placeHolder_img from "../../../assets/image/bedmal-place-holder.jpg";
import axios from "axios";
import {MAIN_URL} from "../../../assets/scripts/GeneralVariables";
import {toast} from "react-toastify";

const Compress = require('compress.js')

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false, search_value: '', message_value: '', upload_image_show: false
        }
    }

    componentDidMount() {
        setTitle('Messages');
        alert('لیزی لود برعکس')
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
    // showImageUploade = () => {
    //     this.setState({upload_image_show: true})
    // }
    thisUploadImage = async (e) => {
        this.setState({upload_image_show: true})
        let file = e.target.files[0];
        const compress = new Compress();
        const resizedImage = await compress.compress([file], {
            size: 2, // the max size in MB, defaults to 2MB
            quality: 1, // the quality of the image, max is 1,
            maxWidth: 300, // the max width of the output image, defaults to 1920px
            maxHeight: 300, // the max height of the output image, defaults to 1920px
            resize: true // defaults to true, set false if you do not want to resize the image width and height
        })
        const img = resizedImage[0];
        const base64str = img.data
        const imgExt = img.ext
        const resizedFile = Compress.convertBase64ToFile(base64str, imgExt)

        let file_name = new File([resizedFile], file.name, {lastModified: file.lastModified, type: file.type});

        let fd = new FormData();
        fd.append('image', file_name);
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("Token")}`,
        };
        // loader(true)
        // axios.post(`${MAIN_URL}vendor/products/upload-image`, fd, {headers}).then(response => {
        //     if (response.status === 200) {
        //         loader()
        //         let arr = this.state.product_images;
        //         arr.push(response?.data.url)
        //         this.setState({
        //             product_images: arr
        //         })
        //     }
        // }).catch(error => {
        //     error.response?.data.errors.map((item) => {
        //         toast.error(item.message)
        //     })
        // })

    }
    handleMessageForm = async (e) => {
        e.preventDefault()
        console.log(this.state.message_value)
        this.setState({upload_image_show: false})
    }

    removeHandler = () => {
        this.setState({upload_image_show: false})
    }


    render() {
        return (
            <>
                <div className='d-flex flex-column flex-md-row w-100'>
                    {/*<LeftSideBarTerms/>*/}
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <div className='dv-left-sidebar-message'>
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
                            className="dv-right-content-message py-3 position-relative">
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
                                            {
                                                this.state.message_value ?
                                                    <div className="dv-user-message-send d-flex flex-column mb-5">
                                                        <p>{this.state.message_value}</p>
                                                        <div className="dv-message-send-time">13:32</div>
                                                    </div>
                                                    : ''
                                            }
                                        </div>
                                    </div>
                                    {
                                        this.state.upload_image_show ?
                                            <div className="dv-messages-footer-image">
                                                <form className='d-flex align-items-center my-3'
                                                      onSubmit={this.handleMessageForm}>
                                                    <label className='dv-upload-file-label-message'>
                                                        <img src={Camera} className='mx-3' alt=""/>
                                                        <input type="file" accept="image/*"
                                                               onChange={this.thisUploadImage}
                                                               className='dc-upload-file'/>
                                                    </label>
                                                    {/*{*/}
                                                    {/*    new_uploaded_img_arr?.map((item, i) => (*/}
                                                    <div className="dv-img-message-parent">
                                                        <img className='img-fluid'
                                                             onError={(e) => {
                                                                 e.target.onerror = null;
                                                                 e.target.src = `${placeHolder_img}`
                                                             }}
                                                            // src={`${MAIN_URL_IMAGE}${item}`} key={i}
                                                             src={placeHolder_img}
                                                             alt="Bed mal"/>
                                                        <i className="las la-times-circle dv-store-icons"
                                                           onClick={() => this.removeHandler(1)}/>
                                                    </div>
                                                    <button type='submit' className='dv-btn-send-message-icon'><img
                                                        src={MessageSendIcon} className='dv-send-message-icon'
                                                        alt='Bedmal'/>
                                                    </button>
                                                </form>

                                                {/*<form onSubmit={this.handleMessageForm}*/}
                                                {/*      className='w-100 mb-0 position-relative'>*/}
                                                {/*    <textarea rows={1} value={this.state.message_value} name='message_value'*/}
                                                {/*              onChange={this.handleInput} placeholder='Type message'*/}
                                                {/*              className='dv-message-input'/>*/}
                                                {/*    <button type='submit' className='dv-btn-send-message-icon'><img*/}
                                                {/*        src={MessageSendIcon} className='dv-send-message-icon' alt='Bedmal'/>*/}
                                                {/*    </button>*/}
                                                {/*</form>*/}
                                            </div> :
                                            <div
                                                className="dv-messages-footer d-flex align-items-center justify-content-between">
                                                <label className='dv-upload-file-label-message'>
                                                    <img src={Camera} className='mx-3' alt=""/>
                                                    <input type="file" accept="image/*"
                                                           onChange={this.thisUploadImage}
                                                           className='dc-upload-file'/>
                                                </label>
                                                <form onSubmit={this.handleMessageForm}
                                                      className='w-100 mb-0 position-relative'>
                                            <textarea rows={1} value={this.state.message_value} name='message_value'
                                                      onChange={this.handleInput} placeholder='Type message'
                                                      className='dv-message-input'/>
                                                    <button type='submit' className='dv-btn-send-message-icon'><img
                                                        src={MessageSendIcon} className='dv-send-message-icon'
                                                        alt='Bedmal'/>
                                                    </button>
                                                </form>
                                            </div>
                                    }
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