import React, {Component} from 'react';
import './MiniLoader-styles.scss'

class MiniLoader extends Component {
    render() {
        return (
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }
}

export default MiniLoader;
