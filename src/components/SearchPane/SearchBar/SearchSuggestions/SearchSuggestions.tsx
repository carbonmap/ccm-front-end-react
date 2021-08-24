import { IonItem } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom'; 

interface PageProps {
    emissionsData: {id: string, name: string, emissions: string[]}[];
    featuredEntities: {id: string, name: string, emissions: string[]}[];
    isSearching: boolean;
    navHistory: object[];
}

const SearchSuggestions: React.FC<PageProps> = (props) => {

    const searchStyles = {
        opacity: 1,
        transform: 'translateX(0)'
    };
    const hiddenStyles = {
        opacity: 0,
        transform: 'translateX(-100%)'
    };

    return (
        <div className="suggestion-container" style={ props.isSearching ? searchStyles : hiddenStyles }>
            {
                props.navHistory.map((entity: any, index) => {
                    return (
                        <Link key={index} to={entity.path} >
                            <IonItem 
                                className="search-suggestion-el"
                            >{entity.name}</IonItem>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default SearchSuggestions;