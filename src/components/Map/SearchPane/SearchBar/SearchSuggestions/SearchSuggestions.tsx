import { IonItem } from '@ionic/react';
import React from "react";
import { useNavigateBottomDrawer } from "../../Drawer/drawerUtils";

interface PageProps {
    emissionsData: {id: string, name: string, emissions: string[]}[];
    featuredEntities: {id: string, name: string, emissions: string[]}[];
    isSearching: boolean;
    navHistory: object[];
    suggestions: object[];
    setInputVal: (inputVal: string) => void;
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

    const { navigateDrawer } = useNavigateBottomDrawer();

    const handleClick = (id: string) => {
      console.log("HERE");
      props.setInputVal("");
      navigateDrawer(`/${id}`);
    };

    return (
        <div className="suggestion-container" style={ props.isSearching ? searchStyles : hiddenStyles }>
            {props.suggestions ?
                props.suggestions.map((entity: any, index) => {
                    if(index < 5) {
                        return (
                          <div
                            key={index}
                            onClick={() => handleClick(entity.id)}
                          >
                            <IonItem className="search-suggestion-el">
                              {entity.name}
                            </IonItem>
                          </div>
                        );
                    };
                })
            :
                props.featuredEntities.map((entity: any, index) => {
                    return (
                      <div key={index} onClick={() => handleClick(entity.id)}>
                        <IonItem className="search-suggestion-el">
                          {entity.name}
                        </IonItem>
                      </div>
                    );
                })
            }
        </div>
    )
}

export default SearchSuggestions;