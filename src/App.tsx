import React, { useEffect, useRef, useState } from 'react';
import { IonApp, IonHeader, IonText } from '@ionic/react';

import { useSelector, useDispatch } from 'react-redux';
import { endLoading, menuOpen } from './actions';

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

import Toolbar from './components/toolbar/toolbar';
import SideMenu from './components/sideMenu/SideMenu';
import Map from './components/map/map';
import SearchBar from './components/searchbar/searchBar';
import Spinner from './components/UI/spinner/spinner';
import { RootState } from './reducers';

import { handleWindowSizeChange } from './helper/checkScreenSize/checkScreenSize';

const App: React.FC = (props) => {
  const [data, setData] = useState(null);
  const [menuHeight, setMenuHeight] = useState<Number | null>(null);

  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const isLoading = useSelector( (state: RootState)  => state.isLoading);
  const isOpen = useSelector( (state: RootState) => state.menuOpen);
  const isMobile = useSelector( (state: RootState) => state.isMobile);
  const dispatch = useDispatch();

  let reqURL = 'https://github.com/carbonmap/ccm-front-end/blob/master/dummy_data/reporting_entities/index.json';

  // useEffect(() => {
  //   fetch(reqURL)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setData(json)
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(() => {
  //       dispatch(endLoading())
  //     })
  // }, [])

  useEffect(() => {
    setTimeout(() => {
      dispatch(endLoading())

      handleWindowSizeChange(dispatch);

      // let height = menuContainerRef.current.offsetHeight;

      // setMenuHeight(height)

      window.addEventListener('resize', () => handleWindowSizeChange(dispatch));
      return () => {
          window.removeEventListener('resize', () => handleWindowSizeChange(dispatch));
      }
    }, 3000);

  },[])

  // Need to check menu height and change translateY depending on height
  return (
    <IonApp style={{ width: '100vw' }}>

      {isLoading ?
          <div className="spinner-container">
            <Spinner /> 
          </div>
         : 
         <IonApp style={{ width: '100%', height: '100%' }}>
           <IonHeader>
             <Toolbar />
           </IonHeader>
           <div ref={menuContainerRef} className="ion-align-self-end menu-container">
             <SearchBar />
              {
                isMobile ?
                  isOpen ?
                    null
                  :
                    <div className="menu-tag-mobile" onClick={() => dispatch(menuOpen())}>
                      <IonText>Tap to View Featured Locations</IonText>
                    </div>
                :
                  null
              }
             <SideMenu />
           </div>
         </IonApp>
      }
    </IonApp>

  );
}

export default App;