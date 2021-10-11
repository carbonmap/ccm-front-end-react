import { IonIcon, IonSearchbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Featured from '../SideMenu/MenuComponents/Featured/Featured';
import './searchBar.css';
import SearchSuggestions from './SearchSuggestions/SearchSuggestions';
import AutoSuggestEntities from './AutoSuggestEntities/AutoSuggestEntities';

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
    navHistory: object[]
}

const SearchBar: React.FC<PageProps> = (props) => {
    const [autoSuggestions, setAutoSuggestions] = useState([]);
    const [suggestions, setSuggestions] = useState<object[]>([]);

    const history = useHistory();

    const handleSearchSelect = () => {
        props.setIsSearching(true);
    };

    const handleMenuClose = () => {
        props.setIsSearching(false);
        props.setIsOpen(false);

        history.push("/")
    };

    useEffect(() => {
        if(props.inputVal !== "") {
            setSuggestions(autoSuggestions);
        } else {
            if(props.navHistory) {
                setSuggestions([...props.navHistory].reverse());
            } else {
                setSuggestions(props.featuredEntities);
            }
        }
    }, [props.inputVal, props.navHistory])

    return (
        <div className="search-overlay-container" style={{ backgroundColor: props.isSearching ? '#fff' : 'transparent' }}>
            <AutoSuggestEntities 
                handleSearchSelect={handleSearchSelect}
                inputVal={props.inputVal}
                setInputVal={props.setInputVal}
                isOpen={props.isOpen}
                isSearching={props.isSearching}
                setIsSearching={props.setIsSearching}
                handleMenuClose={() => handleMenuClose()}
                setAutoSuggestions={setAutoSuggestions}
            />
            {props.isSearching ?
            <>
                <SearchSuggestions 
                    featuredEntities={props.featuredEntities}
                    emissionsData={props.emissionsData}
                    isSearching={props.isSearching}
                    navHistory={props.navHistory}
                    suggestions={suggestions}
                    setInputVal={props.setInputVal}
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