import React, {Component} from 'react';
import { MapContainer, TileLayer, Marker, Popup, MapConsumer } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {geoJSON, Icon} from 'leaflet';
import GeojsonLayer from "./GeojsonLayer";
import fetchGeoData from "../../service/fetchURL/fetchGeoData";


interface State {
    markers: Array<Array<number>>,
    geoData: JSX.Element[],

}

interface GeoDataObject {
    type: string,
    features: Array<any>
}


class MainMap extends Component <{}, State> {
    state = {
        markers: [[52.20, 0.12]],
        geoData: [],

    }

    addMarker = (e: any) => {
        const { markers } = this.state;
        markers.push(e.latlng);
        this.setState({markers});
    }

    addGeoJsonLayers = (defaultGeoData: any) => {
        let tempGeoData: JSX.Element[] = this.state.geoData;
        defaultGeoData.map((geoDataContent: GeoDataObject, item: number) => {
            const geoData_ = geoDataContent["features"][0];
            const _id = `geo_json_layer_id_${item}`;
            tempGeoData.push(
                <GeojsonLayer
                    key={_id}
                    geoData={geoData_}
                />
            );
        })
        this.setState({geoData: tempGeoData})
        console.log("Geo Data in the state");
        console.log(this.state.geoData);
    }

    async componentDidMount() {
        console.log('did mount');
        const defaultGeoData: any = await fetchGeoData();
        this.addGeoJsonLayers(defaultGeoData);
    }

    render() {
        console.log("Rendering map");
        let GeoJsonLayers = null;
        if (this.state.geoData.length > 0) {
            console.log(this.state.geoData);
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
                            // console.log("basemap center:", map.getCenter());
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

                    {/*{this.state.markers.map((position: any, idx: any) =>*/}
                    {/*    <Marker key={`marker-${idx}`}*/}
                    {/*            position={position}*/}
                    {/*            icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}*/}
                    {/*    >*/}
                    {/*        <Popup>*/}
                    {/*            <span>Hi! I am an entity</span>*/}
                    {/*        </Popup>*/}
                    {/*    </Marker>*/}
                    {/*)}*/}

                </MapContainer>
            </div>
        );
    }
}

export default MainMap;

