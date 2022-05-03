import React, { useEffect } from 'react';
import { IonModal } from '@ionic/react';
import { modalController } from '@ionic/core';
import DrawerContent from '../DrawerContent';
import { useLocation } from 'react-router';

interface PageProps {
  isOpen: boolean;
  isMobile: boolean;
  selectedLocation: any;
  emissionsData: { id: string; name: string; emissions: string[] }[];
  entitiesByBusinessType: object[];
  isSearching: boolean;
}

const MobileDrawer: React.FC<PageProps> = (props) => {
  const location = useLocation();

  const modalSubject =
    props.entitiesByBusinessType ||
    location.pathname === props.emissionsData[0].id ? (
      <DrawerContent
        entitiesByBusinessType={props.entitiesByBusinessType}
        emissionsData={props.emissionsData}
        isOpen={props.isOpen}
        isMobile={props.isMobile}
      />
    ) : null;

  return (
    <div>
      <IonModal
        style={{ display: props.isSearching ? "none" : "block" }}
        isOpen={true}
        swipeToClose={true}
        breakpoints={[0.05, 0.4, 0.95]}
        initialBreakpoint={0.4}
        backdropBreakpoint={0.4}
        className="bottom-sheet"
        showBackdrop={true}
        backdropDismiss={false}
        children={modalSubject}
      />
    </div>
  );
};

export default MobileDrawer;