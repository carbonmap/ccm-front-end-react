import React, { Component } from 'react';
import { GeoJSON, FeatureGroup, Popup } from 'react-leaflet';
import Basemap from "./Basemap";

interface GeojsonDataProps {
    geoData: any

}


class GeojsonLayer extends Component <GeojsonDataProps> {
    render() {
        console.log('render')
        console.info(this.props.geoData);

        return (
            <FeatureGroup>
                {

                    <GeoJSON key={this.props.geoData["properties"]["id"]} data={this.props.geoData}>
                        <Popup>{this.props.geoData["properties"]["id"]}</Popup>
                    </GeoJSON>
                }
            </FeatureGroup>
        );
    }
}

export default GeojsonLayer;