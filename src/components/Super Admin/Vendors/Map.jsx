import React from "react";
import {
    MapContainer, TileLayer, Marker, Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import icon from "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png";
// import "./styles.css";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: iconShadow
});
export default class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            markers: [[51.505, -0.09]]
        };
    }

    addMarker = (e) => {
        alert(e.latlng)
        const {markers} = this.state
        markers.push(e.latlng)
        this.setState({markers})
    }

    render() {
        return (
            <MapContainer
                center={[51.505, -0.09]}
                onClick={this.addMarker}
                zoom={13}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {this.state.markers.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        );
    }
}
