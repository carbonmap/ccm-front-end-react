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
        breakpoints={[ 0.05, 0.4, 0.95 ]}
        initialBreakpoint={0.4}
        backdropBreakpoint={0.4}
        className="bottom-sheet"
        showBackdrop={true}
        backdropDismiss={false}
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