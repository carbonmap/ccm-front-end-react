import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SideMenu from './Drawer/DesktopDrawer';
import { RootState } from '../../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import MobileDrawer from './Drawer/MobileDrawer';
import { useHistory, useLocation } from 'react-router';
import Drawer from './Drawer';

interface PageProps {
    emissionsData: any[],
    featuredEntities: any[]
    navHistory: object[]
    entitiesByBusinessType: object[]
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
        history.replace("/");
    };
    
    useEffect(() => {
        if(location.pathname !== "/" && props.emissionsData || props.entitiesByBusinessType.length > 0) {
            openMenu();
        };
    }, [props.entitiesByBusinessType, props.emissionsData]);

    return (
        <div className="ion-align-self-end menu-container" style={{ backgroundColor: isOpen && !isMobile ? '#fff' : 'transparent' }}>
            <SearchBar 
                entitiesByBusinessType={props.entitiesByBusinessType}
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
            <Drawer 
                 entitiesByBusinessType={props.entitiesByBusinessType}
                 emissionsData={props.emissionsData}
                 isOpen={isOpen}
                 closeMenu={closeMenu}
                 isSearching={isSearching}
                 selectedLocation={selectedLocation}
                 isMobile={isMobile}
            />
            {/* {props.entitiesByBusinessType.length > 0 ?
                null
            : */}
                {/* {isMobile ?
                    <>
                        {isOpen && props.emissionsData.length > 0 || isOpen && props.entitiesByBusinessType.length > 0 ?
                            <MobileDrawer 
                                entitiesByBusinessType={props.entitiesByBusinessType}
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
                        {isOpen && props.emissionsData.length > 0 || isOpen && props.entitiesByBusinessType.length > 0 ?
                            <SideMenu 
                                entitiesByBusinessType={props.entitiesByBusinessType}
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
            } */}
        </div>
    );
};

export default SearchPane;