import React, { useState, useEffect } from 'react';
import { 
    MapContainer, 
    TileLayer, 
    Popup, 
    Polygon, 
    Marker,
    useMap } from 'react-leaflet';
import { useHistory, useLocation,  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

interface State {
    geoData: JSX.Element[],
    visibleEntity: string
}

interface GeoDataObject {
    type: string,
    features: Array<any>
}

function AnimateMap({ geoData }:any) {
    const geometry = geoData[0].features[0].geometry;
    const coords = geometry.coordinates;

    const isMobile = useSelector( (state: RootState) => state.isMobile);
    const location = useLocation();
    const map = useMap();

    const fitMapView = () => {
        map.fitBounds(coords, { 
            paddingBottomRight: isMobile ? [0,0] : [220,0], 
            animate: true 
        });
    };

    useEffect(() => {
        setTimeout(() => {
            fitMapView();
        }, 100);
    }, [geoData]);
  
    return null;
};

const MainMap: React.FC<{geoData:any[]}> = (props) => {
    const [geoDataConfig, setGeoDataConfig] = useState([]);
    const [visibleEntity, setVisibleEntity] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const history = useHistory();

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
                } else if (newGeoData[i].features[0].geometry.type === "Polygon") {
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
        handleGeoDataCoords();
    }, [props.geoData]);

        return (
            <MapContainer
                center={[52.20, 0.12]}
                zoom={13}
                maxZoom={18}
                minZoom={5}
                style={{height: '1000px', width: '100%'}}
                tap={true}
                dragging={true}

            >
                {geoDataConfig.length > 0 ?
                    geoDataConfig
                    .map((entity:any, index) => {
                        const features = entity.features[0];
                        const geometry = features.geometry;
                        const id = features.properties.id;
                        if(geometry.type === "Point") {
                            return (
                                <Marker position={geometry.coordinates}>
                                    <Popup>{features.properties.id}</Popup>
                                </Marker>
                            );
                        } else {

                            return (
                                <Polygon 
                                    eventHandlers={{
                                        click: (event) => {
                                            setVisibleEntity(id);
                                            history.push(`/${id}`)
                                    }}}
                                    key={index}
                                    pathOptions={{
                                        color: visibleEntity === id ? '#008468' : '#00eab8',
                                        fillOpacity: 0.4,
                                    }}
                                    positions={geometry.coordinates}
                                >
                                    <Popup>
                                            {features.properties.id}
                                    </Popup>
                                </Polygon>
                            );
                        };
                    })
                :
                    null
                }

                {props.geoData.length === 1 ?
                    <AnimateMap geoData={props.geoData} />
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