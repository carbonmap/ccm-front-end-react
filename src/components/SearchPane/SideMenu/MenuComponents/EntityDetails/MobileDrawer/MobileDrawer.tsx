import React, { useRef, useEffect } from 'react';
import { IonCard, IonButton, IonCardHeader, createGesture, IonIcon, IonText } from '@ionic/react';
import '../entityDetails.css';
import EntityDetails from '../EntityDetails';
import { remove } from 'ionicons/icons';

interface PageProps {
    isOpen: boolean;
    closeMenu: Function;
    isSearching: boolean;
    isMobile: boolean;
    selectedLocation: any;
}

const MobileDrawer: React.FC<PageProps> = (props) => {
    const drawerRef = useRef<any>();
    const dragRef = useRef<any>();

    const toggleDrawer = () => {
        let c = drawerRef.current;
        if (c.dataset.open === "true") {
          c.style.transition = ".5s ease-out";
          c.style.transform = "";
          c.dataset.open = "false";
        } else {
          c.style.transition = ".5s ease-in";
          c.style.transform = `translateY(${-350}px) `;
          c.dataset.open = "true";
        }
      };

    useEffect(() => {
        let c = drawerRef.current;
        let height = window.innerHeight;

        const gesture = createGesture({
            el: dragRef.current,
            gestureName: "my-swipe",
            direction: "y",
            onMove: event => {
                let position = height - event.currentY;
                if (position > (height * 0.74)) return;
               // closing with a downward swipe
               if (position < 100) {
                 c.style.transform = "";
                 c.dataset.open = "false";
                 return;
               }
                c.style.transform = `translateY(-${position}px)`;
              },
            onEnd: event => {
                let position = height - event.currentY;
                c.style.transition = ".5s ease-out";
                if (position > 100 && c.dataset.open != "true") {
                //   c.style.transform = `translateY(${-74}vh) `;
                  c.dataset.open = "true";
                }
              }
        });
        gesture.enable(true);
    }, [])
    
    return (
        <IonCard className="bottom-drawer" ref={drawerRef}>
            <div style={{ textAlign: "center", width: '100%', backgroundColor: '#fff' }} >
                <IonIcon 
                  ref={dragRef}
                  size="large" 
                  icon={remove} 
                  onClick={toggleDrawer} 
                />
            </div>
            {/* <div className="entity-details-wrapper"> */}
              {props.selectedLocation ?
                  <EntityDetails 
                      isOpen={props.isOpen}
                      closeMenu={props.closeMenu}
                      isSearching={props.isSearching}
                      isMobile={props.isMobile}
                  />
              : 
                  null
              }
            {/* </div> */}
        </IonCard>
    );
};

export default MobileDrawer;