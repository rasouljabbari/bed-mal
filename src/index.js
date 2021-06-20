import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/style/_variables.scss';
import './assets/style/main-styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/style/line-awesome.min.css';
ReactDOM.render(
        <BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
            <App />
        </BrowserRouter>,
    document.getElementById('root')
);
