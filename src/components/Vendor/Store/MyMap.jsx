import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
// import { iconPerson } from './Icon';
import {useState} from "react";

const LocationMarker = (props) => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click(e) {
            console.log(e.latlng)
            setPosition(e.latlng)
        }
    })

    return position === null ? null : (
        <Marker position={position} {...props}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

const MyMap = () => {
    const position = [51.505, -0.09]

    return (
        <div style={{width: '900px', height: '700px'}}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height: '100%'}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>


    );
};

export default MyMap;
