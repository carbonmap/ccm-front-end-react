import React, { useEffect, useState } from 'react';
import SearchPane from './SearchPane';
import MainMap from "./MainMap/MainMap";
import Spinner from '../UI/spinner/spinner';
import { fetchIndividualEntity } from 'src/service/fetchURL/individualEntity/fetchIndividualEntity';
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

    const [cookies, setCookie, removeCookie] = useCookies(['history']);

    const location = useLocation();
    const history = useHistory();

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
      if(location.pathname === "/") {
        handleFeaturedLocations();
      } else {
        handleIndividualEntity();
      };
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