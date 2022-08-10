import React, { useEffect } from 'react';
import { IonApp, IonHeader } from '@ionic/react';
import { useDispatch } from 'react-redux';
import Toolbar from 'src/components/toolbar';
import { handleWindowSizeChange } from 'src/service/general/checkScreenSize/checkScreenSize';
import Map from 'src/components/Map';

import { fetchFeatured } from 'src/service/fetchURL/featuredEntities/fetchFeatured';
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
import 'src/theme/variables.css';
import 'src/theme/app.css';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
} from 'react-router-dom';
import { setupIonicReact } from '@ionic/react';

setupIonicReact({
  mode: 'md'
});

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    handleWindowSizeChange(dispatch);
    
    window.addEventListener('resize', () => handleWindowSizeChange(dispatch));
    return () => {
        window.removeEventListener('resize', () => handleWindowSizeChange(dispatch));
    }
  },[]);

  return (
    <Router>
      <IonApp>
        <>
          <IonHeader>
            <Toolbar />
          </IonHeader>

          {/* <Switch>
            <Route path="/" exact component={Map} />
            <Route path="/:id" component={Map} />
            <Route path="/business-type" component={Map} />
          </Switch> */}
        </>
      </IonApp>
    </Router>
  );
};

export default App;