import React, { useState, useEffect } from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import SearchBar from './SearchBar';
import SideMenu from './SideMenu';
import { RootState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import MobileDrawer from './SideMenu/MenuComponents/EntityDetails/MobileDrawer/MobileDrawer';
import { useHistory, useLocation } from 'react-router';

interface PageProps {
    // featuredEntities: {id: string, name: string, emissions: string[]}[]
    emissionsData: any[]
}

const SearchPane: React.FC<PageProps> = (props) => {
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    let history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const isMobile = useSelector( (state: RootState) => state.isMobile);
    const selectedLocation = useSelector((state: RootState) => state.selectedLocation);

    const mobileMenuTabStyle = (
        isOpen ? 'translateY(-54vh) translateX(50%)' : 'translateY(-18vh) translateX(50%)'
    );
    const desktopMenuTabStyle = (
        isOpen ? 'translateX(-24vw)' : 'translateX(0)'
    );

    const openMenu = () => {
        setIsSearching(false);
        setIsOpen(true);
    };
    const closeMenu = () => {
        setIsOpen(false); 
        history.replace("/")
    };

    useEffect(() => {
        if(location.pathname !== "/") {
            const matchedEntity = props.emissionsData.find((entity) => entity.id === location.pathname.substring(1,location.pathname.length))
            if(matchedEntity != undefined) {
                openMenu();
                dispatch({ type: 'SET_LOCATION', payload: matchedEntity });
            };
        };
    }, [location.pathname])

    return (
        <div className="ion-align-self-end menu-container" style={{ backgroundColor: isOpen && !isMobile ? '#fff' : 'transparent' }}>
            <SearchBar 
                inputVal={inputVal} 
                setInputVal={setInputVal} 
                setIsSearching={setIsSearching} 
                isSearching={isSearching} 
                emissionsData={props.emissionsData}
                selectedLocation={selectedLocation}
                openMenu={openMenu}
            />
            {isMobile ?
                <>
                    {selectedLocation ?
                        <MobileDrawer 
                            isOpen={isOpen}
                            closeMenu={closeMenu}
                            isSearching={isSearching}
                            isMobile={isMobile}
                            selectedLocation={selectedLocation}
                        />
                    :
                        null
                    }
                </>
            :
                <>
                    {selectedLocation ?
                        <SideMenu 
                            emissionsData={props.emissionsData}
                            isOpen={isOpen}
                            selectedLocation={selectedLocation}
                            isSearching={isSearching}
                            closeMenu={closeMenu}
                        />
                    :
                        null
                    }
                </>
            }
        </div>
    );
};

export default SearchPane;