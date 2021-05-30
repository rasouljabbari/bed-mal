import React, {Component} from 'react';
import './vendors.scss'
import {setTitle} from "../../../assets/scripts/GeneralFunctions";
import StoreImg from '../../../assets/image/4.0 Elite DeckTwist.png'

import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
// Open street
import axios from "axios";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicmpkZXZlbG9wZXIiLCJhIjoiY2twNmtyejhiMHJoaTJ3cXRpd2dsZXJyNSJ9.-vVOy-9UQcN0Dh61WwA-QQ';

const checkboxes = [
    {id: 1, text: "Coffee shop"},
    {id: 2, text: "Garden centre"},
    {id: 3, text: "DIY"},
    {id: 4, text: "Pets"},
    {id: 5, text: "Technology"},
];

class Vendors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map_coordinates: '', store_address: '', store_phone: '', store_email: '', store_name: '',
            monday_to: '', monday_from: '', postal_code: '',
            selectedCheckboxes: [], selectedId: '', lng: -2.3899,
            lat: 53.0544,
            zoom: 5
        }
        this.mapContainer = React.createRef();
    }

    async componentDidMount() {
        setTitle('Store')
        const {lng, lat, zoom} = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        let marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([lng,lat])
            .addTo(map);

        function onDragEnd() {
            let lngLat = marker.getLngLat();
            console.log('Longitude: ' + lngLat.lng + 'Latitude: ' + lngLat.lat)
        }

        marker.on('dragend', onDragEnd);


        // Set options
    };

    vendorListItemHandler = (id) => {
        console.log(id)
    }
    handleMessage = (id) => {
        console.log(id)
    }
    handleCall = (id) => {
        console.log(id)
    }
    /******************************************************/
    //Change Status
    HandlerChangeStatus = async (e, id) => {
        // const list = await getData(MAIN_URL, `team/change-status/${id}`, 'post', {
        //     status: e
        // }, true, true);
        //
        // if(list?.status === 200){
        //     this.setState({switchId:id , switchValue: list.team.status})
        //
        //     let data = await getData(MAIN_URL, `team?limit=20&offset=0`, 'get', {}, true, true);
        //
        //     if (list?.status === 200) {
        //         this.setState({
        //             teams: data.items,
        //             users: data.users
        //         })
        //         Swal.fire({
        //             title: 'با موفقیت تغییر کرد',
        //             icon: 'success',
        //         })
        //     }
        // }

    };
    /**********************************************/

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    timeInputHandlerMondayFrom = (options) => {
        this.setState({monday_from: `${options.hour}:${options.minute}`})
    }
    timeInputHandlerMondayTo = (options) => {
        this.setState({monday_to: `${options.hour}:${options.minute}`})
    }

    timeInputHandlerTuesdayFrom = (options) => {
        this.setState({tuesday_from: `${options.hour}:${options.minute}`})
    }
    timeInputHandlerTuesdayTo = (options) => {
        this.setState({tuesday_to: `${options.hour}:${options.minute}`})
    }

    timeInputHandlerWednesdayFrom = (options) => {
        this.setState({wednesday_from: `${options.hour}:${options.minute}`})
    }
    timeInputHandlerWednesdayTo = (options) => {
        this.setState({wednesday_to: `${options.hour}:${options.minute}`})
    }

    timeInputHandlerThursdayFrom = (options) => {
        this.setState({thursday_from: `${options.hour}:${options.minute}`})
    }
    timeInputHandlerThursdayTo = (options) => {
        this.setState({thursday_to: `${options.hour}:${options.minute}`})
    }

    timeInputHandlerFridayFrom = (options) => {
        this.setState({friday_from: `${options.hour}:${options.minute}`})
    }
    timeInputHandlerFridayTo = (options) => {
        this.setState({friday_to: `${options.hour}:${options.minute}`})
    }

    timeInputHandlerSaturdayFrom = (options) => {
        this.setState({saturday_from: `${options.hour}:${options.minute}`})
    }
    timeInputHandlerSaturdayTo = (options) => {
        this.setState({saturday_to: `${options.hour}:${options.minute}`})
    }

    timeInputHandlerSundayFrom = (options) => {
        this.setState({sunday_from: `${options.hour}:${options.minute}`})
    }
    timeInputHandlerSundayTo = (options) => {
        this.setState({sunday_to: `${options.hour}:${options.minute}`})
    }

    handleForm = (e) => {
        e.preventDefault()
    }

    removeHandler = (id) => {
        console.log(id)
    }
    arrowUpHandler = (id) => {
        console.log(id)
    }
    arrowDownHandler = (id) => {
        console.log(id)
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

        // Index > -1 means that the item exists and that the checkbox is checked
        // and in that case we want to remove it from the array and uncheck it
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

    render() {
        const {selectedCheckboxes, lng, lat, zoom} = this.state;
        console.log(lng, lat, zoom)
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
                            <h5 className='dv-vendor-list-title mb-0'>Fulfilment</h5>
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
                <div className='dv-vendor-right-content dv-vendor-right-content-2'>
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
                                            time={this.state.monday_from}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerMondayTo}
                                            time={this.state.monday_to}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                                <label className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='dv-store-name pl-2'>Tuesday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerTuesdayFrom}
                                            time={this.state.tuesday_from}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerTuesdayTo}
                                            time={this.state.tuesday_to}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                                <label className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='dv-store-name pl-2'>Wednesday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerWednesdayFrom}
                                            time={this.state.wednesday_from}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerWednesdayTo}
                                            time={this.state.wednesday_to}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                                <label className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='dv-store-name pl-2'>Thursday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerThursdayFrom}
                                            time={this.state.thursday_from}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerThursdayTo}
                                            time={this.state.thursday_to}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                                <label className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='dv-store-name pl-2'>Friday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerFridayFrom}
                                            time={this.state.friday_from}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerFridayTo}
                                            time={this.state.friday_to}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                                <label className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='dv-store-name pl-2'>Saturday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerSaturdayFrom}
                                            time={this.state.saturday_from}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerSaturdayTo}
                                            time={this.state.saturday_to}
                                            minuteStep={1}
                                        />
                                    </div>
                                </label>
                                <label className='d-flex justify-content-between align-items-center mb-2'>
                                    <span className='dv-store-name pl-2'>Sunday</span>
                                    <div className="d-flex">
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerSundayFrom}
                                            time={this.state.sunday_from}
                                            minuteStep={1}
                                        />
                                        <TimePicker
                                            onTimeChange={this.timeInputHandlerSundayTo}
                                            time={this.state.sunday_to}
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
                                            <input type="file" className='dc-upload-file'/>
                                        </label>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <div className="dv-img-store-parent">
                                            <img src={StoreImg} alt="Bed mal"/>
                                            <i className="las la-times-circle dv-store-icons"
                                               onClick={() => this.removeHandler(1)}/>
                                            <i className="las la-arrow-up dv-store-icons"
                                               onClick={() => this.arrowUpHandler(2)}/>
                                            <i className="las la-arrow-down dv-store-icons"
                                               onClick={() => this.arrowDownHandler(3)}/>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <div className="dv-img-store-parent">
                                            <img src={StoreImg} alt="Bed mal"/>
                                            <i className="las la-times-circle dv-store-icons"
                                               onClick={() => this.removeHandler(1)}/>
                                            <i className="las la-arrow-up dv-store-icons"
                                               onClick={() => this.arrowUpHandler(2)}/>
                                            <i className="las la-arrow-down dv-store-icons"
                                               onClick={() => this.arrowDownHandler(3)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dv-bg-light-vendors dv-bg-light pb-2 mb-3 px-3 px-md-5">
                                <h3 className='dv-gray-h'>Store descriptor (Max. 3)</h3>
                                <div className="d-flex flex-wrap py-4">
                                    {checkboxes.map(checkbox => (
                                        <label
                                            className={
                                                selectedCheckboxes.find(element => element === checkbox.id) ?
                                                    'dv-label-checkbox-checked' :
                                                    'dv-label-checkbox'
                                            }
                                            key={checkbox.id}>
                                            <span>{checkbox.text}</span>
                                            <input
                                                type="checkbox"
                                                checked={false}
                                                onChange={() => this.onChange(checkbox.id)}
                                                selected={selectedCheckboxes.includes(checkbox.id)}
                                            />
                                        </label>
                                    ))}


                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default Vendors;