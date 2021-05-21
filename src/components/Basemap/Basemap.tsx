import React, { Component } from 'react';
import {MapContainer, TileLayer, Marker, Popup, MapConsumer, GeoJSON} from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {geoJSON, Icon} from 'leaflet';
import GeojsonLayer from "./GeojsonLayer";
import initialGeoJsonFileNames from "./models/index.json";


import thelays from "./models/net.theleys.json";
import kings from "./models/uk.ac.cam.kings.json";
import stedmunds from "./models/uk.ac.cam.st-edmunds.json";


interface State {
    markers: Array<Array<number>>,
    geoData: JSX.Element[]
}

let uniNameToDataMap: any = {
    "net.theleys":  thelays,
    "uk.ac.cam.kings":  kings,
    "uk.ac.cam.st-edmunds":  stedmunds
}


class Basemap extends Component <{}, State> {
    state = {
        markers: [[52.20, 0.12]],
        initialGeoJsonFileNames: initialGeoJsonFileNames,
        geoData: []
    }

    addMarker = (e: any) => {
        const { markers } = this.state;
        markers.push(e.latlng);
        this.setState({markers});
    }

    addGeoJsonLayers = () => {
        const { initialGeoJsonFileNames } = this.state;
        let tempGeoData: JSX.Element[] = this.state.geoData;
        initialGeoJsonFileNames.map((file_path: string) => {
            const geoData_ = uniNameToDataMap[file_path]["features"][0];
            tempGeoData.push(<GeojsonLayer key={file_path} geoData={geoData_}/>);
        })
        console.log(1);
        this.setState({geoData: tempGeoData})
        console.log(this.state.geoData);
    }

    componentDidMount() {
        console.log('did mount');
        this.addGeoJsonLayers();
    }

    render() {
        let GeoJsonLayers = null;
        if (this.state.geoData) {
            GeoJsonLayers = this.state.geoData;
        }

        return (
            <div>
                <MapContainer
                    center={[52.20, 0.12]}
                    zoom={13}
                    maxZoom={18}
                    minZoom={5}
                    style={{height: '1000px', width: '100%'}}
                >
                    {GeoJsonLayers}
                    <MapConsumer>
                        {(map) => {
                            console.log("basemap center:", map.getCenter());
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

                    {this.state.markers.map((position: any, idx: any) =>
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

export default Basemap;
