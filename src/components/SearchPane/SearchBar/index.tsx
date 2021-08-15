import { IonIcon, IonSearchbar } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import Featured from '../SideMenu/MenuComponents/Featured/Featured';
import './searchBar.css';
import SearchSuggestions from './SearchSuggestions/SearchSuggestions';

interface PageProps {
    inputVal: string;
    setInputVal: (inputVal: string) => void;
    isSearching: boolean;
    setIsSearching: (isSearching: boolean) => void;
    emissionsData: {id: string, name: string, emissions: string[]}[];
    featuredEntities: {id: string, name: string, emissions: string[]}[];
    selectedLocation: void;
    openMenu: Function;
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}

const SearchBar: React.FC<PageProps> = (props) => {
    const history = useHistory();

    const handleSearchSelect = () => {
        props.setIsSearching(true);
    };

    const handleMenuClose = () => {
        props.setIsSearching(false);
        props.setIsOpen(false);

        history.push("/")
    };

    return (
        <div className="search-overlay-container" style={{ backgroundColor: props.isSearching ? '#fff' : 'transparent' }}>
                <div className="search-bar-container">
                    <IonSearchbar 
                        className="search-bar" 
                        onFocus={() => handleSearchSelect()}  
                        value={props.inputVal} 
                        showCancelButton={props.isOpen || props.isSearching ? "always" : "never"}
                        onIonCancel={props.isSearching ? () => props.setIsSearching(false) : () => handleMenuClose()}
                    />
                </div>
            {props.isSearching ?
            <>
                <SearchSuggestions 
                    featuredEntities={props.featuredEntities}
                    emissionsData={props.emissionsData}
                    isSearching={props.isSearching}
                />  
                <Featured 
                    featuredEntities={props.featuredEntities}
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