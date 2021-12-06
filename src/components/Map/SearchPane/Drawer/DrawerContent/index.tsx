import React from 'react';
import BusinessTypeEntities from './BusinessTypeEntities/BusinessTypeEntities';
import EntityDetails from './EntityDetails/EntityDetails';

interface PageProps {
    isOpen: boolean;
    isMobile: boolean;
    emissionsData: {id: string, name: string, emissions: string[]}[];
    entitiesByBusinessType: object[];
}

const DrawerContent: React.FC<PageProps> = (props) => {
    return (
        <>
            {props.entitiesByBusinessType.length > 0 ?
                <BusinessTypeEntities 
                    entitiesByBusinessType={props.entitiesByBusinessType}
                />
            :
                <EntityDetails 
                    emissionsData={props.emissionsData}
                    entitiesByBusinessType={props.entitiesByBusinessType}
                    isOpen={props.isOpen}
                    isMobile={props.isMobile}
                />
            }
        </>
    );
};

export default DrawerContent;