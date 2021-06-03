import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {setTitle} from "../../../assets/scripts/GeneralFunctions";

class Dashboard extends Component {
    componentDidMount() {
        setTitle('Dashboard')
    }

    render() {
        return (
            <>
                <div className='row'>
                    <div className="col-12">
                        <h2>Dashboard</h2>
                    </div>

                </div>
            </>
        );
    }
}

export default Dashboard;