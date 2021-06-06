import React, {Component} from 'react';
import './store.scss'
import {Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {getData, loader, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {MAIN_URL, MAIN_URL_IMAGE} from "../../../assets/scripts/GeneralVariables";
import {Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import placeHolder_img from "../../../assets/image/bedmal-place-holder.jpg";
import Img from '../../../assets/image/Add image button.png';
import axios from "axios";
import Swal from "sweetalert2";
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions_item: [],
            product_name: '', product_description: '', new_product_name: '', ribbon: '', product_price: '',
            section_title: '', section_description: '',
            show_add_product_name: false, add_new_section_show: false,
        }
    }

    async componentDidMount() {
        setTitle('Store')
        if (localStorage.getItem('Token')) {
            let storeDetails = await getData(MAIN_URL, `vendor/dashboard`, 'get', {}, true, true);
            if (storeDetails?.status === 200) {
                let key_arr = [];
                storeDetails.permissions?.map((item) => {
                    key_arr.push(item.key)
                })
                this.setState({permissions_item: key_arr})
            }
        }
    }



    // Start Add product name handler
    addProductName = () => {
        this.setState({show_add_product_name: true})
    }
    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    saveNewProductName = (e) => {
        e.preventDefault()
        this.setState({show_add_product_name: false})
        toast.success('product name added successful')
    }
    // End Add product name handler

    // Start add product with all items

    // Close and back to products page
    cancelHandler = () => {
        this.setState({sureCancel: true})
    }
    backToTerms = () => {
        this.props.history.push('/vendor/store/products')
    }
    // Image Uploading
    thisUploadImage = async (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            let img = document.createElement("img");
            img.onload = () => {

                let MAX_WIDTH = 300;

                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {

                    let MAX_HEIGHT = (height * MAX_WIDTH) / width

                    width = MAX_WIDTH;
                    height = MAX_HEIGHT;

                }
                return img
            }

            img.src = e.target.result;


            let ImageURL = img.src;
// Split the base64 string in data and contentType
            let block = ImageURL.split(";");
// Get the content type of the image
            let contentType = block[0].split(":")[1];// In this case "image/gif"
// get the real base64 content of the file
            let realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."


            function b64toBlob(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                let byteCharacters = atob(b64Data);
                let byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    let slice = byteCharacters.slice(offset, offset + sliceSize);

                    let byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    let byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                let blob = new Blob(byteArrays, {type: contentType});
                return blob;
            }

            let blob = b64toBlob(realData, contentType);


            let fd = new FormData();

            // Check file selected or not
            fd.append('image', blob);
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
            };
            loader(true)
            axios.post(`${MAIN_URL}admin/vendors/upload-image`, fd, {headers}).then(response => {
                if (response.status === 200) {
                    loader()
                    let arr = this.state.new_uploaded_img_arr;
                    arr.push(response.data.url)
                    this.setState({
                        new_uploaded_img_arr: arr
                    })
                }
            }).catch(error => {
                console.log(error)
            })


        }
        reader.readAsDataURL(file);


        /***********************************************************************/


    }

    removeHandler = (item) => {
        this.setState({sure_remove_img: true, remove_selected_item: item})
    }

    removeImage = () => {
        toast.success('removed successful')
        this.setState({sure_remove_img: false})
        // let arr = this.state.new_uploaded_img_arr;
        //
        // const index = arr.indexOf(this.state.remove_selected_item);
        // console.log(index)
        // if (index > -1) {
        //     arr.splice(index, 1);
        //     this.setState({new_uploaded_img_arr: arr, sure_remove_img: false})
        // }
    }

    arrowUpHandler = (index) => {
        let list = this.state.new_uploaded_img_arr;
        if (index === 0) {
            return false
        } else {
            let b = list[index];
            list[index] = list[index - 1];
            list[index - 1] = b;
            this.setState({new_uploaded_img_arr: list})
        }
    }

    arrowDownHandler = (index) => {
        let list = this.state.new_uploaded_img_arr;
        if (this.state.new_uploaded_img_arr.length === index + 1) {
            return false
        } else {
            let b = list[index];
            list[index] = list[index + 1];
            list[index + 1] = b;
            this.setState({new_uploaded_img_arr: list})
        }
    }
