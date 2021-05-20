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
}

const SearchBar: React.FC<PageProps> = (props) => {
    const handleSearchSelect = () => {
        props.setIsOpen(true)
        props.setIsSearching(true)
    };

    const searchStyles = {
        opacity: 1,
        transform: 'translateX(0)'
    };
    const hiddenStyles = {
        opacity: 0,
        transform: 'translateX(-100%)'
    };

    return (
        <div className="search-bar-container">
            <IonSearchbar 
                className="search-bar" 
                onFocus={() => handleSearchSelect()}  
                value={props.inputVal} 
                showCancelButton="focus"
                onIonCancel={() => props.setIsSearching(false)}
            />
            <SearchSuggestions 
                featuredEntities={props.featuredEntities}
                isSearching={props.isSearching}
            />
        </div>
    );
};

export default SearchBar;