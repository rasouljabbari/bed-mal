// import axiosInstance from "../../axios-order";
import {toast} from "react-toastify";
import axios from "axios"
import Swal from "sweetalert2";
import {timer} from "redux-logger/src/helpers";
import {MAIN_URL} from "./GeneralVariables";
// const BrowserHistory = require('react-router/lib/BrowserHistory').default;
// import { BrowserHistory } from "react-router";


export const getData = async (base_url, url, type, dataParams = {}, isToken = false, isLoader = true, isHeaderJson = false, default_token = null) => {
    if (isLoader) {
        loader(true)
    }
    let header = {};
    if (isToken && default_token) {
        header = {headers: {Authorization: `Bearer ${default_token}`}};
        if (isHeaderJson) {
            header = {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: `Bearer ${default_token}`,
                    Accept: "*/*",
                }
            };
        }
    } else if (isToken) {
        header = {headers: {Authorization: `Bearer ${localStorage.getItem("Token")}`}};
        if (isHeaderJson) {
            header = {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    Accept: "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Access-Control-Allow-Origin": "*/*",
                    'Access-Control-Allow-Credentials': 'true',
                    Connection: "keep-alive"
                }
            };
        }
    }

    if (type === "post") {
        let formData;
        if (isHeaderJson) {
            formData = dataParams;
        } else {
            formData = new URLSearchParams();
            for (let key in dataParams) {
                formData.append(key, dataParams[key])
            }
        }
        try {
            // console.log(base_url+url);
            const {data, status} = isToken ? await axios.post(base_url + url, formData, header) : await axios.post(base_url + url, formData);
            loader();
            // console.log(data);
            if (status === 200) {
                for (let key in data.messages) {
                    toast.success(data.messages[key])
                }
                return data;
            }
            else {
                toast.error("An unwanted error occurred");
                return false;
            }

        } catch (e) {
            loader();
            if (e.message === 'Network Error') {
                Swal.fire({
                    icon: 'error',
                    title: 'Please check your internet connection',
                    allowOutsideClick: false,
                })
            }else if (e.response || (e.response?.data.message || e.response?.data.messages || e.response?.data.errors)) {

                if (e.response.status === 403) {
                    e.response.data.errors?.map((row)=>{
                        toast.error(row.message)
                    })
                }
                else if (e.response.status === 400) {
                    console.log('dsvdsvd')
                    e.response.data.errors?.map((row)=>{
                        toast.error(row.message)
                    })

                }
                else if (e.response.status === 404) {
                    window.location.replace('/notFound');
                }
                else if (e.response.status > 404 && e.response.status < 500) {

                    e.response.data.errors?.map((row)=>{
                        toast.error(row.message)
                    })
                }
                else if (e.response.status === 500 || e.response.status === 503) {
                    e.response.data.errors?.map((row)=>{
                        toast.error(row.message)
                    })
                }
                else if (e.response.status === 500) {
                    toast.error("An unwanted error occurred");
                    loader(false);
                }
                else if (e.response.status === 401) {
                        window.location.replace('login');
                        localStorage.removeItem("Token");
                        toast.error("unauthorized");
                        // this.props.setLoginStatus(false);
                    }
                else {
                    toast.error(e.message);
                }

            }else {
                if (e.response?.status === 404) {
                    window.location.replace('/notFound')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'access denied',
                        allowOutsideClick: false,
                        // text: e.response.data.errors[0],
                        text: 'An unwanted error occurred',
                        // footer: '<a href="/profile">انتقال به صفحه پروفایل</Link>'
                    })
                }
            }
        }

    }
    else {
        let formData = "";
        for (let key in dataParams) {
            formData += formData.slice(-1) === "" ? `${key}=${dataParams[key]}` : `&${key}=${dataParams[key]}`;
        }

        try {
            // console.log(base_url+url);
            const {data, status} = isToken ? await axios.get(base_url + url + formData, header) : await axios.get(base_url + url + formData);
            loader();
            // console.log(data);
            if (status === 200) {
                for (let key in data.messages) {
                    toast.success(data.messages[key])
                }
                return data;
            } else {
                toast.error("An unwanted error occurred");
                return false;
            }
        } catch (e) {
            // console.log(e.response , e.response.data.status , e.response.status , e.response.data.message , e.response.data.messages , e.response.data.errors);

            loader();
            if (e.message === 'Network Error') {
                Swal.fire({
                    icon: 'error',
                    title: 'Please check your internet connection',
                    allowOutsideClick: false,
                })
            }else if(e.response || (e.response?.data.message || e.response?.data.messages || e.response?.data.errors)) {
                if (e.response.status === 404) {
                    window.location.replace('/notFound');
                }
                else if (e.response.status === 403) {

                        for (let key in e.response.data.errors) {
                            toast.error(e.response.data.errors[key])
                        }
                }
                else if (e.response.status > 404 && e.response.status < 500) {
                    if (e.response.data && e.response.data.errors) {
                        // console.log(e.response, "RASOUL")
                        for (let key in e.response.data.errors) {
                            toast.error(e.response.data.errors[key])
                        }
                    } else {
                        toast.error("An unwanted error occurred")
                    }
                }
                else if (e.response.status === 400) {
                    for (let key in e.response.data.errors) {
                        toast.error(e.response.data.errors[key])
                    }
                }
                else if (e.response.status === 500 || e.response.status === 503) {
                    toast.error("An unwanted error occurred");
                    loader(false);
                }
                else if (e.response.status === 401) {
                    // console.log(localStorage.getItem('app'));

                        window.location.replace('/login');
                        localStorage.removeItem("Token");
                        toast.error("access denied");
                        // this.props.setLoginStatus(false);
                    }
                }
        }

    }
};