// Image Uploading
    // Add new sections
    addNewSections = () => {
        this.setState({add_new_section_show: true})
    }
    // Add new sections
    addNewSectionsHandler = async (e) => {
        e.preventDefault()
        toast.success('section added successful')
        this.setState({add_new_section_show: false})
    }
    /********************** REMOVE ***********/
    deleteSectionHandler = () => {
        this.setState({remove_section: true})
    }
    changeRemoveShow = async () => {
        // let arr = [];
        // let removeItem = await getData(MAIN_URL, `vendor/logins/remove/${this.state.selected_login}`, 'post', {}, true, true);
        // // console.log(items)
        // if (removeItem?.status === 200) {
        //     this.state.logins.map((item) => {
        //         if (this.state.selected_login !== item.id) {
        //             arr.push(item)
        //         }
        //     })
        //     this.setState({logins: arr, remove_section: false, show_add_product_name: false})
        this.setState({remove_section: false, add_new_section_show: false})
        // }
    }
    closeModalDelete = () => {
        this.setState({remove_section: false})
    }
    /********************** REMOVE ***********/
    // Main handle form
    addProductMainHandler = (e) => {
        e.preventDefault()
        Swal.fire({
            icon: 'success',
            title: 'successful',
        })
    }
        // End add product with all items

    closeModal = () => {
        this.setState({
            show_add_product_name: false,
            sureCancel: false,
            add_new_section_show: false,
            sure_remove_img: false
        })
    }


    render() {
        return (
            <>
                <div className='d-flex flex-column flex-md-row dv-vendor'>
                    <div className="dv-vendors-right-admin dv-vendors-right-admin-2">
                        <Nav>
                            {
                                this.state.permissions_item?.map((item) => (
                                    item === 'store-details' ?
                                        <NavLink activeClassName="active"
                                                 className='dv-vendor-store-list-items d-flex flex-column align-items-start my-5'
                                                 to={'/vendor/store/details'}>Store details</NavLink>
                                        : ''
                                ))
                            }
                            {
                                this.state.permissions_item?.map((item) => (
                                    item === 'collection' && item !== 'store-details' ?
                                        <NavLink activeClassName="active"
                                                 className='dv-vendor-store-list-items d-flex flex-column align-items-start my-5 mb-3'
                                                 to={'/vendor/store/collections'}>Collections</NavLink>
                                        : item === 'collection' ?
                                        <NavLink activeClassName="active"
                                                 className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                                 to={'/vendor/store/collections'}>Collections</NavLink>
                                        : ''
                                ))
                            }
                            <NavLink activeClassName="active"
                                     className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                     to={'/vendor/store/fulfilment'}>Fulfilment</NavLink>
                            <NavLink activeClassName="active"
                                     className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-3'
                                     to={'/vendor/store/borrow-products'}>Borrow products</NavLink>
                            <NavLink activeClassName="active"
                                     className='dv-vendor-store-list-items d-flex flex-column align-items-start mb-0'
                                     to={'/vendor/store/products'}>Products</NavLink>
                            {
                                this.state.permissions_item?.map((item) => (
                                    item === 'logins' ?
                                        <NavLink activeClassName="active"
                                                 className='dv-vendor-store-list-items d-flex flex-column align-items-start my-5'
                                                 to={'/vendor/store/permissions'}>Permissions</NavLink>
                                        : ''
                                ))
                            }

                        </Nav>
                    </div>
                    <div className='dv-vendor-right-content dv-vendor-right-content-2 position-relative'>
                        <form onSubmit={this.addProductMainHandler} className="py-3">
                            <div className="row">
                                <div className="col-12 d-flex flex-column flex-sm-row mb-5 px-md-4 justify-content-between align-items-center">
                                    <div
                                        className="dv-add-title-terms d-flex align-items-center mb-3 mb-md-0 justify-content-between"
                                        onClick={this.addProductName}>
                                        <h2 className='mb-0'>{this.state.new_product_name ? this.state.new_product_name : 'Name of product'}</h2>
                                        <i className='las la-pen dv-pen-btn-edit pl-1'/>
                                    </div>
                                    <div className='d-flex'>
                                        <button type='button' className='dv-terms-cancel mr-1'
                                                onClick={this.cancelHandler}>Cancel
                                        </button>
                                        <button type='submit' className='dv-terms-submit-btn ml-1'>Save</button>
                                    </div>
                                </div>
                                <div className='col-12 mb-3 px-md-4'>
                                    <div className="dv-bg-light dv-box-shadow mb-4 py-3 px-4">
                                        <h5 className='dv-img-product-title mb-3'>Add images</h5>
                                        <div className="row">
                                            {/*{*/}
                                            {/*    new_uploaded_img_arr?.map((item, i) => (*/}
                                            {/*        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">*/}
                                            {/*            <div className="dv-img-store-parent">*/}
                                            {/*                <img className='img-fluid'*/}
                                            {/*                     onError={(e) => {*/}
                                            {/*                         e.target.onerror = null;*/}
                                            {/*                         e.target.src = `${placeHolder_img}`*/}
                                            {/*                     }}*/}
                                            {/*                     src={`${MAIN_URL_IMAGE}${item}`} key={i}*/}
                                            {/*                     alt="Bed mal"/>*/}
                                            {/*                <i className="las la-times-circle dv-store-icons"*/}
                                            {/*                   onClick={() => this.removeHandler(item)}/>*/}
                                            {/*                <i className="las la-arrow-up dv-store-icons"*/}
                                            {/*                   onClick={() => this.arrowUpHandler(i)}/>*/}
                                            {/*                <i className="las la-arrow-down dv-store-icons"*/}
                                            {/*                   onClick={() => this.arrowDownHandler(i)}/>*/}
                                            {/*            </div>*/}
                                            {/*        </div>*/}
                                            {/*    ))*/}
                                            {/*}*/}
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                                <div className="dv-img-store-parent">
                                                    <img className='img-fluid'
                                                         onError={(e) => {
                                                             e.target.onerror = null;
                                                             e.target.src = `${placeHolder_img}`
                                                         }}
                                                         src={Img}
                                                         alt="Bed mal"/>
                                                    <i className="las la-times-circle dv-store-icons"
                                                       onClick={() => this.removeHandler('1')}/>
                                                    <i className="las la-arrow-right dv-store-icons"
                                                       onClick={() => this.arrowUpHandler('1')}/>
                                                    <i className="las la-arrow-left dv-store-icons"
                                                       onClick={() => this.arrowDownHandler('1')}/>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                                <div className="dv-img-store-parent">
                                                    <img className='img-fluid'
                                                         onError={(e) => {
                                                             e.target.onerror = null;
                                                             e.target.src = `${placeHolder_img}`
                                                         }}
                                                         src={Img}
                                                         alt="Bed mal"/>
                                                    <i className="las la-times-circle dv-store-icons"
                                                       onClick={() => this.removeHandler('1')}/>
                                                    <i className="las la-arrow-right dv-store-icons"
                                                       onClick={() => this.arrowUpHandler('1')}/>
                                                    <i className="las la-arrow-left dv-store-icons"
                                                       onClick={() => this.arrowDownHandler('1')}/>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                                <label className='dv-upload-file-label'>
                                                    <i className='las la-plus'></i>
                                                    <input type="file" accept="image/*" onChange={this.thisUploadImage}
                                                           className='dc-upload-file'/>
                                                </label>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="dv-bg-light dv-box-shadow mb-4 py-3 px-4">
                                        <h5 className='dv-img-product-title mb-3'>Product info</h5>
                                        <div className="row">
                                            <div className="col-12 col-lg-6 mb-3">
                                                <div className='mb-3 d-flex flex-column align-items-start w-100'>
                                                    <span className='dv-product-name-label pb-1'>Name</span>

                                                    <input type="text" className='dv-input w-100'
                                                           placeholder='Add a product name'
                                                           value={this.state.product_name} name='product_name'
                                                           onChange={this.inputHandler}/>

                                                </div>
                                                <div className="d-flex flex-column flex-lg-row">
                                                    <div
                                                        className='mb-3 d-flex flex-column align-items-start w-100 pr-lg-3 position-relative'>
                                                        <span className='dv-product-name-label pb-1'>Price</span>
                                                        <input type="number" className='dv-input pl-5 w-100'
                                                               value={this.state.product_price} name='product_price'
                                                               onChange={this.inputHandler}/>
                                                        <div className="dv-price-icon">£</div>
                                                    </div>
                                                    <div
                                                        className='mb-4 d-flex flex-column align-items-start w-100 pl-lg-2'>
                                                        <span className='dv-product-name-label pb-1'>Ribbon</span>
                                                        <input type="text" className='dv-input w-100'
                                                               placeholder='e.g new, vegan, reduced'
                                                               value={this.state.ribbon} name='ribbon'
                                                               onChange={this.inputHandler}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6 mb-3"></div>
                                            <div className="col-12 mb-3">
                                                <div className='d-flex flex-column align-items-start w-100'>
                                                    <span className='dv-product-name-label pb-1'>Description</span>
                                                    <textarea rows='4' className='dv-input w-100'
                                                              placeholder='Main item description'
                                                              value={this.state.product_description}
                                                              name='product_description'
                                                              onChange={this.inputHandler}/>
                                                </div>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="dv-add-plus-icon mr-2"
                                                         onClick={this.addNewSections}>
                                                        <i className='la la-plus'/>
                                                    </div>
                                                    <span className='dv-product-name-label pb-1'>Create a section e.g allergies, technical, ingredients</span>
                                                </div>
                                                <ul>
                                                    <li className="dv-product-sections-item">Allergies</li>
                                                    <li className="dv-product-sections-item">Ingredients</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.show_add_product_name}
                       onHide={this.closeModal} className='dv-plan-modal'>
                    <Modal.Body className='p-3 pb-0'>
                        <form onSubmit={this.saveNewProductName} className='d-flex flex-column'>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className='mb-0'>Name of product</h5>
                                <div className="d-flex">
                                    <button type='button' onClick={this.closeModal}
                                            className='dv-btn-plan-close mr-1'>Close
                                    </button>
                                    <button type='submit' className='dv-btn-plan-save ml-1'>Save</button>
                                </div>
                            </div>
                            <div className="mb-3 mt-5">
                                <input type='text' className="dv-input w-100" name='new_product_name'
                                       onChange={this.inputHandler} value={this.state.new_product_name}/>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.add_new_section_show}
                       onHide={this.closeModal} className='dv-plan-modal'>
                    <Modal.Body className='p-3 pb-0'>
                        <form onSubmit={this.addNewSectionsHandler}
                              className='pt-5 px-4 d-flex flex-column align-items-start w-100'>
                            <label className='mb-4 d-flex flex-column align-items-start w-100'>
                                <span className='dv-product-name-label pb-1'>Section title</span>
                                <input type="text" className='dv-input w-100' placeholder='Add title'
                                       value={this.state.section_title} name='section_title'
                                       onChange={this.inputHandler}/>
                            </label>
                            <label className='mb-5 d-flex flex-column align-items-start w-100'>
                                <span className='dv-product-name-label pb-1'>Description</span>
                                <textarea rows='8' className='dv-input w-100' placeholder='Section text'
                                          value={this.state.section_description} name='section_description'
                                          onChange={this.inputHandler}/>
                            </label>
                            <div
                                className='w-100 d-flex justify-content-between flex-column flex-md-row align-items-center'>
                                <div>
                                    <button type='button' className='dv-btn-remove-modal'
                                            onClick={this.deleteSectionHandler}>Delete section
                                    </button>
                                </div>
                                <div className="d-flex">
                                    <button type='button' onClick={this.closeModal}
                                            className='dv-btn-cancel-modal'>Cancel
                                    </button>
                                    <button type='submit' className='dv-btn-save-modal'>Save</button>
                                </div>
                            </div>

                        </form>
                    </Modal.Body>
                </Modal>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.sureCancel}
                       onHide={this.closeModal}>
                    <Modal.Body className='p-5'>
                        <div className="row justify-content-center">
                            <div className="col-12 mb-4">
                                <h5 className='dv-h5'>Are you sure?</h5>
                            </div>
                            <div className=" mt-3 d-flex justify-content-center align-items-center">
                                <button className='dv-cancel-btn d-flex justify-content-center' type='button'
                                        onClick={this.closeModal}>No
                                </button>
                                <button className='dv-access-btn d-flex justify-content-center' type='button'
                                        onClick={this.backToTerms}>Yes
                                </button>
                            </div>

                        </div>

                    </Modal.Body>
                </Modal>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.remove_section}
                       onHide={this.closeModal}>
                    <Modal.Body className='p-5'>
                        <div className="row justify-content-center">
                            <div className="col-12 mb-4">
                                <h5 className='dv-h5'>Are you sure ?</h5>
                            </div>
                            <div className="col-12 mt-3 d-flex justify-content-center align-items-center">
                                <button className='dv-cancel-btn d-flex justify-content-center' type='button'
                                        onClick={this.closeModalDelete}>No
                                </button>
                                <button className='dv-access-btn d-flex justify-content-center' type='button'
                                        onClick={this.changeRemoveShow}>Yes
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.sure_remove_img}
                       onHide={this.closeModal}>
                    <Modal.Body className='p-5'>
                        <div className="row justify-content-center">
                            <div className="col-12 mb-4">
                                <h5 className='dv-h5'>Are you sure?</h5>
                            </div>
                            <div className=" mt-3 d-flex justify-content-center align-items-center">
                                <button className='dv-cancel-btn d-flex justify-content-center' type='button'
                                        onClick={this.closeModal}>No
                                </button>
                                <button className='dv-access-btn d-flex justify-content-center' type='button'
                                        onClick={this.removeImage}>Yes
                                </button>
                            </div>

                        </div>

                    </Modal.Body>
                </Modal>
            </>

        )
            ;
    }
}

export default AddProduct;