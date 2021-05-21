import { IonItem } from '@ionic/react';
import React from 'react';

interface PageProps {
    featuredEntities: string[];
    isSearching: boolean;
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
                props.featuredEntities.map((entity: any, index) => {
                    return (
                        <IonItem key={index} className="search-suggestion-el">{entity.name}</IonItem>
                    )
                })
            }
        </div>
    )
}

export default SearchSuggestions;