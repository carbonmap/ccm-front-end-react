import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SideMenu from './SideMenu';
import { RootState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import MobileDrawer from './SideMenu/MenuComponents/EntityDetails/MobileDrawer/MobileDrawer';
import { useHistory, useLocation } from 'react-router';

interface PageProps {
    emissionsData: any[],
    featuredEntities: any[]
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

    const openMenu = () => {
        setIsSearching(false);
        setIsOpen(true);
    };
    const closeMenu = () => {
        setIsOpen(false); 
        history.replace("/")
    };

    useEffect(() => {
        if(location.pathname !== "/" && props.emissionsData) {
            openMenu();
        };
    }, [props.emissionsData])

    return (
        <div className="ion-align-self-end menu-container" style={{ backgroundColor: isOpen && !isMobile ? '#fff' : 'transparent' }}>
            <SearchBar 
                featuredEntities={props.featuredEntities}
                inputVal={inputVal} 
                setInputVal={setInputVal} 
                setIsSearching={setIsSearching} 
                isSearching={isSearching} 
                emissionsData={props.emissionsData}
                selectedLocation={selectedLocation}
                openMenu={openMenu}
                setIsOpen={setIsOpen}
            />
            {isMobile ?
                <>
                    {isOpen && props.emissionsData ?
                        <MobileDrawer 
                            emissionsData={props.emissionsData}
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
                    {isOpen && props.emissionsData ?
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