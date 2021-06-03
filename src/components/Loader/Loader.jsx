import React from "react";
import "./Loader.styles.scss"
import Logo from '../../assets/image/Bedmal logo text.png';
const Loader = (props) => (
    <div id="loader" className={"loader hidden"} >
        <div className="loadingio-spinner-ellipsis-vbzr0p1jua">
            <img src={Logo} alt="BedMall"/>
            <div className="ldio-76msoii4h9c">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
);

export default Loader;
