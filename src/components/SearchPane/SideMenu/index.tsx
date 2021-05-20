import React from 'react';
import './sideMenu.css';
import { IonContent } from '@ionic/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducers';
import Featured from './MenuComponents/Featured/Featured';

interface PageProps {
    featuredEntities: string[],
    isOpen: boolean
}

const SideMenu: React.FC<PageProps> = (props) => {    
    const isMobile = useSelector( (state: RootState) => state.isMobile);

    const mobileMenuStyle = (
        props.isOpen ? 'translateY(6vh)' : 'translateY(42vh)'
    );
    const desktopMenuStyle = (
        props.isOpen ? 'translateX(0%)' : 'translateX(100%)'
    );

    return (
        <IonContent className="ion-align-self-end side-menu" slot="end" style={{ transform: !isMobile ? desktopMenuStyle : mobileMenuStyle }} onClick={() => console.log(props.featuredEntities)} >
            <Featured 
                featuredEntities={props.featuredEntities}
            />
        </IonContent>
    )
}

export default SideMenu;