export const editedItems = (lastItems, newItem) => {
    return lastItems.map(item => {
        if (item.name === newItem.name) {
            return {...newItem}
        } else {
            return {...item}
        }
    });
};

export const loader = (state = false) => {

    try {
        state ? document.getElementById('loader').classList.remove('hidden')
            : document.getElementById('loader').classList.add('hidden');
    } catch (e) {

    }

};

export const setTitle = (title) => {
    document.title = title
    document.getElementById('dv_header_title').innerText = title

};

export const traverse = (val) => {
    let regex = /[۰-۹]/g
    let str = val;
    let result = str.replace(regex, function (w) {
            return String.fromCharCode(w.charCodeAt(0) - 1728)
        }
    );
    return result;
};

export const isEmpty = (obj) => {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
};

export const fixNumber = (str) => {
    let
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
    if (typeof str === 'string') {
        for (let i = 0; i < 10; i++) {
            str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }
    return str;
};

export const priceFormat = (price) => {
    let formattedPrice = "";
    price = price + "";
    for (let i = price.length; i >= 0; i--) {
        if (i !== price.length && i !== 0 && i % 3 === 0)
            formattedPrice += ",";
        formattedPrice += price.charAt(price.length - i);
    }
    return formattedPrice;
};

export const getPercent = (current_number, last_number, dec = 2) => {
    if (last_number === 0) {
        return 0
    }else
    return ((current_number - last_number) / Math.abs(last_number) * 100).toFixed(dec);
};

export const getNumberFormat = (current_number, dec = 2) => {
    // return priceFormat(y[0])
    // const intX = parseInt(y[0]);

    if (1000000000 <= current_number) {
        let z = current_number / 1000000000;
        const q = z.toFixed(2);
        const x = `${q}`;


        const splitNum = x.split('.')[0];
        const splitNum2 = x.split('.')[1];

        if (splitNum2 === '00') {
            return priceFormat(splitNum) + ' B';
        } else {
            return priceFormat(splitNum).concat("." + splitNum2) + ' B';
        }
    } else if (1000000 <= current_number && current_number < 1000000000) {
        let z = current_number / 1000000;
        const q = z.toFixed(2);
        const x = `${q}`;


        const splitNum = x.split('.')[0];
        const splitNum2 = x.split('.')[1];

        if (splitNum2 === '00') {
            return priceFormat(splitNum) + ' M';
        } else {
            return priceFormat(splitNum).concat("." + splitNum2) + ' M';
        }

    } else if (current_number < 1000000 && current_number > 0) {
        if (current_number >= 1000) {
            const q = current_number.toFixed(2);
            const x = `${q}`;

            const splitNum = x.split('.')[0];
            const splitNum2 = x.split('.')[1];

            // console.log(splitNum2);

            if (splitNum2 === '00') {
                return priceFormat(splitNum);
            } else {
                return priceFormat(splitNum).concat("." + splitNum2);
            }

        } else if (100 < current_number < 1000) {
            return current_number.toFixed(2)
            // console.log(current_number)
        } else if (current_number < 100) {
            return current_number.toFixed(2)
        }
    } else if (-1000000000 >= current_number) {

        let z = (-1) * (current_number / 1000000000);
        const q = z.toFixed(2);
        const x = `${q}`;


        const splitNum = x.split('.')[0];
        const splitNum2 = x.split('.')[1];
        if (splitNum.length > 3) {
            return '-' + priceFormat(splitNum).concat(splitNum2) + ' B';
        } else {
            return '-' + priceFormat(splitNum).concat("." + splitNum2) + ' B';
        }

    } else if (-1000000 >= current_number && current_number > -1000000000) {
        let z = (-1) * (current_number / 1000000);
        const q = z.toFixed(2);
        const x = `${q}`;


        const splitNum = x.split('.')[0];
        const splitNum2 = x.split('.')[1];

        if (splitNum2 === '00') {
            return priceFormat(splitNum) + 'M';
        } else {
            return priceFormat(splitNum).concat("." + splitNum2) + ' M';
        }
    } else if (current_number > -1000000 && current_number < 0) {
        // console.log("-" , current_number);
        if (current_number <= -1000) {
            const q = current_number.toFixed(2);
            const x = `${q}`;

            const splitNum = x.split('.')[0];
            const splitNum2 = x.split('.')[1];
            if (splitNum2 === '00') {
                return priceFormat(splitNum);
            } else {
                return priceFormat(splitNum).concat("." + splitNum2);
            }

        } else if (-100 >= current_number > -1000) {
            return current_number.toFixed(2)
        } else return current_number.toFixed(2)
    } else if (current_number === 0) {
        return 0
    }
};
// Email Address regex
export const emailRegex = (email) => {
    let numRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email === "" || !numRegex.test(email)) {
        toast.error("Invalid email address");
        return false;
    }
}
