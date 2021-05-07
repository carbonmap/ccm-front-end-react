import { IonButton, IonIcon, IonInput, IonItem, IonSearchbar } from '@ionic/react';
import React, { ChangeEvent, SetStateAction, useState } from 'react';
import './searchBar.css';

import { useDispatch, useSelector } from 'react-redux';
import { menuOpen } from '../../actions';
import { RootState } from '../../reducers';
import { Action } from 'redux';
import { config } from 'node:process';

interface PageProps {
    inputVal: string;
    setInputVal: (inputVal: string) => void;
    isSearching: boolean;
    setIsSearching: (isSearching: boolean) => void;
}

const SearchBar: React.FC<PageProps> = (props) => {
    // const [inputVal, setInputVal] = useState('');

    const isOpen = useSelector( (state: RootState) => state.menuOpen);
    const dispatch = useDispatch();

    const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newVal = event.target.value;
        props.setInputVal(newVal);
        console.log(newVal)
    };

    const handleSearchSelect = () => {
        dispatch(menuOpen());

        props.setIsSearching(true)
    }

    const searchStyles = {
        opacity: 1,
        transform: 'translateX(0)'
    };
    const hiddenStyles = {
        opacity: 0,
        transform: 'translateX(-100%)'
    }

    return (
        // <IonItem slot="end" className="search-bar">
        //     <div className="icon-container">
        //         <IonIcon name="reorder-three-outline" size="large"/>         
        //     </div>
        //     <IonIcon name="close" />
        //     <IonInput onFocus={() => handleSearchSelect()} placeholder="Search" />
        <div className="search-bar-container">
            <IonSearchbar 
                className="search-bar" 
                onFocus={() => handleSearchSelect()}  
                onIonInput={(e:any) => updateValue(e)} 
                value={props.inputVal} 
                showCancelButton="focus"
                onIonCancel={() => props.setIsSearching(false)}
                // cancelButtonIcon={'close'}
            />
            <div className="suggestion-container" style={ props.isSearching ? searchStyles : hiddenStyles }>
                <IonItem className="search-suggestion-el">The Leys School</IonItem>
                <IonItem className="search-suggestion-el">Caius College</IonItem>
                <IonItem className="search-suggestion-el">King's College</IonItem>
            </div>
        </div>
            //     {/* <IonIcon name="search-outline"/>
        //     <IonButton slot="end" onClick={() => dispatch(menuOpen())}>Featured</IonButton>
        // </IonItem> */}
    );
    }

    // onChange={(e: React.ChangeEvent<HTMLInputElement>,):void => updateValue(e.target.value)}

export default SearchBar;
