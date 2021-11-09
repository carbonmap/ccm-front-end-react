import React from 'react';
import DesktopDrawer from './DesktopDrawer';
import MobileDrawer from './MobileDrawer';

interface PageProps {
    emissionsData: {id: string, name: string, emissions: string[]}[];
    isOpen: boolean;
    selectedLocation: any;
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