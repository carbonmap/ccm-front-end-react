import React, { useEffect, useState } from 'react';
import SearchPane from './SearchPane';
import MainMap from "./MainMap/MainMap";
import Spinner from '../UI/spinner/spinner';
import { fetchIndividualEntity } from '../../service/fetchURL/individualEntity/fetchIndividualEntity';
import { fetchFeatured } from '../../service/fetchURL/featuredEntities/fetchFeatured';
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

    const [cookies, setCookie, removeCookie] = useCookies(['history']);

    const location = useLocation();
    const history = useHistory();

    const getEntityByBusinessType = async(businessType:string) => {
      const response = await fetch('https://raw.githubusercontent.com/aldjonz/ccm-json/main/entities.json');
      const data = await response.json();

      const entityData:any = await Promise.all(data.entities.map(async(entity:{name:string, id:string}) => {
        const entityPropertyResponse = await fetch(`https://raw.githubusercontent.com/aldjonz/ccm-json/main/entity_property/${entity.id}.json`)
        const entityPropertData = await entityPropertyResponse.json();

        if(entityPropertData.business_type === businessType) {
          return entityPropertData;
        }
      }));

      const entityGeoData:any = await Promise.all(entityData.map(async(entity:{id:string}) => {
        const geoData = await fetchIndividualEntity(`geojson/${entity.id}.geojson`);
        return geoData;
      }));

      const filteredGeoData = entityGeoData.filter((geoData:any) => geoData);

      setGeoData(filteredGeoData);
      setIsLoading(false);
    };
    

    const handleFeaturedLocations = async() => {
      const featured = await fetchFeatured();

      const featuredEmissionsData:any = await Promise.all(featured.map((entityID) => {
        return (
          fetchIndividualEntity(`reporting_entities/${entityID}.json`)
        )
      }));

      const featuredGeoData:any = await Promise.all(featured.map((entityID) => {
        return (
          fetchIndividualEntity(`geojson/${entityID}.geojson`)
        )
      }));

      setFeaturedEntities(featuredEmissionsData);
      setGeoData(featuredGeoData);

      setIsLoading(false);
    };

    const handleIndividualEntity = async() => {
      const entityID = location.pathname.substring(1,location.pathname.length);
      const fetchedGeoData:any[] = await fetchIndividualEntity(`geojson/${entityID}.geojson`);

      if(!fetchedGeoData) {
        setDisplayAlert(true);
        history.replace("/");
        handleFeaturedLocations();
      } else {
        const fetchedEmissionsData:any[] = await fetchIndividualEntity(`reporting_entities/${entityID}.json`);

        if(!fetchedEmissionsData) {
          setDisplayAlert(true);
          history.replace("/");
          handleFeaturedLocations();
        } else {
          const featured = await fetchFeatured();
          
          const featuredEmissionsData:any  = await Promise.all(featured.map((entityID) => {
            return (
              fetchIndividualEntity(`reporting_entities/${entityID}.json`)
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
        if(location.pathname === "/") {
          handleFeaturedLocations();
        } else {
          handleIndividualEntity();
        };
      } else {
        const businessType = location.pathname.substring(15, location.pathname.length);
        getEntityByBusinessType(businessType);
      }
    }, [location]);

    useEffect(() => {
      if(emissionsData.length > 0) {
        const navHistory = cookies.history;
        if(navHistory == undefined) {
          setCookie('history', [{ name: emissionsData[0].name, path: location.pathname }])
        } else {
          const matchEntity = navHistory.find((entity:any) => entity.name === emissionsData[0].name);
          if(matchEntity !== undefined) {
            const index = navHistory.indexOf(matchEntity);
            navHistory.splice(index, 1);
          }
            if(navHistory.length === 5) {
              const shiftedHistory:any = navHistory.slice(1);
              const newHistory = [...shiftedHistory, { name: emissionsData[0].name, path: location.pathname }];
              setCookie('history', newHistory);
            } else  {
              const newHistory = [...navHistory, { name: emissionsData[0].name, path: location.pathname }];
              setCookie('history', newHistory);
            };  
        };
      };
    }, [emissionsData])
  
    return (
      <>
        {isLoading ?
            <div className="spinner-container">
              <Spinner />
            </div>
          :
            <>
              <MainMap
                geoData={geoData}
              />
              <SearchPane 
                emissionsData={emissionsData}
                featuredEntities={featuredEntities}
                navHistory={cookies.history}
              />
              {displayAlert ? 
                <AlertMessage>Location not found.</AlertMessage>
              :
                null
              }
            </>
        }
      </>
    );
};

export default Map;