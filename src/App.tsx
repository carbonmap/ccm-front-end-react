import React, { useEffect } from 'react';
import { IonApp, IonButton, IonCol, IonContent, IonHeader } from '@ionic/react';

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

import Toolbar from './components/toolbar/toolbar';
import SideMenu from './components/sideMenu/sideMenu';
import Map from './components/map/map';
import SearchBar from './components/searchbar/searchBar';

const App: React.FC = (props) => {
  return (
      <IonApp>
        <IonHeader>
          <Toolbar />
        </IonHeader>
        <SearchBar />
        <IonContent>
          <SideMenu />
          <Map />
        </IonContent>
      </IonApp>
  );
}

export default App;