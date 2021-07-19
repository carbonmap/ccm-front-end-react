import React, { useState, useEffect} from 'react';
import { MapContainer, TileLayer, Popup, Polygon, FeatureGroup } from 'react-leaflet';
import { Link, useHistory, useLocation } from 'react-router-dom';
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

const MainMap: React.FC = () => {
    const [markers, setMarkers] = useState([[52.2, 0.12]]);
    const [geoData, setGeoData] = useState([]);
    const [visibleEntity, setVisibleEntity] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    let location = useLocation();
    let history = useHistory();

    const handleGeoDataCoords = async() => {
        const defaultGeoData: any = await fetchGeoData();

        let newGeoData = defaultGeoData;
        for(let i = 0; i < newGeoData.length; i++) {
            if(newGeoData[i].features[0].geometry.type === "MultiPolygon") {

                const multiPolygonArr = newGeoData[i].features[0].geometry.coordinates
                for(let i = 0; i < multiPolygonArr.length; i++) {
                    multiPolygonArr[i][0].map((polyCoords:string[]) => {
                        return polyCoords.reverse();
                    });
                }; 
            } else if (newGeoData[i].features[0].geometry.type === "Polygon") {
                newGeoData[i].features[0].geometry.coordinates[0].map((entity:string[]) => {
                   return entity.reverse();
                });
            }
        };

        setGeoData(newGeoData);
        setIsLoading(false);
    };

    useEffect(() => {
        if(location.pathname === "/") {
            setVisibleEntity("");
        } else {
            if(geoData.length > 0) {
                const matchedEntity:any = geoData.find((entity:any) => `/${entity.features[0].properties.id}` === location.pathname)
                if(matchedEntity != undefined) {
                    setVisibleEntity(matchedEntity.features[0].properties.id);
                };  
            };
        };
    },[location,geoData]);

    useEffect(() => {
        if(isLoading) {
            handleGeoDataCoords();
        }
    }, [])

        return (
            <MapContainer
                center={[52.20, 0.12]}
                zoom={13}
                maxZoom={18}
                minZoom={5}
                style={{height: '1000px', width: '100%'}}
            >
                {geoData.length > 0 ?
                    geoData.map((entity:any) => {
                        const features = entity.features[0];
                        const coords = features.geometry.coordinates;
                        const id = features.properties.id;
                        return (
                            <FeatureGroup
                                eventHandlers={{
                                    click: (event) => {
                                        setVisibleEntity(id);
                                        history.push(`/${id}`)
                                }}}
                            >
                                <Polygon 
                                    pathOptions={{
                                        color: visibleEntity === id ? '#008468' : '#00eab8',
                                        fillOpacity: 0.4,
                                    }}
                                    positions={coords}
                                >
                                    <Popup>
                                            {features.properties.id}
                                    </Popup>
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
        );
};

export default MainMap;