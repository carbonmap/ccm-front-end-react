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
            setSuggestions([...props.navHistory].reverse());
            // setSuggestions(props.navHistory);
        }
    }, [props.inputVal, props.navHistory])

    return (
        <div className="search-overlay-container" style={{ backgroundColor: props.isSearching ? '#fff' : 'transparent' }}>
                <div className="search-bar-container">
                    {/* <IonSearchbar 
                        className="search-bar" 
                        onFocus={() => handleSearchSelect()}  
                        value={props.inputVal} 
                        showCancelButton={props.isOpen || props.isSearching ? "always" : "never"}
                        onIonCancel={props.isSearching ? () => props.setIsSearching(false) : () => handleMenuClose()}
                    /> */}
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
                </div>
            {props.isSearching ?
            <>
                <SearchSuggestions 
                    featuredEntities={props.featuredEntities}
                    emissionsData={props.emissionsData}
                    isSearching={props.isSearching}
                    // navHistory={[...props.navHistory].reverse()}
                    navHistory={props.navHistory}
                    suggestions={suggestions}
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