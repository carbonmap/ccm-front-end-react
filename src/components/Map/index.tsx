import React, { useEffect, useState } from 'react';
import SearchPane from './SearchPane';
import MainMap from "./MainMap/MainMap";
import Spinner from '../UI/spinner/spinner';
import { fetchIndividualEntityData } from 'src/service/fetchURL/entityData/fetchIndividualEntityData';
import { fetchFeatured } from 'src/service/fetchURL/featuredEntities/fetchFeatured';
import AlertMessage from '../Message/AlertMessage';
import { useCookies } from 'react-cookie';
import { 
    RouteComponentProps,
    useLocation,
    useHistory,
  } from 'react-router-dom';

const Map: React.FC<RouteComponentProps<{id:string}>> = (props) => {
    const [featuredEntities, setFeaturedEntities] = useState<{id: string, name: string, emissions: string[]}[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [geoData, setGeoData] = useState<any[]>([]);
    const [emissionsData, setEmissionsData] = useState<any[]>([]);
    const [displayAlert, setDisplayAlert] = useState(false);
    const [entitiesByBusinessType, setEntitiesByBusinessType] = useState([]);

    const [cookies, setCookie, removeCookie] = useCookies(['history']);

    const location = useLocation();
    const history = useHistory();

    const getEntityByBusinessType = async(businessType:string) => {
      const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/entities.json`);
      const data = await response.json();

      const entityData:any = await Promise.all(data.entities.map(async(entity:{name:string, id:string}) => {
        const entityPropertyResponse = await fetch(`${process.env.REACT_APP_DATABASE_URL}/entity_property/${entity.id}.json`)
        const entityPropertData = await entityPropertyResponse.json();

        return entityPropertData;
      }));

      const filteredEntityData = entityData.filter((entity:any) => entity.business_type === businessType)

      const entityGeoData:any = await Promise.all(filteredEntityData.map(async(entity:{id:string}) => {
        const geoData = await fetchIndividualEntityData("geojson", entity.id, "geojson");
        return geoData;
      }));

      const filteredGeoData = entityGeoData.filter((geoData:any) => geoData);

      setEntitiesByBusinessType(filteredEntityData);
      setGeoData(filteredGeoData);
      setIsLoading(false);
    };
    

    const handleFeaturedLocations = async() => {
      const featured = await fetchFeatured();

      const featuredEmissionsData:any = await Promise.all(featured.map((entityID) => {
        return (
          fetchIndividualEntityData("entity_property", entityID, "json")
        )
      }));

      const featuredGeoData:any = await Promise.all(featured.map((entityID) => {
        return (
          fetchIndividualEntityData("geojson", entityID, "geojson")
        )
      }));

      setFeaturedEntities(featuredEmissionsData);
      setGeoData(featuredGeoData);

      setIsLoading(false);
    };

    const handleIndividualEntity = async() => {
      const entityID = location.pathname.substring(1,location.pathname.length);
      const fetchedGeoData:any[] = await fetchIndividualEntityData("geojson", entityID, "geojson");

      if(!fetchedGeoData) {
        setDisplayAlert(true);
        history.replace("/");
        handleFeaturedLocations();
      } else {
        const fetchedEmissionsData:any[] = await fetchIndividualEntityData("entity_property", entityID, "json");

        if(!fetchedEmissionsData) {
          setDisplayAlert(true);
          history.replace("/");
          handleFeaturedLocations();
        } else {
          const featured = await fetchFeatured();
          
          const featuredEmissionsData:any  = await Promise.all(featured.map((entityID) => {
            return (
              fetchIndividualEntityData("entity_property", entityID, "json")
              )
            }));
            
          setFeaturedEntities(featuredEmissionsData);
          setGeoData([fetchedGeoData]);
          setEmissionsData([fetchedEmissionsData]);
    
          setIsLoading(false);
        };
      };
    };

    useEffect(() => {
      if(location.pathname.substring(0, 14) !== "/business-type") {
        setEmissionsData([]);
        if(location.pathname === "/") {
          handleFeaturedLocations();
          setEntitiesByBusinessType([]);
        } else {
          handleIndividualEntity();
          setEntitiesByBusinessType([]);
        };
      } else {
        setEntitiesByBusinessType([]);
        setEmissionsData([]);
        const businessType = location.pathname.substring(15, location.pathname.length);
        getEntityByBusinessType(businessType);
      }
      
    }, [location]);

    useEffect(() => {
      if(emissionsData.length > 0) {
        document.title = emissionsData[0].name
        const navHistory = cookies.history;
        if(navHistory == undefined) {
          setCookie('history', [{ name: emissionsData[0].name, id: emissionsData[0].id }])
        } else {
          const matchEntity = navHistory.find((entity:any) => entity.name === emissionsData[0].name);
          if(matchEntity !== undefined) {
            const index = navHistory.indexOf(matchEntity);
            navHistory.splice(index, 1);
          }
            if(navHistory.length === 5) {
              const shiftedHistory:any = navHistory.slice(1);
              const newHistory = [...shiftedHistory, { name: emissionsData[0].name, id: emissionsData[0].id }];
              setCookie('history', newHistory);
            } else  {
              const newHistory = [...navHistory, { name: emissionsData[0].name, id: emissionsData[0].id }];
              setCookie('history', newHistory);
            };  
        };
      } else {
        document.title = "Cambridge Carbon Map"
      }
    }, [emissionsData])
  
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        {isLoading ?
            <div className="spinner-container">
              <Spinner />
            </div>
          :
            <>
              <SearchPane 
                entitiesByBusinessType={entitiesByBusinessType}
                emissionsData={emissionsData}
                featuredEntities={featuredEntities}
                navHistory={cookies.history}
              />
              <MainMap
                geoData={geoData}
              />
              {displayAlert ? 
                <AlertMessage>Location not found.</AlertMessage>
              :
                null
              }
            </>
        }
      </div>
    );
};

export default Map;