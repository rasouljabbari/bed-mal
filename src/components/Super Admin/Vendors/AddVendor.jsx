import React, {Component, useState} from 'react';
import './vendors.scss'
import {emailRegex, getData, loader, setTitle} from "../../../assets/scripts/GeneralFunctions";
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
// Open street
import axios from "axios";
import {MAIN_URL, MAIN_URL_IMAGE} from "../../../assets/scripts/GeneralVariables";
import {Modal} from "react-bootstrap";
import placeHolder_img from "../../../assets/image/bedmal-place-holder.jpg";
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import L from "leaflet";
import Img from "../../../assets/image/mapIcon.png";
const Compress = require('compress.js')

let latlng;

const GetIcon = (_iconSize)=>{
    return L.icon({
        iconUrl: Img,
        iconSize: [_iconSize]
    })
}

const LocationMarker = (props) => {
    const [position, setPosition] = useState(props.latLng)
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng)
            latlng = e.latlng
        }
    })

    return position === null ? null : (
        <Marker position={position} {...props}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

class AddVendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map_coordinates: '', store_address: '', store_phone: '', store_email: '', store_name: '',
            monday_to: '', monday_from: '', postal_code: '',
            selectedCheckboxes: [], selectedId: '', lng: -2.3899, department_items: [],
            lat: 53.0544,
            zoom: 10, new_uploaded_img: '', new_uploaded_img_arr: [], sure_remove: false,
            monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: []
        }
        this.mapContainer = React.createRef();
    }

    async componentDidMount() {
        setTitle('Store')


        let departmentItems = await getData(MAIN_URL, `admin/departments`, 'get', {}, true, true);
        // console.log(items)
        if (departmentItems?.status === 200) {
            this.setState({department_items: departmentItems.items})
        }


        // Set options
    };

    // Inputs
    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // times
    timeInputHandlerMondayFrom = (options) => {
        let mondayArr = this.state.monday
        mondayArr[0] = `${options.hour}:${options.minute}`;
        this.setState({monday: mondayArr})
    }
    timeInputHandlerMondayTo = (options) => {
        let mondayArr = this.state.monday
        mondayArr[1] = `${options.hour}:${options.minute}`;
        this.setState({monday: mondayArr})
    }

    timeInputHandlerTuesdayFrom = (options) => {
        let tuesdayArr = this.state.tuesday
        tuesdayArr[0] = `${options.hour}:${options.minute}`;
        this.setState({tuesday: tuesdayArr})
    }
    timeInputHandlerTuesdayTo = (options) => {
        let tuesdayArr = this.state.tuesday
        tuesdayArr[1] = `${options.hour}:${options.minute}`;
        this.setState({tuesday: tuesdayArr})
    }

    timeInputHandlerWednesdayFrom = (options) => {
        let wednesdayArr = this.state.wednesday
        wednesdayArr[0] = `${options.hour}:${options.minute}`;
        this.setState({wednesday: wednesdayArr})
    }
    timeInputHandlerWednesdayTo = (options) => {
        let wednesdayArr = this.state.wednesday
        wednesdayArr[1] = `${options.hour}:${options.minute}`;
        this.setState({wednesday: wednesdayArr})
    }

    timeInputHandlerThursdayFrom = (options) => {
        let thursdayArr = this.state.thursday
        thursdayArr[0] = `${options.hour}:${options.minute}`;
        this.setState({thursday: thursdayArr})
    }
    timeInputHandlerThursdayTo = (options) => {
        let thursdayArr = this.state.thursday
        thursdayArr[1] = `${options.hour}:${options.minute}`;
        this.setState({thursday: thursdayArr})
    }

    timeInputHandlerFridayFrom = (options) => {
        let fridayArr = this.state.friday
        fridayArr[0] = `${options.hour}:${options.minute}`;
        this.setState({friday: fridayArr})
    }
    timeInputHandlerFridayTo = (options) => {
        let fridayArr = this.state.friday
        fridayArr[1] = `${options.hour}:${options.minute}`;
        this.setState({friday: fridayArr})
    }

    timeInputHandlerSaturdayFrom = (options) => {
        let saturdayArr = this.state.saturday
        saturdayArr[0] = `${options.hour}:${options.minute}`;
        this.setState({saturday: saturdayArr})
    }
    timeInputHandlerSaturdayTo = (options) => {
        let saturdayArr = this.state.saturday
        saturdayArr[1] = `${options.hour}:${options.minute}`;
        this.setState({saturday: saturdayArr})
    }

    timeInputHandlerSundayFrom = (options) => {
        let sundayArr = this.state.sunday
        sundayArr[0] = `${options.hour}:${options.minute}`;
        this.setState({sunday: sundayArr})
    }
    timeInputHandlerSundayTo = (options) => {
        let sundayArr = this.state.sunday
        sundayArr[1] = `${options.hour}:${options.minute}`;
        this.setState({sunday: sundayArr})
    }

    handleOnChange = (e) => {
        console.log(e.target, e.target.checked)
        this.setState({
            store_descriptor: e.target.checked,
            store_descriptor_value: e.target.name
        })
    }
    onChange = id => {
        const selectedCheckboxes = this.state.selectedCheckboxes;

        // Find index
        const findIdx = selectedCheckboxes.indexOf(id);

        if (findIdx > -1) {
            selectedCheckboxes.splice(findIdx, 1);
        } else {
            selectedCheckboxes.push(id);
        }
        if(selectedCheckboxes?.length <= 3 ) {
            this.setState({
                selectedCheckboxes: selectedCheckboxes,
                selectedId: id
            });
        }
    };

    // Image Uploading
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
        axios.post(`${MAIN_URL}admin/vendors/upload-image`, fd, {headers}).then(response => {
            if (response.status === 200) {
                loader()
                let arr = this.state.new_uploaded_img_arr;
                arr.push(response?.data.url)
                this.setState({
                    new_uploaded_img_arr: arr
                })
            }
        }).catch(error => {
            error?.response.data.errors?.map((item) => {
                toast.error(item.message)
            })
        })
    }


    removeHandler = (item) => {
        this.setState({sure_remove: true, remove_selected_item: item})
    }

    sureRemove = () => {
        let arr = this.state.new_uploaded_img_arr;

        const index = arr.indexOf(this.state.remove_selected_item);
        console.log(index)
        if (index > -1) {
            arr.splice(index, 1);
            this.setState({new_uploaded_img_arr: arr, sure_remove: false})
        }
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

    handleForm = async (e) => {
        e.preventDefault()
        const {
            store_address, store_phone, store_email, store_name,
            postal_code,
            selectedCheckboxes, lng,
            lat, monday, tuesday, wednesday, thursday, friday, saturday, sunday, new_uploaded_img_arr
        } = this.state



        let opening_hours = {
            "mon": monday,
            "tue": tuesday,
            "wed": wednesday,
            "thu": thursday,
            "fri": friday,
            "sat": saturday,
            "sun": sunday
        }
        if (!emailRegex(store_email)) {
            let vendorItem = await getData(MAIN_URL, `admin/vendors/create`, 'post', {
                address: store_address,
                postal_code: postal_code,
                name: store_name,
                email: store_email,
                phone: store_phone,
                latitude: latlng.lat,
                longitude: latlng.lng,
                image_gallery: JSON.stringify(new_uploaded_img_arr),
                opening_hours: JSON.stringify(opening_hours),
                departments: JSON.stringify(selectedCheckboxes),

            }, true, true);
            if (vendorItem?.status === 200) {
                console.log(vendorItem)
                Swal.fire({
                    icon: 'success',
                    title: 'created successfully',
                })
                this.props.history.push('/admin/vendors')
            }
        }
    }

    vendorListItemHandler = (id) => {
        console.log(id)
    }
    closeModal = () => {
        this.setState({sure_remove: false})
    }

    render() {
        const {selectedCheckboxes, new_uploaded_img_arr} = this.state;
        let monday = this.state.monday
        let tuesday = this.state.tuesday
        let wednesday = this.state.wednesday
        let thursday = this.state.thursday
        let friday = this.state.friday
        let saturday = this.state.saturday
        let sunday = this.state.sunday

        const { lat, lng } = this.state;
        const position = [lat, lng]

        return (
            <div className='d-flex flex-column flex-md-row dv-vendor overflow-hidden'>
                <div className="dv-vendors-right-admin dv-vendors-right-admin-2">
                    <ul>
                        <li className="dv-vendor-list-items active d-flex flex-column align-items-start my-5"
                            onClick={() => this.vendorListItemHandler(1)}>
                            <h5 className='dv-vendor-list-title mb-0'>Store details</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(2)}>
                            <h5 className='dv-vendor-list-title mb-0'>Collections</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(2)}>
                            <h5 className='dv-vendor-list-title mb-0'>Store details</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(3)}>
                            <h5 className='dv-vendor-list-title mb-0'>Fulfillment</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(4)}>
                            <h5 className='dv-vendor-list-title mb-0'>Borrow products</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start"
                            onClick={() => this.vendorListItemHandler(5)}>
                            <h5 className='dv-vendor-list-title mb-0'>Products</h5>
                        </li>
                        <li className="dv-vendor-list-items d-flex flex-column align-items-start my-5"
                            onClick={() => this.vendorListItemHandler(6)}>
                            <h5 className='dv-vendor-list-title mb-0'>Permissions</h5>
                        </li>
                    </ul>
                </div>
                <div className='dv-vendor-right-content dv-vendor-right-content-2 position-relative'>
                    <form className="row" onSubmit={this.handleForm}>
                        <div className="col-12 mb-3 d-flex justify-content-between">
                            <h2>Store details</h2>
                            <button className='dv-department-btn' type='submit'>Save</button>
                        </div>
                        <div className="col-12 col-lg-6 pr-lg-2 mb-3">
                            <div className="dv-bg-light-vendors dv-bg-light pb-3 mb-3 d-flex flex-column">
                                <label htmlFor="dv-store-name" className='d-flex flex-column my-4'>
                                    <span className='dv-store-name pl-2'>Store name</span>
                                    <input type="text" name='store_name' value={this.state.store_name}
                                           onChange={this.inputHandler} id='dv-store-name' className='dv-store-input'/>
                                </label>
                                <label htmlFor="dv-store-email" className='d-flex align-items-center mb-4'>
                                    <span className='dv-store-name dv-custom-width-label'>Email</span>
                                    <input type="email" name='store_email' value={this.state.store_email}
                                           onChange={this.inputHandler} id='dv-store-email'
                                           className='dv-store-input w-75' required={true}/>
                                </label>
                                <label htmlFor="dv-store-phone" className='d-flex align-items-center mb-4'>
                                    <span className='dv-store-name dv-custom-width-label'>Phone</span>
                                    <input type="tel" name='store_phone' value={this.state.store_phone}
                                           onChange={this.inputHandler} id='dv-store-phone'
                                           className='dv-store-input w-75'/>
                                </label>
                                <label htmlFor="dv_store_address" className='d-flex flex-column mb-1'>
                                    <span className='dv-store-name pl-2'>Store address</span>
                                    <textarea name="store_address" id="dv_store_address"
                                              value={this.state.store_address} onChange={this.inputHandler} rows="3"
                                              className='dv-store-input'/>
                                </label>
                                <label htmlFor="dv_postal_code" className='d-flex flex-column mt-2'>
                                    <span className='dv-store-name pl-2'>Postal code</span>
                                    <input type="text" name='postal_code' value={this.state.postal_code}
                                           onChange={this.inputHandler} id='dv_postal_code'
                                           className='dv-store-input w-100'/>
                                </label>
                                <label htmlFor="dv_map_coordinates" className='d-flex flex-column position-relative mt-2'>
                                    <span className='dv-store-name pl-2'>Map coordinates</span>
                                    <div style={{width: '100%', height: '400px'}}>
                                        <MapContainer center={position} zoom={10} scrollWheelZoom={false} style={{height: '400px'}}>
                                            <TileLayer
                                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <LocationMarker icon={GetIcon(50)} latLng={position}/>
                                        </MapContainer>
                                    </div>
                                </label>
                            </div>
                            <div className="dv-bg-light-vendors dv-bg-light pb-3 mb-3 px-3 px-md-5 d-flex flex-column">
                                <h2 className='dv-gray-h'>Opening hours</h2>
                                <label className='d-flex justify-content-between align-items-center mt-4 mb-2'>
                                    <span className='dv-store-name pl-2'>Monday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerMondayFrom}
                                            time={monday[0]}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerMondayTo}
                                            time={monday[1]}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                                <label className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='dv-store-name pl-2'>Tuesday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerTuesdayFrom}
                                            time={tuesday[0]}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerTuesdayTo}
                                            time={tuesday[1]}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                                <label className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='dv-store-name pl-2'>Wednesday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerWednesdayFrom}
                                            time={wednesday[0]}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerWednesdayTo}
                                            time={wednesday[1]}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                                <label className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='dv-store-name pl-2'>Thursday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerThursdayFrom}
                                            time={thursday[0]}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerThursdayTo}
                                            time={thursday[1]}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                                <label className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='dv-store-name pl-2'>Friday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerFridayFrom}
                                            time={friday[0]}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerFridayTo}
                                            time={friday[1]}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                                <label className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='dv-store-name pl-2'>Saturday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerSaturdayFrom}
                                            time={saturday[0]}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerSaturdayTo}
                                            time={saturday[1]}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                                <label className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='dv-store-name pl-2'>Sunday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerSundayFrom}
                                            time={sunday[0]}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerSundayTo}
                                            time={sunday[1]}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 pl-lg-2 mb-3 ">
                            <div className="dv-bg-light-vendors dv-bg-light pb-2 mb-3 px-3 px-md-5">
                                <div className="row" dir='rtl'>
                                    <div className="col-12 mb-3">
                                        <h3 className='dv-gray-h'>Add store images</h3>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className='dv-upload-file-label'>
                                            <i className='las la-plus'></i>
                                            <input type="file" accept="image/*" onChange={this.thisUploadImage}
                                                   className='dc-upload-file'/>
                                        </label>
                                    </div>
                                    {
                                        new_uploaded_img_arr?.map((item, i) => (
                                            <div className="col-6 mb-3">
                                                <div className="dv-img-store-parent">
                                                    <img className='img-fluid'
                                                         onError={(e) => {
                                                             e.target.onerror = null;
                                                             e.target.src = `${placeHolder_img}`
                                                         }}
                                                         src={`${MAIN_URL_IMAGE}${item}`} key={i} alt="Bed mal"/>
                                                    <i className="las la-times-circle dv-store-icons"
                                                       onClick={() => this.removeHandler(item)}/>
                                                    <i className="las la-arrow-up dv-store-icons"
                                                       onClick={() => this.arrowUpHandler(i)}/>
                                                    <i className="las la-arrow-down dv-store-icons"
                                                       onClick={() => this.arrowDownHandler(i)}/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="dv-bg-light-vendors dv-bg-light pb-2 mb-3 px-3 px-md-5">
                                <h3 className='dv-gray-h'>Store descriptor (Max. 3)</h3>
                                <div className="d-flex flex-wrap py-4">
                                    {this.state.department_items?.map(checkbox => (
                                        <label
                                            className={
                                                selectedCheckboxes?.find(element => element === checkbox.id) ?
                                                    'dv-label-checkbox-checked mr-3' :
                                                    'dv-label-checkbox mr-3'
                                            }
                                            key={checkbox.id}>
                                            <span>{checkbox.name}</span>
                                            <input
                                                type="checkbox"
                                                checked={false}
                                                onChange={() => this.onChange(checkbox.id)}
                                                selected={selectedCheckboxes?.includes(checkbox.id)}
                                            />
                                        </label>
                                    ))}


                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <Modal style={{textAlign: 'center'}} centered={true} show={this.state.sure_remove}
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
                                        onClick={this.sureRemove}>Yes
                                </button>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default AddVendor;