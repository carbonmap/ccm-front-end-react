import React, { useState, useEffect} from 'react';
import { MapContainer, TileLayer, Popup, Polygon, FeatureGroup } from 'react-leaflet';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { fetchFeaturedGeoData } from "../../service/fetchURL/fetchGeoData";
import { fetchIndividualEntity } from '../../service/fetchURL/individualEntity/fetchIndividualEntity';


interface State {
    markers: Array<Array<number>>,
    geoData: JSX.Element[],
    visibleEntity: string
}

interface GeoDataObject {
    type: string,
    features: Array<any>
}

const MainMap: React.FC<{geoData:JSX.Element[]}> = (props) => {
    const [geoDataConfig, setGeoDataConfig] = useState([]);
    const [visibleEntity, setVisibleEntity] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    let location = useLocation();
    let history = useHistory();

    const handleGeoDataCoords = async() => {
        try {
            let newGeoData:any = props.geoData;
            
            for(let i = 0; i < newGeoData.length; i++) {
                const geoJsonType = newGeoData[i].features[0].geometry.type
                if(geoJsonType === "MultiPolygon") {
    
                    const multiPolygonArr = newGeoData[i].features[0].geometry.coordinates
                    for(let i = 0; i < multiPolygonArr.length; i++) {
                        multiPolygonArr[i][0].map((polyCoords:string[]) => {
                            return polyCoords.reverse();
                        });
                    }; 
                } else if (geoJsonType === "Polygon" || newGeoData[i].features[0].geometry.type === "Point") {
                    newGeoData[i].features[0].geometry.coordinates[0].map((entity:string[]) => {
                       return entity.reverse();
                    });
                }
            };

            setGeoDataConfig(newGeoData);
            setIsLoading(false);
        } catch (error) {
            alert("Sorry, something went wrong");
            console.log(error);
        }
    };

    useEffect(() => {
        if(location.pathname === "/") {
            setVisibleEntity("");
        } else {
            if(geoDataConfig.length > 0) {
                const matchedEntity:any = geoDataConfig.find((entity:any) => `/${entity.features[0].properties.id}` === location.pathname)
                if(matchedEntity != undefined) {
                    setVisibleEntity(matchedEntity.features[0].properties.id);
                };  
            };
        };
    },[location,geoDataConfig]);

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
                {geoDataConfig.length > 0 ?
                    geoDataConfig.map((entity:any, index) => {
                        const features = entity.features[0];
                        const coords = features.geometry.coordinates;
                        const id = features.properties.id;
                        return (
                            <FeatureGroup
                                key={index}
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