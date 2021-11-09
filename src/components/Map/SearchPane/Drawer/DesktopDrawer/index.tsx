import React from 'react';
// import { IonIcon } from '@ionic/react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../../../redux/reducers';
// import EntityDetails from '../DrawerContent/EntityDetails/EntityDetails';
import DrawerContent from '../DrawerContent';

interface PageProps {
    emissionsData: {id: string, name: string, emissions: string[]}[];
    isOpen: boolean;
    selectedLocation: any;
    isSearching: boolean;
    closeMenu: Function;
    entitiesByBusinessType: object[];
    isMobile: boolean;
}

const SideMenu: React.FC<PageProps> = (props) => {    
    // const isMobile = useSelector( (state: RootState) => state.isMobile);

    // const mobileMenuStyle = (
    //     props.isOpen ? 'translateY(6vh)' : 'translateY(42vh)'
    // );
    // const desktopMenuStyle = (
    //     props.isOpen ? 'translateX(0%)' : 'translateX(100%)'
    // );

    return (
        <div 
            className="ion-align-self-end side-menu ion-padding-top"
            slot="end" 
            // style={{ transform: !props.isMobile ? desktopMenuStyle : mobileMenuStyle }}
        >
            <DrawerContent 
                entitiesByBusinessType={props.entitiesByBusinessType}
                emissionsData={props.emissionsData}
                isOpen={props.isOpen}
                isMobile={props.isMobile}
                // closeMenu={props.closeMenu}
                // isSearching={props.isSearching}
                // isMobile={isMobile}
            />
            {/* <EntityDetails
                entitiesByBusinessType={props.entitiesByBusinessType}
                isOpen={props.isOpen}
                closeMenu={props.closeMenu}
                isSearching={props.isSearching}
                isMobile={isMobile}
                emissionsData={props.emissionsData}
            /> */}
        </div>
    )
}

export default SideMenu;