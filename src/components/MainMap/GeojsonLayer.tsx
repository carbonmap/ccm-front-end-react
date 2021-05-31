import React, { Component } from 'react';
import { GeoJSON, FeatureGroup, Popup } from 'react-leaflet';
import MainMap from "./MainMap";
import initialGeoJsonFileNames from "./models/index.json";

interface GeojsonDataProps {
    geoData: any
}

interface State {
    isVisible: boolean
}

class GeojsonLayer extends Component <GeojsonDataProps, State> {

    state = {
        isVisible: false
    }

    render() {
        console.log('render')
        console.info(this.props.geoData);

        return (
            <FeatureGroup>
                {
                    <GeoJSON key={this.props.geoData["properties"]["id"]}
                             data={this.props.geoData}
                    >
                        <Popup>{this.props.geoData["properties"]["id"]}</Popup>
                    </GeoJSON>
                }
            </FeatureGroup>
        );
    }
}

export default GeojsonLayer;