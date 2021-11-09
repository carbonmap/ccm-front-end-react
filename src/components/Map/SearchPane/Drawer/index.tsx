import React from 'react';
import DesktopDrawer from './DesktopDrawer';
import MobileDrawer from './MobileDrawer';

interface PageProps {
    emissionsData: {id: string, name: string, emissions: string[]}[];
    isOpen: boolean;
    selectedLocation: any;
    isSearching: boolean;
    closeMenu: Function;
    entitiesByBusinessType: object[];
    isMobile: boolean;
}

const Drawer:React.FC<PageProps> = (props) => {

    return (
        <>
            {props.isMobile ?
                <>
                    {props.isOpen && props.emissionsData.length > 0 || props.isOpen && props.entitiesByBusinessType.length > 0 ?
                        <MobileDrawer 
                            entitiesByBusinessType={props.entitiesByBusinessType}
                            emissionsData={props.emissionsData}
                            isOpen={props.isOpen}
                            closeMenu={props.closeMenu}
                            isSearching={props.isSearching}
                            isMobile={props.isMobile}
                            selectedLocation={props.selectedLocation}
                        />
                    :
                        null
                    }
                </>
            :
                <>
                    {props.isOpen && props.emissionsData.length > 0 || props.isOpen && props.entitiesByBusinessType.length > 0 ?
                        <DesktopDrawer 
                            entitiesByBusinessType={props.entitiesByBusinessType}
                            emissionsData={props.emissionsData}
                            isOpen={props.isOpen}
                            selectedLocation={props.selectedLocation}
                            isSearching={props.isSearching}
                            closeMenu={props.closeMenu}
                            isMobile={props.isMobile}
                        />
                    :
                        null
                    }
                </>
            }
        </>
    );
};

export default Drawer;