import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { RootState } from 'src/redux/reducers';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
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

    const location = useLocation();
    const isMobile = useSelector( (state: RootState) => state.isMobile);
    const selectedLocation = useSelector((state: RootState) => state.selectedLocation);

    const openMenu = () => {
        setIsSearching(false);
        setIsOpen(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setIsSearching(false);
    };
    
    useEffect(() => {
        if (
          (location.pathname !== "/" && props.emissionsData) ||
          props.entitiesByBusinessType.length > 0
        ) {
          openMenu();
        } else {
          closeMenu();
        }
    }, [props.entitiesByBusinessType, props.emissionsData, location]);

    return (
      <div
        className="ion-align-self-end menu-container"
        style={{
          backgroundColor: isOpen && !isMobile ? "#fff" : "transparent",
        }}
      >
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
          selectedLocation={selectedLocation}
          isMobile={isMobile}
          isSearching={isSearching}
        />
      </div>
    );
};

export default SearchPane;