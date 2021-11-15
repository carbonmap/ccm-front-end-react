import React from 'react';
import DrawerContent from '../DrawerContent';

interface PageProps {
    emissionsData: {id: string, name: string, emissions: string[]}[];
    isOpen: boolean;
    entitiesByBusinessType: object[];
    isMobile: boolean;
}

const SideMenu: React.FC<PageProps> = (props) => {    

    return (
        <div className="ion-align-self-end side-menu ion-padding-top" slot="end" >
            <DrawerContent 
                entitiesByBusinessType={props.entitiesByBusinessType}
                emissionsData={props.emissionsData}
                isOpen={props.isOpen}
                isMobile={props.isMobile}
            />
        </div>
    );
};

export default SideMenu;