import { IonIcon, IonSearchbar } from '@ionic/react';
import React from 'react';
import Featured from '../SideMenu/MenuComponents/Featured/Featured';
import './searchBar.css';
import SearchSuggestions from './SearchSuggestions/SearchSuggestions';

interface PageProps {
    inputVal: string;
    setInputVal: (inputVal: string) => void;
    isSearching: boolean;
    setIsSearching: (isSearching: boolean) => void;
    emissionsData: {id: string, name: string, emissions: string[]}[];
    selectedLocation: void;
    openMenu: Function;
}

const SearchBar: React.FC<PageProps> = (props) => {
    const handleSearchSelect = () => {
        props.setIsSearching(true);
    };

    const handleMenuClose = () => {
        props.setIsSearching(false);
    };

    return (
        <div className="search-overlay-container" style={{ backgroundColor: props.isSearching ? '#fff' : 'transparent' }}>
                <div className="search-bar-container">
                    <IonSearchbar 
                        className="search-bar" 
                        onFocus={() => handleSearchSelect()}  
                        value={props.inputVal} 
                        showCancelButton={props.isSearching ? "always" : "never"}
                        onIonCancel={() => handleMenuClose()}
                    />
                </div>
            {props.isSearching ?
            <>
                <SearchSuggestions 
                    emissionsData={props.emissionsData}
                    isSearching={props.isSearching}
                />  
                <Featured 
                    emissionsData={props.emissionsData}
                    openMenu={props.openMenu}
                /> 
            </>
            : 
                null
            }
        </div>
    );
};

export default SearchBar;