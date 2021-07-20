import React, { useState, useEffect, useRef } from "react";
import L, {LatLngTuple, TileLayer, Map} from "leaflet";
import fetchGeoData  from "../../service/fetchURL/fetchGeoData";

// interface cityDataProps {
//     cityData: Array<any>
// }

const MapFunc: React.FC = () => {

    const [data, setData] = useState<string[]>([]);



    // Create the map ref:
    const mapRef = useRef<any>();

    // Create the tile ref:
    const tileRef = useRef<any>();


    const layerRef = useRef<any>()

    
    // Create our map tile layer:
    tileRef.current = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

    // Define the styles
    const mapStyles = {
        overflow: "hidden",
        width: "100%",
        height: "1000px"
    };

    const __center: LatLngTuple = [52.20, 0.12];
    const mapParams = {
        center: __center,
        zoom: 13,
        zoomControl: false,
        // maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
        closePopupOnClick: false,
        layers: [tileRef.current]
    };


    // Map creation
    useEffect(() => {

        // fetchGeoData(setData);

        mapRef.current = L.map("map", mapParams);


    }, []);

    // Control
    useEffect(() => {

        mapRef.current.on("zoomstart", () => {
            console.log("ZOOM STARTED");
        });


        // Pass a baseLayers object to the layer control:
        L.control.layers({
            OpenStreetMap: tileRef.current

        }).addTo(mapRef.current); // Add the control to our map instance


        // Create the zoom control:
        L.control.zoom({
            position: "topright"
        }).addTo(mapRef.current);

    }, [])

    // Create the layerGroup for the circles layer:
    useEffect(() => {

        layerRef.current = L.layerGroup().addTo(mapRef.current);
    }, [])

    useEffect(() => {
        // First, clear any layers associated with the layerGroup:
        layerRef.current.clearLayers()

        // Iterate cityData from props:
        // Array.from(props.cityData).forEach(city => {
        //     // Create the Leaflet Circle and add to layerGroup:
        //     L.circle(city.latLng, { radius: 100000 }).addTo(
        //         layerRef.current
        //     );
        // });
        // Include cityData in our dependency to watch for changes to data:
    }, [])

    return (
        <div>
            <div id="map" style={mapStyles} />
        </div>
    )
}

export default MapFunc;