import React, { Component } from 'react';
import { GeoJSON, FeatureGroup, Popup } from 'react-leaflet';


type processGeoJsonLayersVisibilityType = (_id: string, currentLayerVisible: boolean) => void;

interface GeojsonDataProps {
    geoData: any,
    processGeoJsonLayersVisibility: processGeoJsonLayersVisibilityType,
    visible: boolean,
    style: object
}

// const INVISIBLE = '#00eab8';

// interface State {
//     visible: boolean
// }


class GeojsonLayer extends Component <GeojsonDataProps> {

    // state = {
    //     visible: false
    // }


    // toggleVisibilityStyle = (visible: boolean) => {
    //     let style: object = {
    //         color: INVISIBLE,
    //         fillColor: INVISIBLE,
    //         fillOpacity: 0,
    //         weight: 0,
    //     }
    //     if (visible) {
    //         style = {
    //             color: '#008468',
    //             fillColor: '#008468',
    //             fillOpacity: 0.1,
    //             weight: 2,
    //         }
    //     }
    //     return style;
    // }


    // changeLayerColor = (event: any) => {
    //
    //     let newStyle: object = {
    //         color: INVISIBLE,
    //         fillColor: INVISIBLE,
    //         fillOpacity: 0,
    //         weight: 0,
    //     };
    //     let newStatus: boolean = false;
    //
    //     // set the new visible colour
    //     if (this.state.visible === false) {
    //         newStyle = {
    //             color: '#008468',
    //             fillColor: '#008468',
    //             fillOpacity: 0.1,
    //             weight: 2,
    //         };
    //         newStatus = true;
    //     }
    //
    //     event.target.setStyle(newStyle);
    //     this.setState({
    //         visible: newStatus
    //     })
    // };

    changeLayerColor = (event: any) => {

        let newStyle: object = {

                color: "#00eab8",
                fillOpacity: 0,
                weight: 2,

        };
        if (this.props.visible) {
            console.log(1);
            newStyle = {
                color: '#008468',
                fillOpacity: 0.1,
                weight: 2,
            }
        }
        console.log(2);
        event.target.setStyle(newStyle);
    };



    toggleVisibilityStyle = (feature: any, layer: any) => {
        // const countryName = country.properties.ADMIN;
        // console.log(countryName);
        // layer.bindPopup(countryName);
        //
        // layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)
        // // const colorIndex = Math.floor(Math.random() * this.colors.length);
        // // layer.options.fillColor = this.colors[colorIndex]; //0
        //
        // layer.on({
        //     click: this.changeLayerColor,
        // });

        // color: INVISIBLE,
        // fillColor: INVISIBLE,
        // fillOpacity: 0,
        // weight: 0

        // color: '#008468',
        // fillColor: '#008468',
        // fillOpacity: 0.1,
        // weight: 2,

        // if (this.props.visible) {
        //     layer.options.color = '#008468';
        //     layer.options.fillColor = '#008468';
        //     layer.options.fillOpacity = 1;
        //     layer.options.weight = 3;
        // } else {
        //     layer.options.color = "#00eab8";
        //     layer.options.fillColor = "#00eab8";
        //     layer.options.fillOpacity = 0.1;
        //     layer.options.weight = 2;
        // }

        layer.on({
            click: this.changeLayerColor,
        });
        // console.log(layer);
        // layer.options.color = '#008468';
        // layer.options.fillColor = '#008468';
        // layer.options.fillOpacity = 0.1;
        // layer.options.weight = 2;

    };

    // setDefaultStyle = {
    //
    //     color: '#008468',
    //     fillOpacity: 0.1,
    //     weight: 2
    // }

    render() {
        return (
            <FeatureGroup eventHandlers={{
                click: () => {
                   // this.changeLayerColor(event);
                    console.log('processGeoJsonLayersVisibility triggered');
                   this.props.processGeoJsonLayersVisibility(
                       this.props.geoData["properties"]["id"],
                       this.props.visible
                   );
                }
            }}
            >
                {
                    <GeoJSON key={this.props.geoData["properties"]["id"]}
                             data={this.props.geoData}
                             // style={this.setDefaultStyle}
                             style={() => (this.props.style)}
                             // style={() => {return this.toggleVisibilityStyle(this.props.visible)}}
                             onEachFeature={this.toggleVisibilityStyle}
                    >
                        <Popup>{this.props.geoData["properties"]["id"]}</Popup>
                    </GeoJSON>
                }
            </FeatureGroup>
        );
    }
}

export default GeojsonLayer;
