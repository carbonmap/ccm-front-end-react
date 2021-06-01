import React, { useState } from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import SearchBar from './SearchBar';
import SideMenu from './SideMenu';
import { RootState } from '../../redux/reducers';
import { useSelector } from 'react-redux';

interface PageProps {
    featuredEntities: string[]
}

const SearchPane: React.FC<PageProps> = (props) => {
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isMobile = useSelector( (state: RootState) => state.isMobile);
    const selectedLocation = useSelector((state: RootState) => state.selectedLocation);

    const mobileMenuTabStyle = (
        isOpen ? 'translateY(-54vh) translateX(50%)' : 'translateY(-18vh) translateX(50%)'
    );
    const desktopMenuTabStyle = (
        isOpen ? 'translateX(-24vw)' : 'translateX(0)'
    );

    return (
        <div className="ion-align-self-end menu-container" style={{ backgroundColor: isOpen ? '#fff' : 'transparent' }}>
            <SearchBar 
                inputVal={inputVal} 
                setInputVal={setInputVal} 
                setIsSearching={setIsSearching} 
                isSearching={isSearching} 
                setIsOpen={setIsOpen}
                featuredEntities={props.featuredEntities}
                selectedLocation={selectedLocation}
            />
            <SideMenu 
                featuredEntities={props.featuredEntities}
                isOpen={isOpen}
                selectedLocation={selectedLocation}
                isSearching={isSearching}
                setIsSearching={setIsSearching}
            />

        </div>
    );
};

export default SearchPane;