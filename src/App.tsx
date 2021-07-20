import React, { useEffect, useState } from 'react';
import { IonApp, IonHeader } from '@ionic/react';
import { useDispatch } from 'react-redux';
import Toolbar from './components/toolbar';
import { handleWindowSizeChange } from './service/general/checkScreenSize/checkScreenSize';
import SearchPane from './components/SearchPane';
// import MainMap from "./components/MainMap/MainMap";
import MapFunc from "./components/MainMap/MapFunc";

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

const App: React.FC = () => {
  const [featuredEntities, setFeaturedEntities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const dispatch = useDispatch();

  useEffect(() => {
    fetchFeatured(setFeaturedEntities, setIsLoading);



    handleWindowSizeChange(dispatch);
    
    window.addEventListener('resize', () => handleWindowSizeChange(dispatch));
    return () => {
        window.removeEventListener('resize', () => handleWindowSizeChange(dispatch));
    }
  },[]);

  return (
    <IonApp>
      {
        isLoading ? 
          <div className="spinner-container">
            <Spinner />
          </div>
        : 
          <>
            <IonHeader>
              <Toolbar />
            </IonHeader>
            <MapFunc  />
            <SearchPane 
              featuredEntities={featuredEntities}
            />
          </>
      } 
    </IonApp>
  );
};

export default App;