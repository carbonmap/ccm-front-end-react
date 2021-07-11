import React, { useState, useEffect } from "react";
import L, { LatLngTuple } from "leaflet";
import fetchGeoData from "../../service/fetchURL/fetchGeoData";


const useFetch = () => {
    const [data, setData] = useState(null);

    // const fetchData = async () => {
    //     const dataCollection = await fetchGeoData();
    //     setData(dataCollection);
    // };


    // empty array as second argument equivalent to componentDidMount
    useEffect(() => {
        fetchGeoData();

        const dataCollection = fetchGeoData();
            setData(data);


    }, []);

    return data;
};


const Map = () => {

    // Create our map tile layer:
    const MAP_TILE = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Define the styles that are to be passed to the map instance:
    const mapStyles = {
        overflow: "hidden",
        width: "100%",
        height: "1000px"
    };

    const __center: LatLngTuple = [52.20, 0.12];
    const mapParams = {
        center: __center,
        zoom: 13,
        // zoomControl: false,
        // maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
        layers: [MAP_TILE]
    };

    // This useEffect hook runs when the component is first mounted,
    // similar to componentDidMount() lifecycle method of class-based
    // components:
    useEffect(() => {
        useFetch();
        const map = L.map("map", mapParams);
    }, []);

    return (
        <div>
            <div id="map" style={mapStyles} />
        </div>
    )
}

export default Map