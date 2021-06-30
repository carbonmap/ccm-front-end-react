import React, { Component } from 'react';
import { GeoJSON, FeatureGroup, Popup } from 'react-leaflet';

import './geojsonlayer.css';


interface GeojsonDataProps {
    geoData: any
}

const INVISIBLE = 'rgba(0,0,0,0)';


interface State {
    visible: boolean
}
// type PropsType = GeojsonDataProps & GeojsonProps;

class GeojsonLayer extends Component <GeojsonDataProps, State> {

    state = {
        visible: false
    }

    defaultStyle = () => {
        return {
            color: INVISIBLE,
            weight: 3,
            opacity: 1,
            fillColor: INVISIBLE,

            // dashArray: '8 5'
        }
    }

    changeLayerColor = (event: any) => {

        let newStyle: object = {
            color: INVISIBLE,
            fillColor: INVISIBLE,
            fillOpacity: 0,
            weight: 0,
        };
        let newStatus: boolean = false;

        // set the new visible colour
        if (this.state.visible === false) {
            newStyle = {
                color: '#008468',
                fillColor: '#008468',
                fillOpacity: 0.1,
                weight: 2,
            };
            newStatus = true;
        }

        event.target.setStyle(newStyle);
        this.setState({
            visible: newStatus
        })
    };

    render() {
        return (
            <FeatureGroup eventHandlers={{
                click: (event) => {
                   this.changeLayerColor(event)
                }
            }}
            >
                {
                    <GeoJSON key={this.props.geoData["properties"]["id"]}
                             data={this.props.geoData}
                             style={this.defaultStyle}

                    >
                        <Popup>{this.props.geoData["properties"]["id"]}</Popup>
                    </GeoJSON>
                }
            </FeatureGroup>
        );
    }
}

export default GeojsonLayer;