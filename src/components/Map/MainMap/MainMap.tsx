import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Polygon,
  Marker,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "src/redux/store";
import AlertMessage from "src/components/Message/AlertMessage";
import { useNavigateBottomDrawer } from "../SearchPane/Drawer/drawerUtils";

function AnimateMap({ geoData }: any) {
  const geometry = geoData[0].features[0].geometry;
  const coords = geometry.coordinates;

  const isMobile = useSelector((state: RootState) => state.isMobile);
  const location = useLocation();
  const map = useMap();

  const fitMapBounds = useCallback(() => {
    map.fitBounds(coords, {
      paddingBottomRight: isMobile ? [0, 0] : [220, 0],
      animate: true,
    });
  }, [coords, isMobile, map]);
  const fitMapView = useCallback(
    (centerCoords: any) => {
      map.setView(centerCoords, 14, {
        animate: true,
      });
    },
    [map]
  );

  useEffect(() => {
    if (location.pathname.substring(0, 14) === "/business-type") {
      setTimeout(() => {
        fitMapView([52.2, 0.12]);
      }, 100);
    } else if (geometry.type === "Point") {
      setTimeout(() => {
        fitMapView(coords);
      }, 100);
    } else {
      setTimeout(() => {
        fitMapBounds();
      }, 100);
    }
  }, [location, geoData, coords, fitMapBounds, fitMapView, geometry.type]);

  return null;
}

const MainMap: React.FC<{ geoData: any[]; emissionsData: any[] }> = (props) => {
  const [geoDataConfig, setGeoDataConfig] = useState([]);
  const [visibleEntity, setVisibleEntity] = useState("");

  const popupRef = useRef<any>(null);

  const { navigateDrawer } = useNavigateBottomDrawer();
  const isMobile = useSelector((state: RootState) => state.isMobile);

  const location = useLocation();

  const handleGeoDataCoords = useCallback(async () => {
    try {
      let newGeoData: any = props.geoData;

      for (let i = 0; i < newGeoData.length; i++) {
        const geometry = newGeoData[i].features[0].geometry;
        if (geometry.type === "MultiPolygon") {
          const multiPolygonArr =
            newGeoData[i].features[0].geometry.coordinates;
          for (let i = 0; i < multiPolygonArr.length; i++) {
            multiPolygonArr[i][0].map((polyCoords: string[]) => {
              return polyCoords.reverse();
            });
          }
        } else if (geometry.type === "Polygon") {
          geometry.coordinates[0].map((entity: string[]) => {
            return entity.reverse();
          });
        } else if (geometry.type === "Point") {
          geometry.coordinates.reverse();
        }
      }

      setGeoDataConfig(newGeoData);
    } catch (error) {
      console.log(error);
      throw new Error("Location not found");
    }
  }, [props.geoData]);

  useEffect(() => {
    if (location.pathname === "/") {
      setVisibleEntity("");
    } else {
      if (geoDataConfig.length > 0) {
        const matchedEntity: any = geoDataConfig.find(
          (entity: any) =>
            `/${entity.features[0].properties.id}` === location.pathname
        );
        if (matchedEntity !== undefined) {
          setVisibleEntity(matchedEntity.features[0].properties.id);
        }
      }
    }

    if (!popupRef.current) return;
    if (location.pathname !== visibleEntity) {
      popupRef.current._close();
    }
  }, [location, geoDataConfig, visibleEntity]);

  useEffect(() => {
    handleGeoDataCoords();
  }, [props.geoData, handleGeoDataCoords]);

  const handleEntityClick = (id: string) => {
    if (visibleEntity !== id) {
      setVisibleEntity(id);
      navigateDrawer(`/${id}`);
    }
  };

  return (
    <MapContainer
      center={[52.2, 0.12]}
      zoom={13}
      maxZoom={18}
      minZoom={5}
      style={{ height: "100%", width: "100vw" }}
      tap={true}
      dragging={true}
      zoomControl={false}
    >
      {geoDataConfig.length > 0 ? (
        geoDataConfig.map((entity: any, index) => {
          const features = entity.features[0];
          const geometry = features.geometry;
          const id = features.properties.id;
          const name = props.emissionsData?.filter(
            (entity) => entity.id === id
          )[0]?.name;

          if (geometry.type === "Point") {
            return (
              <Marker
                eventHandlers={{
                  click: (event) => handleEntityClick(id),
                }}
                key={index}
                position={geometry.coordinates}
              >
                {name ? <Popup ref={popupRef}>{name}</Popup> : null}
              </Marker>
            );
          } else {
            return (
              <Polygon
                eventHandlers={{
                  click: (event) => handleEntityClick(id),
                }}
                key={index}
                pathOptions={{
                  color: "#0000ff",
                  fillOpacity: 0.4,
                }}
                positions={geometry.coordinates}
              >
                {name ? <Popup ref={popupRef}>{name}</Popup> : null}
              </Polygon>
            );
          }
        })
      ) : (
        <AlertMessage>{"Location not found"}</AlertMessage>
      )}

      {props.geoData.length === 1 ? (
        <AnimateMap geoData={props.geoData} />
      ) : null}
      <ZoomControl position={isMobile ? "bottomright" : "topleft"} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MainMap;
