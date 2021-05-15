import React, { useEffect, useRef, useState } from 'react';
import { IonApp, IonHeader, IonText, IonIcon, IonReorderGroup } from '@ionic/react';

import { useSelector, useDispatch } from 'react-redux';
import { endLoading, menuClosed, menuOpen } from './actions';

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

import Toolbar from './components/Toolbar';
import SideMenu from './components/SideMenu';
import Map from './components/Map';
import SearchBar from './components/Searchbar';
import Spinner from './components/UI/Spinner/Spinner';
import { RootState } from './reducers';

import { handleWindowSizeChange } from './service/general/checkScreenSize/checkScreenSize';
import { useFetch } from './service/hooks/useFetch';

const App: React.FC = (props) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const isLoading = useSelector( (state: RootState)  => state.isLoading);
  const isOpen = useSelector( (state: RootState) => state.menuOpen);
  const isMobile = useSelector( (state: RootState) => state.isMobile);
  const dispatch = useDispatch();

  const mobileMenuTabStyle = (
    isOpen ? 'translateY(-54vh) translateX(50%)' : 'translateY(-18vh) translateX(50%)'
  )
  const desktopMenuTabStyle = (
    isOpen ? 'translateX(-24vw)' : 'translateX(0)'
  )

  useEffect(() => {
    setTimeout(() => {
      dispatch(endLoading())
    }, 3000);

    handleWindowSizeChange(dispatch);

    window.addEventListener('resize', () => handleWindowSizeChange(dispatch));
    return () => {
        window.removeEventListener('resize', () => handleWindowSizeChange(dispatch));
    }

  },[])


  const data = useFetch({
    url: "https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/reporting_entities/index.json",
    init: {}
  }) 

  useEffect(() => {
    console.log(data);
  },[])

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
           <Map />

           <div ref={menuContainerRef} className="ion-align-self-end menu-container" style={{ backgroundColor: isSearching ? '#ccc' : 'transparent' }}>
             <SearchBar inputVal={inputVal} setInputVal={setInputVal} setIsSearching={setIsSearching} isSearching={isSearching} />
             {
                isSearching ? 
                  null
                :
                  <>
                    <div className="chevron-container" onClick={isOpen ? () => dispatch(menuClosed()) : () => dispatch(menuOpen())} style={{ transform: isMobile ? mobileMenuTabStyle : desktopMenuTabStyle }}>
                      <div className="menu-toggle-wrapper" style={{ transform: isMobile ? isOpen ? 'rotate(90deg)' : 'rotate(90deg) rotateY(180deg)' : isOpen ? 'rotateY(0)' : 'rotateY(180deg)' }}>
                        <IonIcon name="chevron-forward" className="toggle-menu-icon"></IonIcon>
                      </div>
                    </div>
                      <SideMenu />
                  </>
              }
           </div>
         </IonApp>
      }
    </IonApp>

  );
}

export default App;