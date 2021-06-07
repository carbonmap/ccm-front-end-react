import React from 'react';
import './sideMenu.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import EntityDetails from './MenuComponents/EntityDetails/EntityDetails';

interface PageProps {
    featuredEntities: any[];
    isOpen: boolean;
    selectedLocation: any;
    isSearching: boolean;
    closeMenu: Function;
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
            {props.selectedLocation ?
                <EntityDetails 
                    isOpen={props.isOpen}
                    closeMenu={props.closeMenu}
                    isSearching={props.isSearching}
                    isMobile={isMobile}
                />
            :
                null
            }
        </div>
    )
}

export default SideMenu;