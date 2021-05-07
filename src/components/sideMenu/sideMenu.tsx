import React from 'react';
import './sideMenu.css';
import { IonContent, IonText, IonTitle, IonIcon } from '@ionic/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import Featured from './menuComponents/featured/Featured';

const SideMenu: React.FC = (props) => {
    const isOpen = useSelector( (state: RootState) => state.menuOpen);
    const isMobile = useSelector( (state: RootState) => state.isMobile);

    const mobileMenuStyle = (
        isOpen ? 'translateY(6vh)' : 'translateY(42vh)'
    )
    const desktopMenuStyle = (
        isOpen ? 'translateX(0%)' : 'translateX(100%)'
    )

    return (
        <IonContent className="ion-align-self-end side-menu" slot="end" style={{ transform: !isMobile ? desktopMenuStyle : mobileMenuStyle }}>
            <Featured />
        </IonContent>
    )
}

export default SideMenu;