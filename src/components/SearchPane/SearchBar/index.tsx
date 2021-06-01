import { IonSearchbar } from '@ionic/react';
import React from 'react';
import './searchBar.css';
import SearchSuggestions from './SearchSuggestions/SearchSuggestions';

interface PageProps {
    inputVal: string;
    setInputVal: (inputVal: string) => void;
    isSearching: boolean;
    setIsSearching: (isSearching: boolean) => void;
    setIsOpen: (isOpen: boolean) => void;
    featuredEntities: string[];
    selectedLocation: void;
}

const SearchBar: React.FC<PageProps> = (props) => {
    const handleSearchSelect = () => {
        props.setIsOpen(true);
        props.setIsSearching(true);
    };

    const handleMenuClose = () => {
        // props.setIsOpen(false);
        props.setIsSearching(false);
    };

    return (
        <div className="search-bar-container">
            <IonSearchbar 
                className="search-bar" 
                onFocus={() => handleSearchSelect()}  
                // onBlur={() => props.setIsSearching(false)}
                value={props.inputVal} 
                showCancelButton={props.isSearching ? "always" : "never"}
                onIonCancel={() => handleMenuClose()}
            />
            {props.isSearching ?
                <SearchSuggestions 
                    featuredEntities={props.featuredEntities}
                    isSearching={props.isSearching}
                />  
            : 
                null
            }
        </div>
    );
};

export default SearchBar;