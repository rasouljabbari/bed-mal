import React, {Component} from 'react';
import './notFound.styless.css';
import {Link} from "react-router-dom";

class NotFound extends Component {
    render() {
        return (
            <div id='notfound'>
                <div className='notfound-bg'></div>
                <div className='notfound'>
                    <div className='notfound-404'>
                        <h1>404</h1>
                    </div>
                    <h2 className='mb-3'>PAGE NOT FOUND</h2>
                </div>

            </div>
        );
    }
}

export default NotFound;