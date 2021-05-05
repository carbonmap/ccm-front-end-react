import { IonButton, IonIcon, IonInput, IonItem, IonSearchbar } from '@ionic/react';
import React, { ChangeEvent, SetStateAction, useState } from 'react';
import './searchBar.css';

import { useDispatch, useSelector } from 'react-redux';
import { menuOpen } from '../../actions';
import { RootState } from '../../reducers';

interface PageProps {
    inputVal: string;
    setInputVal: (inputVal: string) => void;
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

    return (
        <IonItem slot="end" className="search-bar">
            {/* <IonInput onFocus={() => dispatch(menuOpen())} onBlur={() => dispatch(menuClosed())} placeholder="Search" /> */}
            <IonSearchbar onFocus={() => dispatch(menuOpen())}  onIonInput={(e:any) => updateValue(e)} value={props.inputVal} />
            {/* <IonIcon name="search-outline"></IonIcon> */}
            {/* <IonButton slot="end" onClick={() => dispatch(isOpen ? menuClosed() : menuOpen())}>Featured</IonButton> */}
        </IonItem>
    );
    }

    // onChange={(e: React.ChangeEvent<HTMLInputElement>,):void => updateValue(e.target.value)}

export default SearchBar;
