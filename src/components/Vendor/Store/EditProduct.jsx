import React, {Component} from 'react';
import './store.scss'
import {getData, loader} from "../../../assets/scripts/GeneralFunctions";
import {MAIN_URL, MAIN_URL_IMAGE} from "../../../assets/scripts/GeneralVariables";
import {Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import placeHolder_img from "../../../assets/image/bedmal-place-holder.jpg";
import axios from "axios";
import Menu from "./Menu";
import Swal from "sweetalert2";

const Compress = require('compress.js')

export default class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions_item: [],
            option_items: [],
            options: [],
            product_item: '',
            product_name: '',
            product_description: '',
            ribbon: '',
            product_price: '',
            section_title: '',
            section_description: '',
            option_title: '',
            option_selected: '',
            option_with_input_selected: '',
            option_item_title: '',
            option_item_value: '',
            option_large: '',
            option_large_value: '',
            option_index: '',
            borrow_value: 1,
            show_add_product_name: false,
            edit_section_show: false,
            add_new_section_show: false,
            show_options: false,
            remove_options: false,
            edit_option: false,
            add_option: false,
            sections: [],
            collection: 0,
            local_delivery: 0,
            nationwide_delivery: 0,
            option_selected_index: ''
        }
    }

    async componentDidMount() {
        let item = await getData(MAIN_URL, `vendor/products/info/${this.props.match.params.product_id}`, 'get', {}, true, true);
        if (item?.status === 200) {
            let collections = await getData(MAIN_URL, `vendor/collections`, 'get', {}, true, true);
            this.setState({
                product_id: item.product.id,
                product_images: item.product.images,
                product_name: item.product.name,
                product_price: item.product.price,
                ribbon: item.product.ribbon,
                product_description: item.product.desctiption,
                sections: item.product.sections,
                options: item.product.options,
                borrow_value: item.product.borrow_packing,
                collection: item.product.collection,
                local_delivery: item.product.local_delivery,
                nationwide_delivery: item.product.nationwide_delivery,
                collections_items: collections.collections,
                selectedCheckboxes: item.product.collections
            })
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
        toast.success('product name updated successfully')
    }
    /******************************************************************************/
    /********************** Image Uploading,Edit,Remove ****************/
    thisUploadImage = async (e) => {
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
        loader(true)
        axios.post(`${MAIN_URL}vendor/products/upload-image`, fd, {headers}).then(response => {
            if (response.status === 200) {
                loader()
                let arr = this.state.product_images;
                arr.push(response.data.url)
                this.setState({
                    product_images: arr
                })
            }
        }).catch(error => {
            error.response.data.errors?.map((item) => {
                toast.error(item.message)
            })
        })

    }
    removeHandler = (index) => {
        this.setState({sure_remove_img: true, remove_selected_item: index})
    }

    removeImage = () => {
        const {product_images, remove_selected_item} = this.state
        this.setState({sure_remove_img: false})
        let arr = [];
        product_images.map((item, i) => {
            if (remove_selected_item !== i) {
                arr.push(item)
            }
        })
        this.setState({remove_options: false, show_options: false, product_images: arr})
        toast.success('image removed successfully')
    }

    arrowUpHandler = (index) => {
        let list = this.state.product_images;
        if (index === 0) {
            return false
        } else {
            let b = list[index];
            list[index] = list[index - 1];
            list[index - 1] = b;
            this.setState({product_images: list})
        }
    }

    arrowDownHandler = (index) => {
        let list = this.state.product_images;
        if (this.state.product_images.length === index + 1) {
            return false
        } else {
            let b = list[index];
            list[index] = list[index + 1];
            list[index + 1] = b;
            this.setState({product_images: list})
        }
    }

    /********************************* SELECT COLLECTION ***************/
    onChangeCollections = id => {
        const selectedCheckboxes = this.state.selectedCheckboxes;

        // Find index
        const findIdx = selectedCheckboxes.indexOf(id);

        // Index > -1 means that the item exists and that the checkbox is checked
        // and in that case we want to remove it from the array and uncheck it
        if (findIdx > -1) {
            selectedCheckboxes.splice(findIdx, 1);
        } else {
            selectedCheckboxes.push(id);
        }
        if (selectedCheckboxes?.length <= 3) {
            this.setState({
                selectedCheckboxes: selectedCheckboxes,
                selectedId: id
            });
        }

    };

    /****************************** Add and Edit Sections ****************************/
    addNewSections = () => {
        this.setState({add_new_section_show: true})
    }
    addNewSectionsHandler = async (e) => {
        e.preventDefault()

        const {section_title, section_description, sections} = this.state;
        let section = {title: section_title, description: section_description}

        let sections_arr = sections;
        sections_arr.push(section)

        this.setState({add_new_section_show: false, sections: sections_arr})
        toast.success('section added successfully')
    }
    editSection = (index) => {
        let item = this.state.sections[index]
        this.setState({
            edit_section_show: true, section_title: item.title, section_description: item.description,
            selected_section: index
        })
    }
    editNewSectionsHandler = async (e) => {
        e.preventDefault()
        const {section_title, section_description, sections, selected_section} = this.state;

        const updatedHeaders = sections.map((obj, i) => {
            return i === selected_section ? {title: section_title, description: section_description} : obj;
        });
        this.setState({
            sections: updatedHeaders, edit_section_show: false
        })
        toast.success('section edited successfully')
    }
    deleteSectionHandler = () => {
        this.setState({remove_section: true})
    }
    changeRemoveShow = async () => {
        let arr = [];
        this.state.sections.map((item, i) => {
            if (this.state.selected_section !== i) {
                arr.push(item)
            }
        })
        this.setState({remove_section: false, edit_section_show: false, sections: arr})
        toast.success('section removed successfully')
    }
    closeModalDelete = () => {
        this.setState({remove_section: false})
    }

    /****************************** Add and Edit Options ****************************/
    addNewOptions = () => {
        this.setState({
            show_options: true, add_option: true, edit_option: false,

            option_title: '', option_items: [],
            option_with_input_selected: '',
            option_selected: ''
        })
    }

    editOption = (index) => {

        const {options} = this.state
        let selected_option = options[index]

        selected_option.max_option > 3 ?
            this.setState({option_with_input_selected: selected_option.max_option, option_selected: ''})
            : this.setState({option_selected: selected_option.max_option, option_with_input_selected: ''})

        this.setState({
            show_options: true, add_option: false, edit_option: true, option_index: index,
            option_title: selected_option.title, option_items: selected_option.values, option_selected_index: index
        })
    }
    editOptionFrom = (e) => {
        e.preventDefault()
        const {
            option_title,
            option_items,
            option_with_input_selected,
            option_selected,
            option_selected_index,
            options
        } = this.state;

        let edited_option = {
            title: option_title,
            values: option_items,
            max_option: option_with_input_selected ? option_with_input_selected : option_selected,
        }
        const updatedHeaders = options.map((obj, i) => {
            return i === option_selected_index ? edited_option : obj;
        });
        this.setState({
            options: updatedHeaders, show_options: false, edit_option: false
        })

        toast.success('option edited successfully')
    }
    handleRadioInput = (e) => {
        this.setState({option_selected: e.target.value, option_with_input_selected: ''})
    }
    handleAfterRadioInput = (e) => {
        this.setState({option_selected: '', option_with_input_selected: e.target.value})
    }

    deleteOptionHandler = () => {
        this.setState({remove_options: true})
    }
    changeRemoveShowOption = async () => {
        let arr = [];
        this.state.options.map((item, i) => {
            if (this.state.option_selected_index !== i) {
                arr.push(item)
            }
        })
        this.setState({remove_options: false, show_options: false, options: arr})
        toast.success('option removed successfully')
        // }
    }
    closeModalOptionDelete = () => {
        this.setState({remove_options: false})
    }
    inputItemTitleHandler = idx => evt => {
        const newOptionItem = this.state.option_items.map((option_item, sidx) => {
            if (idx !== sidx) return option_item;
            return {...option_item, name: evt.target.value};
        });

        this.setState({option_items: newOptionItem});
    };
    inputItemValueHandler = idx => evt => {
        const newOptionItem = this.state.option_items.map((option_item, sidx) => {
            if (idx !== sidx) return option_item;
            return {...option_item, price: evt.target.value};
        });

        this.setState({option_items: newOptionItem});
    };
    handleAddOptionItem = () => {
        this.setState({
            option_items: this.state.option_items.concat([{name: ""}])
        });
    };
    handleRemoveOptionItem = idx => () => {
        this.setState({
            option_items: this.state.option_items.filter((s, sidx) => idx !== sidx)
        });
    }
    addNewOptionsFrom = (e) => {
        e.preventDefault()
        const {option_with_input_selected, option_selected, option_title, option_items, options} = this.state
        let new_option = {
            max_option: option_with_input_selected ? option_with_input_selected : option_selected,
            title: option_title,
            values: option_items
        }
        options.push(new_option);
        this.setState({show_options: false, options: options})
        toast.success('option added successfully')
    }

    /************** Change Borrow Status *************/
    HandlerChangeStatusBorrow = async (e, id) => {
        console.log(e, id)
        if (e == 0) {
            // e = 1;
            this.setState({borrow_value: 1})
        } else {
            // e = 0;
            this.setState({borrow_value: 0})
        }
    };

    /********************** Fulfillment ****************/
    onChangeCollection = (collection) => {
        if (collection == 0) {
            this.setState({collection: 1})
        } else {
            this.setState({collection: 0})
        }

    }
    onChangeLocalDelivery = (local_delivery) => {
        if (local_delivery == 0) {
            this.setState({local_delivery: 1})
        } else {
            this.setState({local_delivery: 0})
        }
    }
    onChangeNationwideDelivery = (nationwide_delivery) => {
        if (nationwide_delivery == 0) {
            this.setState({nationwide_delivery: 1})
        } else {
            this.setState({nationwide_delivery: 0})
        }
    }
    /********************************** EDIT FORM HANDLER *********************************/
    editProductMainHandler = async (e) => {
        e.preventDefault()
        const {
            product_images,
            product_name,
            product_price,
            ribbon,
            product_description,
            sections,
            options,
            borrow_value,
            collection,
            local_delivery,
            nationwide_delivery,
            selectedCheckboxes,
        } = this.state;
        console.log(
            product_images, product_name, product_price, ribbon,
            product_description, sections, options, borrow_value,
            collection,
            local_delivery,
            nationwide_delivery,
            selectedCheckboxes,
        )

        // let item = await getData(MAIN_URL, `vendor/products/info/${this.props.match.params.product_id}`, 'post', {}, true, true);

        Swal.fire({
            icon: 'success',
            title: 'successfully',
        })
    }


    closeModal = () => {
        this.setState({
            show_add_product_name: false,
            sureCancel: false,
            add_new_section_show: false,
            sure_remove_img: false,
            show_options: false,
            remove_options: false,
            edit_section_show: false
        })
    }


    render() {
        return (
            <>
                <div className='d-flex flex-column flex-xl-row dv-vendor'>
                    <div className="dv-vendors-right-admin dv-vendors-right-admin-2">
                        <Menu/>
                    </div>
                    <div className='dv-vendor-right-content dv-vendor-right-content-2 position-relative'>
                        <form onSubmit={this.editProductMainHandler} className="py-3">
                            <div className="row">
                                <div
                                    className="col-12 d-flex flex-column flex-sm-row mb-5 px-md-4 justify-content-between align-items-center">
                                    <div
                                        className="dv-add-title-terms d-flex align-items-center mb-3 mb-md-0 justify-content-between"
                                        onClick={this.addProductName}>
                                        <h2 className='mb-0'>{this.state.product_name ? this.state.product_name : 'Name of product'}</h2>
                                        <i className='las la-pen dv-pen-btn-edit pl-1'/>
                                    </div>
                                    <div className='d-flex'>
                                        <button type='button' className='dv-terms-cancel mr-1'
                                                onClick={this.cancelHandler}>Cancel
                                        </button>
                                        <button type='submit' className='dv-terms-submit-btn ml-1'>Save</button>
                                    </div>
                                </div>
                                <div className='col-12 px-md-4'>
                                    <div className="dv-bg-light dv-box-shadow mb-4 py-3 px-4">
                                        <h5 className='dv-img-product-title mb-3'>Add images</h5>
                                        <div className="row">
                                            {
                                                this.state.product_images?.map((item, i) => (
                                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                                        <div className="dv-img-store-parent dv-product-images">
                                                            <img className='img-fluid'
                                                                 onError={(e) => {
                                                                     e.target.onerror = null;
                                                                     e.target.src = `${placeHolder_img}`
                                                                 }}
                                                                 src={`${MAIN_URL_IMAGE}${item}`}
                                                                 alt="Bed mal"/>
                                                            <i className="las la-times-circle dv-store-icons"
                                                               onClick={() => this.removeHandler(i)}/>
                                                            <i className="las la-arrow-right dv-store-icons"
                                                               onClick={() => this.arrowDownHandler(i)}/>
                                                            <i className="las la-arrow-left dv-store-icons"
                                                               onClick={() => this.arrowUpHandler(i)}/>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                                <label className='dv-upload-file-label dv-upload-file-label-product'>
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
                                            <div className="col-12 col-lg-6 mb-3">
                                                <span className='dv-product-name-label pb-1'>Collections</span>
                                                <div className="dv-collection-border d-flex flex-column">
                                                    {this.state.collections_items?.map(checkbox => (
                                                        <label className='d-flex align-items-center mb-2'>
                                                            <input type='checkbox'
                                                                   checked={this.state.selectedCheckboxes?.find(element => element === checkbox.id)}
                                                                   onChange={() => this.onChangeCollections(checkbox.id)}
                                                                   selected={this.state.selectedCheckboxes?.includes(checkbox.id)}
                                                            />
                                                            <span>{checkbox.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
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
                                                    {
                                                        this.state.sections?.map((item, i) => (
                                                            <li className="dv-product-sections-item"
                                                                key={i}
                                                                onClick={() => this.editSection(i)}>{item.title}</li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 px-md-4'>
                                    <div className="dv-bg-light dv-box-shadow mb-4 py-3 px-4">
                                        <h5 className='dv-img-product-title mb-3'>Product options</h5>
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="dv-add-plus-icon mr-2"
                                                         onClick={this.addNewOptions}>
                                                        <i className='la la-plus'/>
                                                    </div>
                                                    <span className='dv-product-name-label pb-1'>Create option e.g Large + 50p, Toppings, Small, Medium, Large</span>
                                                </div>
                                                <ul>
                                                    {
                                                        this.state.options.map((item, idx) => (
                                                            <li className="dv-product-sections-item" key={idx}
                                                                onClick={() => this.editOption(idx)}>{item.title}</li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 px-md-4'>
                                    <div className="dv-bg-light dv-box-shadow mb-4 py-3 px-4">
                                        <h5 className='dv-img-product-title mb-3'>BorrowPackaging</h5>
                                        <div className="d-flex align-items-center dv-borrow-switch">

                                            <label className="switch">
                                                <input type="checkbox"
                                                       value={this.state.borrow_value}
                                                       on={1}
                                                       off={0}
                                                       checked={this.state.borrow_value === 1 ? true : false}
                                                       onChange={() => this.HandlerChangeStatusBorrow(this.state.borrow_value, this.state.product_id)}
                                                />
                                                <span className="slider round"></span>
                                            </label>

                                            <span className='dv-product-name-label pl-2 pb-1'>Select the options available to this product.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 px-md-4'>
                                    <div className="dv-bg-light dv-box-shadow mb-4 py-3 px-4">
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <h5 className='dv-img-product-title mb-0'>Fulfillment options</h5>
                                                <span className='dv-product-name-label pb-1'>Select the options available to this product.</span>
                                            </div>
                                            <div className="col-12 col-md-8">
                                                <label
                                                    className={'dv-checkbox-logins dv-checkbox-add-odd d-flex justify-content-between align-items-center'}>
                                                    <span>Collection</span>
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state.collection}
                                                        onChange={() => this.onChangeCollection(this.state.collection)}
                                                    />
                                                </label>
                                                <label
                                                    className={'dv-checkbox-logins dv-checkbox-add-even d-flex justify-content-between align-items-center'}>
                                                    <span>Local delivery</span>
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state.local_delivery}
                                                        onChange={() => this.onChangeLocalDelivery(this.state.local_delivery)}
                                                    />
                                                </label>
                                                <label
                                                    className={'dv-checkbox-logins dv-checkbox-add-odd d-flex justify-content-between align-items-center'}>
                                                    <span>Nationwide delivery</span>
                                                    <input
                                                        type="checkbox"
                                                        checked={this.state.nationwide_delivery}
                                                        onChange={() => this.onChangeNationwideDelivery(this.state.nationwide_delivery)}
                                                    />
                                                </label>
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
                                <input type='text' className="dv-input w-100" name='product_name'
                                       onChange={this.inputHandler} value={this.state.product_name}/>
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
                                <div className="d-flex">
                                    <button type='button' onClick={this.closeModal}
                                            className='dv-btn-cancel-modal mr-2'>Cancel
                                    </button>
                                    <button type='submit' className='dv-btn-save-modal'>Save</button>
                                </div>
                            </div>

                        </form>
                    </Modal.Body>
                </Modal>

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.edit_section_show}
                       onHide={this.closeModal} className='dv-plan-modal'>
                    <Modal.Body className='p-3 pb-0'>
                        <form onSubmit={this.editNewSectionsHandler}
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
                                            className='dv-btn-cancel-modal mr-2'>Cancel
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

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.show_options}
                       onHide={this.closeModal} className='dv-plan-modal'>
                    <Modal.Body className='p-3 pb-0'>
                        <form onSubmit={this.state.add_option ? this.addNewOptionsFrom : this.editOptionFrom}
                              className='pt-5 px-4 d-flex flex-column align-items-start w-100'>
                            <label className='mb-4 d-flex flex-column align-items-start w-100'>
                                <span className='dv-product-name-label pb-1'>Options title</span>
                                <input type="text" className='dv-input w-100' placeholder='Sizes, Toppings, Go Large'
                                       value={this.state.option_title} name='option_title'
                                       onChange={this.inputHandler}/>
                            </label>

                            <div className='mb-2 d-flex w-100'>
                                <div className='w-50 d-flex justify-content-start mr-2'>
                                    <span className='dv-product-name-label pb-1'>Options</span>
                                </div>
                                <div className='w-40 d-flex justify-content-start mr-2'>
                                    <span className='dv-product-name-label pb-1'>£ Price + / -</span>
                                </div>
                            </div>
                            {
                                this.state.option_items.map((item, idx) => (
                                    <div className="d-flex mb-3 w-100 align-items-center">
                                        <div className='w-50 mr-2'>
                                            <input type="text" className='dv-input w-100' placeholder='e.g Small'
                                                   value={item.name}
                                                   name='option_item_title'
                                                   onChange={this.inputItemTitleHandler(idx)}/>
                                        </div>
                                        <div className='w-40 mr-2'>
                                            <input type="number" className='dv-input w-100' placeholder='- 0.50'
                                                   value={parseFloat(item.price)}
                                                   name='option_item_value'
                                                   onChange={this.inputItemValueHandler(idx)}/>
                                        </div>
                                        <div className='w-10'>
                                            <button type='button' className='dv-remove-option'
                                                    onClick={this.handleRemoveOptionItem(idx)}><i
                                                className='las la-minus'/></button>
                                        </div>
                                    </div>
                                ))
                            }
                            <button type='button' className='dv-add-option' onClick={this.handleAddOptionItem}><i
                                className='las la-plus'/></button>

                            <label className='my-4 d-flex flex-column align-items-start w-100'>
                                <span className='dv-product-name-label pb-1'>Max option selection</span>
                                <div className="custom-radios">
                                    <div>
                                        <input onChange={this.handleRadioInput} type="radio" id="color-1"
                                               name="option_count" value="1"
                                               className={this.state.option_selected == 1 ? 'dv-checked' : ''}/>
                                        <label htmlFor="color-1">
                                          <span>
                                            1
                                          </span>
                                        </label>
                                    </div>
                                    <div>
                                        <input onChange={this.handleRadioInput} type="radio" id="color-2"
                                               name="option_count" value="2"
                                               className={this.state.option_selected == 2 ? 'dv-checked' : ''}/>
                                        <label htmlFor="color-2">
                                          <span>
                                            2
                                          </span>
                                        </label>
                                    </div>
                                    <div>
                                        <input onChange={this.handleRadioInput} type="radio" id="color-3"
                                               name="option_count" value="3"
                                               className={this.state.option_selected == 3 ? 'dv-checked' : ''}/>
                                        <label htmlFor="color-3">
                                          <span>
                                            3
                                          </span>
                                        </label>
                                    </div>
                                    <div className='pl-3'>
                                        <span className='dv-product-name-label pb-1'>Other:</span>
                                        <input type="number" className='dv-number-input'
                                               value={this.state.option_with_input_selected}
                                               name='option_with_input_selected' onChange={this.handleAfterRadioInput}/>
                                    </div>
                                </div>
                            </label>
                            <div
                                className='w-100 d-flex justify-content-between flex-column flex-md-row align-items-center'>
                                <div>
                                    <button type='button' className='dv-btn-remove-modal'
                                            onClick={this.deleteOptionHandler}>Delete options
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

                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.remove_options}
                       onHide={this.closeModal}>
                    <Modal.Body className='p-5'>
                        <div className="row justify-content-center">
                            <div className="col-12 mb-4">
                                <h5 className='dv-h5'>Are you sure ?</h5>
                            </div>
                            <div className="col-12 mt-3 d-flex justify-content-center align-items-center">
                                <button className='dv-cancel-btn d-flex justify-content-center' type='button'
                                        onClick={this.closeModalOptionDelete}>No
                                </button>
                                <button className='dv-access-btn d-flex justify-content-center' type='button'
                                        onClick={this.changeRemoveShowOption}>Yes
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
