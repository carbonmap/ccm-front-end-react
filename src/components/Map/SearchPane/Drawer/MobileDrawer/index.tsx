import React from 'react';
import { IonModal } from '@ionic/react';
import DrawerContent from '../DrawerContent';

interface PageProps {
  isOpen: boolean;
  isMobile: boolean;
  selectedLocation: any;
  emissionsData: {id: string, name: string, emissions: string[]}[];
  entitiesByBusinessType: object[];
}

const MobileDrawer: React.FC<PageProps> = (props) => {

    return (
      <IonModal 
        isOpen={true}
        swipeToClose={true}
        breakpoints={[ 0.1, 0.5, 0.95 ]}
        initialBreakpoint={0.5}
      >
        <DrawerContent 
              entitiesByBusinessType={props.entitiesByBusinessType}
              emissionsData={props.emissionsData}
              isOpen={props.isOpen}
              isMobile={props.isMobile}
          />
      </IonModal>
    );
};

export default MobileDrawer;