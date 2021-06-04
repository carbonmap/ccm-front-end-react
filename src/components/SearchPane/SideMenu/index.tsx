import React from 'react';
import './sideMenu.css';
import { IonCard, IonChip, IonContent, IonIcon, IonLabel, IonToolbar } from '@ionic/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import Featured from './MenuComponents/Featured/Featured';
import EntityDetails from './MenuComponents/EntityDetails/EntityDetails';
import { chevronDown } from 'ionicons/icons'
import FeaturedLocationEl from './MenuComponents/Featured/FeaturedElement/FeaturedLocationEl';

interface PageProps {
    featuredEntities: any[];
    isOpen: boolean;
    selectedLocation: any;
    isSearching: boolean;
    setIsSearching: (isSearching: boolean) => void;
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
        <div className="ion-align-self-end side-menu ion-padding-top" slot="end" style={{ transform: !isMobile ? desktopMenuStyle : mobileMenuStyle }}>
            {props.selectedLocation && !props.isSearching ?
                <EntityDetails />
            :
                <Featured 
                    featuredEntities={props.featuredEntities}
                    isOpen={props.isOpen}
                    setIsSearching={props.setIsSearching}
                /> 
            }
        </div>
    )
}

export default SideMenu;