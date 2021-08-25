import React, { useEffect, useState } from 'react';
import { IonApp, IonHeader } from '@ionic/react';
import { useDispatch } from 'react-redux';
import Toolbar from './components/toolbar';
import { handleWindowSizeChange } from './service/general/checkScreenSize/checkScreenSize';
import SearchPane from './components/SearchPane';
import MainMap from "./components/MainMap/MainMap";
import Spinner from './components/UI/spinner/spinner';

import { fetchFeatured } from './service/fetchURL/featuredEntities/fetchFeatured';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import './theme/app.css';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  RouteComponentProps,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { fetchIndividualEntity } from './service/fetchURL/individualEntity/fetchIndividualEntity';
import AlertMessage from './components/Message/AlertMessage';
import { useCookies } from 'react-cookie';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    handleWindowSizeChange(dispatch);
    
    window.addEventListener('resize', () => handleWindowSizeChange(dispatch));
    return () => {
        window.removeEventListener('resize', () => handleWindowSizeChange(dispatch));
    }
  },[]);

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
        const navHistory = cookies.history
        if(navHistory == undefined) {
          setCookie('history', [{ name: emissionsData[0].name, path: location.pathname }])
        } else {
          const matchEntity = navHistory.find((entity:any) => entity.name === emissionsData[0].name);
          if(matchEntity == undefined) {
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

  return (
    <Router>
      <IonApp>
        <>
          <IonHeader>
            <Toolbar />
          </IonHeader>

          <Switch>
            <Route path="/" exact component={Map} />
            <Route path="/:id" component={Map} />
          </Switch>
        </>
      </IonApp>
    </Router>
  );
};

export default App;