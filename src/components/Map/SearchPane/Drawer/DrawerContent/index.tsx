import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducers';
import { useLocation } from 'react-router';
import BusinessTypeEntities from './BusinessTypeEntities/BusinessTypeEntities';
import EntityDetails from './EntityDetails/EntityDetails';
import './DrawerContent.css';

interface PageProps {
    isOpen: boolean;
    // closeMenu: Function;
    // isSearching: boolean;
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