import { IonButton, IonIcon, IonInput, IonItem } from '@ionic/react';
import React from 'react';
import './searchBar.css';

import { useDispatch, useSelector } from 'react-redux';
import { menuOpen, menuClosed } from '../../actions';
import { RootState } from '../../reducers';

const SearchBar: React.FC = () => {
    const isOpen = useSelector( (state: RootState) => state.menuOpen);
    const dispatch = useDispatch();

    return (
        <IonItem slot="end" className="search-bar">
            <IonInput onFocus={() => dispatch(menuOpen())} onBlur={() => dispatch(menuClosed())} placeholder="Search" />
            <IonIcon name="search-outline"></IonIcon>
            {/* <IonButton slot="end" onClick={() => dispatch(isOpen ? menuClosed() : menuOpen())}>Featured</IonButton> */}
        </IonItem>
    );
    }

export default SearchBar;