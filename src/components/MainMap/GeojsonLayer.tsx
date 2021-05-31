import React, { Component } from 'react';
import { GeoJSON, FeatureGroup, Popup } from 'react-leaflet';


// type toggleSideMenuHandlerType = () => void;
interface GeojsonDataProps {
    geoData: any
    // toggleSideMenuHandler: toggleSideMenuHandlerType
}

const invisible = 'rgba(0,0,0,0)';
const visible = '#05B8CC';


interface State {
    colour: string
}

class GeojsonLayer extends Component <GeojsonDataProps, State> {

    state = {
        colour: invisible
    }

    toggleVisibility = () => {
        console.log("Toggling a json layer");
        let newColour = invisible;
        if (this.state.colour === invisible) {
            newColour = visible;
        }

        this.setState({
            colour: newColour
        })
    }

    setVisibility = () => {
        return {
            // fillOpacity: 0.5,
            color: this.state.colour
        }
    }

    render() {
        console.log(this.state.colour);
        console.log(this.props.geoData);
        return (

            <FeatureGroup eventHandlers={{
                click: () => {
                    this.toggleVisibility()
                }
            }}>
                {
                    <GeoJSON key={this.props.geoData["properties"]["id"]}
                             data={this.props.geoData}
                             style={this.setVisibility}
                    >
                        <Popup>{this.props.geoData["properties"]["id"]}</Popup>
                    </GeoJSON>
                }
            </FeatureGroup>
        );
    }
}

export default GeojsonLayer;