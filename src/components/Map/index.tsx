import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, MapConsumer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from 'leaflet';


interface State {
    markers: Array<Array<number>>
}

class Map extends Component <{}, State> {
    state = {
        markers: [[52.20, 0.12]]
    }

    addMarker = (e: any)  => {
        const { markers } = this.state;
        markers.push(e.latlng);
        this.setState({ markers });
    }

    render() {
        
        return (
            <div>
                <MapContainer
                    center={[52.20, 0.12]}
                    zoom={13}
                    maxZoom={18}
                    minZoom={5}
                    style={{height: '1000px', width: '100%' }}
                >
                    <MapConsumer>
                        {(map) => {
                            console.log("map center:", map.getCenter());
                            map.on("click", (e) => {
                                this.addMarker(e);
                            });
                            return null;
                        }}

                    </MapConsumer>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />

                    {this.state.markers.map((position:any, idx:any) =>
                        <Marker key={`marker-${idx}`}
                                position={position}
                                icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
                        >
                            <Popup>
                                <span>Hi! I am an entity</span>
                            </Popup>
                        </Marker>
                    )}

                </MapContainer>
            </div>
        );
    }
}

export default Map;
