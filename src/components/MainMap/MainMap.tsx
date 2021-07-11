// import React, {Component, useEffect} from 'react';
// import { MapContainer, TileLayer, Marker, Popup, MapConsumer } from 'react-leaflet';
// import markerIconPng from "leaflet/dist/images/marker-icon.png";
// import L, {geoJSON, Icon } from 'leaflet';
// import GeojsonLayer from "./GeojsonLayer";
// import fetchGeoData from "../../service/fetchURL/fetchGeoData";
//
//
// const styleInvisible = {
//     color: "#00eab8",
//     fillOpacity: 0,
//     weight: 2
// }
// const styleVisible = {
//     color: '#008468',
//     fillOpacity: 0.1,
//     weight: 2,
// }
//
// interface LayerDetails {
//     active: boolean,
//     geoData: object,
//     id: string
// }
//
// interface State {
//     geoData: Array<LayerDetails>
// }
//
// interface GeoDataFetched {
//     type: string,
//     features: Array<any>
// }
//
//
// class MainMap extends Component <{}, State> {
//     state = {
//         geoData: []
//     }
//
//
//
//     addGeoJsonLayers = (defaultGeoData: any) => {
//
//         let tempGeoData: Array<LayerDetails> = this.state.geoData;
//         defaultGeoData.map((geoDataContent: GeoDataFetched, item: number) => {
//             const geoData_ = geoDataContent["features"][0];
//             const geoDataId = geoData_["properties"]["id"];
//             const _domElementId = `geo_json_layer_${geoDataId}`;
//             tempGeoData[geoDataId] = {"layerObject": undefined, "geoDataInfo": {}};
//             tempGeoData[geoDataId]["layerObject"] = <GeojsonLayer
//                 key={_domElementId}
//                 geoData={geoData_}
//                 style= {styleInvisible}
//                 processGeoJsonLayersVisibility={this.processGeoJsonLayersVisibility}
//                 visible={false}/>
//             tempGeoData[geoDataId]["geoDataInfo"] = geoData_;
//         })
//         this.setState({geoData: tempGeoData})
//         console.log("Geo Data in the state");
//         console.log(this.state.geoData);
//     }
//
//     async componentDidMount() {
//         // console.log('did mount');
//         const defaultGeoData: any = await fetchGeoData();
//         // console.log(defaultGeoData);
//         this.addGeoJsonLayers(defaultGeoData);
//     }
//
//     // processGeoJsonLayersVisibility = (_id: string, currentLayerVisible: boolean) => {
//     //     console.log(_id);
//     //     let existingGeoData: GeoDataLayerDetails = this.state.geoData;
//     //     let newGeoData: GeoDataLayerDetails = {};
//     //
//     //
//     //     Object.keys(existingGeoData).forEach((key: string)=>{
//     //         console.log(`rendering ${key}`);
//     //         if (key !== _id || currentLayerVisible) {
//     //             const geoData_ = existingGeoData[key]["geoDataInfo"];
//     //             const geoDataId = geoData_["properties"]["id"];
//     //             const _domElementId = `geo_json_layer_${geoDataId}`;
//     //             newGeoData[geoDataId] = {"layerObject": undefined, "geoDataInfo": {}};
//     //             newGeoData[geoDataId]["layerObject"] = <GeojsonLayer
//     //                 key={_domElementId}
//     //                 geoData={geoData_}
//     //                 style= {styleInvisible}
//     //                 processGeoJsonLayersVisibility={this.processGeoJsonLayersVisibility}
//     //                 visible={false}/>
//     //             newGeoData[geoDataId]["geoDataInfo"] = geoData_;
//     //         } else {
//     //             const geoData_ = existingGeoData[key]["geoDataInfo"];
//     //             const geoDataId = geoData_["properties"]["id"];
//     //             const _domElementId = `geo_json_layer_${geoDataId}`;
//     //             newGeoData[geoDataId] = {"layerObject": undefined, "geoDataInfo": {}};
//     //             newGeoData[geoDataId]["layerObject"] = <GeojsonLayer
//     //                 key={_domElementId}
//     //                 geoData={geoData_}
//     //                 style= {styleVisible}
//     //                 processGeoJsonLayersVisibility={this.processGeoJsonLayersVisibility}
//     //                 visible={true}/>
//     //             newGeoData[geoDataId]["geoDataInfo"] = geoData_;
//     //         }
//     //     })
//     //     this.setState({geoData: newGeoData})
//     //     console.log("Geo Data in the state");
//     //     console.log(this.state.geoData);
//     //
//     // }
//
//     render() {
//         // console.log("Rendering map");
//         let GeoJsonLayers = null;
//         if (Object.keys(this.state.geoData).length > 0) {
//             console.log(this.state.geoData);
//
//             GeoJsonLayers = Object.values(this.state.geoData).map((item: any) => {
//                 return item["layerObject"];
//             })
//         }
//
//         return (
//             <div>
//                 <MapContainer
//                     center={[52.20, 0.12]}
//                     zoom={13}
//                     maxZoom={18}
//                     minZoom={5}
//                     style={{height: '1000px', width: '100%'}}
//                 >
//                     {GeoJsonLayers}
//                     <MapConsumer>
//                         {(map) => {
//                             // console.log("basemap center:", map.getCenter());
//                             map.on("click", (e) => {
//                                 this.addMarker(e);
//                             });
//                             return null;
//                         }}
//
//                     </MapConsumer>
//                     <TileLayer
//                         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                         url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//                     />
//
//                     {/*{this.state.markers.map((position: any, idx: any) =>*/}
//                     {/*    <Marker key={`marker-${idx}`}*/}
//                     {/*            position={position}*/}
//                     {/*            icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}*/}
//                     {/*    >*/}
//                     {/*        <Popup>*/}
//                     {/*            <span>Hi! I am an entity</span>*/}
//                     {/*        </Popup>*/}
//                     {/*    </Marker>*/}
//                     {/*)}*/}
//
//                 </MapContainer>
//             </div>
//         );
//     }
// }
//
// export default MainMap;
//

export {}