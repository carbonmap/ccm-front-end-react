import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SideMenu from './SideMenu';
import { RootState } from 'src/redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import MobileDrawer from './SideMenu/MenuComponents/EntityDetails/MobileDrawer/MobileDrawer';
import { useHistory, useLocation } from 'react-router';

interface PageProps {
    emissionsData: any[],
    featuredEntities: any[]
    navHistory: object[]
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
        console.log(process.env)
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
                isOpen={isOpen}
                navHistory={props.navHistory}
            />
            {isMobile ?
                <>
                    {isOpen && props.emissionsData.length > 0 ?
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
                    {isOpen && props.emissionsData.length > 0 ?
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