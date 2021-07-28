import React, { useEffect, useState } from 'react';
import { IonApp, IonHeader } from '@ionic/react';
import { useDispatch } from 'react-redux';
import Toolbar from './components/toolbar';
import { handleWindowSizeChange } from './service/general/checkScreenSize/checkScreenSize';
import SearchPane from './components/SearchPane';
import MainMap from "./components/MainMap/MainMap";
import Spinner from './components/UI/spinner/spinner';
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
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
    Redirect,
} from 'react-router-dom';

const App: React.FC = () => {
  const [featuredEntities, setFeaturedEntities] = useState<{id: string, name: string, emissions: string[]}[]>([]);
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

  const Map: React.FC<RouteComponentProps<{id:string}>> = (props) => {
    const { id } = props.match.params;
    return (
      <>
        <MainMap/>
        <SearchPane 
          featuredEntities={featuredEntities}
          slug={id}
        />
      </>
    );
  };

  return (
    <Router>
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

              <Switch>
                <Route path="/" exact component={Map} />
                <Route path="/:id" component={Map} />
                  {/*<Route path="/404" exact*/}
                  {/*       component={NotFoundPage} />*/}
                  {/*<Redirect to="/404" />*/}
                  <Route component={NotFoundPage} />
              </Switch>
            </>
        } 
      </IonApp>
    </Router>
  );
};

export default App;