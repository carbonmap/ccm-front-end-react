import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, MapConsumer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';


interface State {
    markers: Array<Array<number>>
}

class map extends Component <{}, State> {
    state = {
        markers: [[52.20, 0.12]]
    }

    addMarker = (e: any)  => {
        const { markers } = this.state;
        markers.push(e.latlng);
        // console.log(e.latlng);
        this.setState({ markers });
    }

    render() {
        // let DefaultIcon = L.icon({
        //     iconUrl: icon,
        //     shadowUrl: iconShadow
        // });
        // L.Marker.prototype.options.icon = DefaultIcon;

        let myMarkers = null;

        if (this.state.markers) {
            myMarkers = this.state.markers.map((position, idx) => {
                console.log(1);
                console.log(position);
                console.log(2);
                // return <Marker key={`marker-${idx}`} position={position}></Marker>
            })
        }

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
                                // const { lat, lng } = e.latlng;
                                // L.marker([lat, lng], { icon }).addTo(map);
                                this.addMarker(e);
                            });
                            return null;
                        }}

                    </MapConsumer>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    {/*{this.state.markers.map((position, idx) =>*/}
                    {/*    <Marker key={`marker-${idx}`} position={position}>*/}
                    {/*        <Popup>*/}
                    {/*            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>*/}
                    {/*        </Popup>*/}
                    {/*    </Marker>*/}
                    {/*)}*/}
                    { myMarkers }

                </MapContainer>
            </div>
        );
    }
}

export default map;



/*const map: React.FC = () => (

    <MapContainer
        center={[52.20, 0.12]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '1000px', width: '100%' }}>
      <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[52.20, 0.12]}>
        <Popup>
          Hey, I am an entity!
        </Popup>
      </Marker>
    </MapContainer>

);*/

