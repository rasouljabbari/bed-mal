import React, {Component} from 'react';
import './store.scss';
import {getData, loader, setTitle} from "../../../assets/scripts/GeneralFunctions";
import {Modal, Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
// Open street
import axios from "axios";
import mapboxgl from 'mapbox-gl';
import {MAIN_URL, MAIN_URL_IMAGE} from "../../../assets/scripts/GeneralVariables";
import Swal from "sweetalert2";
import placeHolder_img from '../../../assets/image/bedmal-place-holder.jpg'
import Menu from "./Menu";
import {toast} from "react-toastify";

mapboxgl.accessToken = 'pk.eyJ1IjoicmpkZXZlbG9wZXIiLCJhIjoiY2twNmtyejhiMHJoaTJ3cXRpd2dsZXJyNSJ9.-vVOy-9UQcN0Dh61WwA-QQ';

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map_coordinates: '', store_address: '', store_phone: '', store_email: '', store_name: '',
            monday_to: '', monday_from: '', postal_code: '',
            selectedCheckboxes: [], selectedId: '', lng: -2.3899, department_items: [],
            lat: 53.0544,
            zoom: 5, new_uploaded_img: '', new_uploaded_img_arr: [], sure_remove: false,
            monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [],
            selected_name: '', store_item: '',store_plan_terms:'',permissions_item:[]
        }
        this.mapContainer = React.createRef();
    }

    async componentDidMount() {
        setTitle('Store')

        const {lng, lat, zoom} = this.state;
        let storeDetails = await getData(MAIN_URL, `vendor/store-details`, 'get', {}, true, true);
        if (storeDetails?.status === 200) {
            this.setState({
                store_item: storeDetails?.item,
                store_name: storeDetails?.item.name,
                store_address: storeDetails?.item.address,
                lat: storeDetails?.item.latitude,
                lng: storeDetails?.item.longitude,
                store_email: storeDetails?.item.email,
                store_phone: storeDetails?.item.phone,
                new_uploaded_img_arr: storeDetails?.item.image_gallery,
                monday: storeDetails?.item.opening_hours.mon,
                tuesday: storeDetails?.item.opening_hours.tue,
                wednesday: storeDetails?.item.opening_hours.wed,
                thursday: storeDetails?.item.opening_hours.thu,
                friday: storeDetails?.item.opening_hours.fri,
                saturday: storeDetails?.item.opening_hours.sat,
                sunday: storeDetails?.item.opening_hours.sun,
                store_status: storeDetails?.item.status,
                store_plan_terms: storeDetails?.item.plan_terms,
                postal_code: storeDetails?.item.postal_code,
                selectedCheckboxes: storeDetails?.item.departments,
            })
        }
        let departmentItems = await getData(MAIN_URL, `vendor/departments`, 'get', {}, true, true);
        if (departmentItems?.status === 200) {
            this.setState({department_items: departmentItems.items})
        }

        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        let marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([lng, lat])
            .addTo(map);


        marker.on('dragend', () => {
            let lngLat = marker.getLngLat();
            this.setState({lng: lngLat.lng, lat: lngLat.lat})
        });

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

        this.setState({
            selectedCheckboxes: selectedCheckboxes,
            selectedId: id
        });
    };

    // Image Uploading and Remove
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
            axios.post(`${MAIN_URL}vendor/store-details/upload-image`, fd, {headers}).then(response => {
                if (response.status === 200) {
                    loader()
                    let arr = this.state.new_uploaded_img_arr;
                    arr.push(response.data.url)
                    this.setState({
                        new_uploaded_img_arr: arr
                    })
                }
            }).catch(error => {
                error.response.data.errors?.map((item) => {
                    toast.error(item.message)
                })
            })


        }
        reader.readAsDataURL(file);


        /***********************************************************************/


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
    // Image Uploading and Remove
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

        let storeItem = await getData(MAIN_URL, `vendor/store-details/edit`, 'post', {
            address: store_address,
            postal_code: postal_code,
            name: store_name,
            email: store_email,
            phone: store_phone,
            latitude: lat,
            longitude: lng,
            image_gallery: JSON.stringify(new_uploaded_img_arr),
            opening_hours: JSON.stringify(opening_hours),
            departments: JSON.stringify(selectedCheckboxes),

        }, true, true);
        if (storeItem?.status === 200) {
            console.log(storeItem)
            Swal.fire({
                icon: 'success',
                title: 'updated successful',
                allowOutsideClick: false,
            })
        }
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
        return (
            <div className='d-flex flex-column flex-md-row dv-vendor'>
                <div className="dv-vendors-right-admin dv-vendors-right-admin-2">
                    <Menu/>
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
                                <label htmlFor="dv-store-email" className='d-flex mb-4'>
                                    <span className='dv-store-name pr-2'>Email</span>
                                    <input type="email" name='store_email' value={this.state.store_email}
                                           onChange={this.inputHandler} id='dv-store-email'
                                           className='dv-store-input w-75'/>
                                </label>
                                <label htmlFor="dv-store-phone" className='d-flex mb-4'>
                                    <span className='dv-store-name pr-2'>Phone</span>
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
                                <label htmlFor="dv_postal_code" className='d-flex flex-column'>
                                    <span className='dv-store-name pl-2'>Postal code</span>
                                    <input type="text" name='postal_code' value={this.state.postal_code}
                                           onChange={this.inputHandler} id='dv_postal_code'
                                           className='dv-store-input w-100'/>
                                </label>
                                <label htmlFor="dv_map_coordinates" className='d-flex flex-column position-relative'>
                                    <span className='dv-store-name pl-2'>Map coordinates</span>
                                    <div ref={this.mapContainer} className="map-container"/>
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
                                                         src={`${MAIN_URL_IMAGE}${item}`} key={i}
                                                         alt="Bed mal"/>
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
                                                    'dv-label-checkbox-checked' :
                                                    'dv-label-checkbox'
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

export default Store;