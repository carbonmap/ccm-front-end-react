import React, { useRef, useEffect, useState } from 'react';
import { IonCard, createGesture, IonIcon } from '@ionic/react';
import { remove } from 'ionicons/icons';
import DrawerContent from '../DrawerContent';

interface PageProps {
  isOpen: boolean;
  isMobile: boolean;
  selectedLocation: any;
  emissionsData: {id: string, name: string, emissions: string[]}[];
  entitiesByBusinessType: object[];
}

const MobileDrawer: React.FC<PageProps> = (props) => {
    const [drawerClass, setDrawerClass] = useState("drawer-closed");

    const drawerRef = useRef<any>();
    const dragRef = useRef<any>();

    // Styles changed by both class and by ref as transform needs to change depending on users mouse position to be able to drag the drawer
    // Ref styles override css styles so once the user drages the drawer the css transform style is ignored

    const toggleDrawer = () => {
      // styles ref directly
        let c = drawerRef.current;
        if (c.dataset.open === "true") {
          setDrawerClass("drawer-closed");
          c.style.transform = "translateY(46%)";
          c.dataset.open = "false";
        } else {
          c.style.transition = ".5s ease-in";
          c.style.transform = `translateY(0%) `;
          // c.style.marginBottom = "46vh";
          c.dataset.open = "true";
        }
      };

      // Initially open drawer using css class
      const openDrawer = () => {
        let c = drawerRef.current;
        setDrawerClass("drawer-open")
        // c.dataset.open = "true";
      };

    useEffect(() => {
      if(props.emissionsData || props.selectedLocation || props.entitiesByBusinessType.length > 0) {
        openDrawer();
      };
    }, [props.selectedLocation, props.entitiesByBusinessType, props.emissionsData]);

    // useEffect(() => {
    //   let c = drawerRef.current;
    //   let height = window.innerHeight;

    //   // Change drawer position by dragging - styles ref directly
    //   const gesture = createGesture({
    //       el: dragRef.current,
    //       gestureName: "my-swipe",
    //       direction: "y",
    //       onMove: event => {
    //           let position = height - event.currentY;
    //           if (position > (height * 0.74)) return;
    //           // if (position > height) return;
    //           // closing with a downward swipe
    //           if (position < 100) {
    //             c.style.transform = "";
    //             c.dataset.open = "false";
    //             return;
    //           }
    //           c.style.transform = `translateY(-${position}px)`;
    //         },
    //       onEnd: event => {
    //           let position = height - event.currentY;
    //           c.style.transition = ".5s ease-out";
    //           if (position > 100 && c.dataset.open != "true") {
    //             c.dataset.open = "true";
    //           }
    //         }
    //   });
    //   gesture.enable(true);
    // }, []);

    return (
        <IonCard className={`bottom-drawer ${drawerClass}`} ref={drawerRef}>
          <div style={{ textAlign: "center", width: '100%', backgroundColor: '#fff' }} >
              <IonIcon 
                ref={dragRef}
                size="large" 
                icon={remove} 
                onClick={toggleDrawer} 
              />
          </div>
          <DrawerContent 
              entitiesByBusinessType={props.entitiesByBusinessType}
              emissionsData={props.emissionsData}
              isOpen={props.isOpen}
              isMobile={props.isMobile}
          />
        </IonCard>
    );
};

export default MobileDrawer;