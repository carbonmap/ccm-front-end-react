import React, {Component} from 'react';
import { MapContainer, TileLayer, Marker, Popup, MapConsumer, Polygon, FeatureGroup } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {geoJSON, Icon} from 'leaflet';
import GeojsonLayer from "./GeojsonLayer";
import fetchGeoData from "../../service/fetchURL/fetchGeoData";


interface State {
    markers: Array<Array<number>>,
    geoData: JSX.Element[],
    visibleEntity: string
}

interface GeoDataObject {
    type: string,
    features: Array<any>
}


class MainMap extends Component <{slug:string}, State> {
    state = {
        markers: [[52.20, 0.12]],
        geoData: [],
        visibleEntity: "net.theleys"
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
        // console.log(this.state.geoData);
    }

    handleGeoDataCoords = (defaultGeoData:any) => {
        let newGeoData = defaultGeoData;
        for(let i = 0; i < newGeoData.length; i++) {
            if(newGeoData[i].features[0].geometry.type === "MultiPolygon") {

                const multiPolygonArr = newGeoData[i].features[0].geometry.coordinates
                for(let i = 0; i < multiPolygonArr.length; i++) {
                    multiPolygonArr[i][0].map((entity:string[]) => {
                        return entity.reverse();
                    });
                }; 
            } else if (newGeoData[i].features[0].geometry.type === "Polygon") {
                newGeoData[i].features[0].geometry.coordinates[0].map((entity:string[]) => {
                   return entity.reverse();
                });
            }
        };

        console.log(newGeoData)
        this.setState({
            geoData: newGeoData
        });
    };

    async componentDidMount() {
        console.log('did mount');
        const defaultGeoData: any = await fetchGeoData();
        // console.log(defaultGeoData)
        this.handleGeoDataCoords(defaultGeoData);
        // this.addGeoJsonLayers(defaultGeoData);
    }

    render() {
        console.log("Rendering map");
        let GeoJsonLayers = null;
        if (this.state.geoData.length > 0) {
            // console.log(this.state.geoData);
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
                    {this.state.geoData.length > 0 ?
                        this.state.geoData.map((entity:any) => {
                            const features = entity.features[0];
                            const coords = features.geometry.coordinates;
                            const id = features.properties.id;
                            return (
                                <FeatureGroup
                                    eventHandlers={{
                                        click: (event) => {
                                            this.setState({
                                                visibleEntity: id
                                            })
                                        // this.changeLayerColor(event)
                                    }}}
                                >
                                    <Polygon 
                                        pathOptions={{
                                            color: this.state.visibleEntity === id ? '#008468' : '#00eab8',
                                            fillOpacity: 0.4,
                                        }}
                                        positions={coords}
                                    >
                                        <Popup>{features.properties.id}</Popup>
                                    </Polygon>
                                </FeatureGroup>
                            )
                        })
                    :
                        null
                    }
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />

                </MapContainer>
            </div>
        );
    };
};

export default MainMap;