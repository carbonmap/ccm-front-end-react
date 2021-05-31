import React from 'react';
import './sideMenu.css';
import { IonCard, IonChip, IonContent, IonIcon, IonLabel, IonToolbar } from '@ionic/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import Featured from './MenuComponents/Featured/Featured';
import { chevronDown } from 'ionicons/icons'
import FeaturedLocationEl from './MenuComponents/Featured/FeaturedElement/FeaturedLocationEl';

interface PageProps {
    featuredEntities: any[],
    isOpen: boolean;
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
        <div className="ion-align-self-end side-menu ion-padding-top"
             slot="end" style={{ transform: !isMobile ? desktopMenuStyle : mobileMenuStyle }}
             onClick={() => console.log(props.featuredEntities)}
        >
            <Featured 
                featuredEntities={props.featuredEntities}
                isOpen={props.isOpen}
            /> 
        </div>
    )
}

export default SideMenu;