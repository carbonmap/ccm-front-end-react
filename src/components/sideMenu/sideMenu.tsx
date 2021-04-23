import React from 'react';
import './sideMenu.css';
import { IonContent, IonText, IonTitle } from '@ionic/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';


const SideMenu: React.FC = (props) => {
    const isOpen = useSelector( (state: RootState) => state.menuOpen);
    const isMobile = useSelector( (state: RootState) => state.isMobile);

    const mobileMenuStyle = (
        isOpen ? 'translateY(40%)' : 'translateY(100%)'
    )
    const desktopMenuStyle = (
        isOpen ? 'translateX(0%)' : 'translateX(100%)'
    )

    return (
        <IonContent className="ion-align-self-end side-menu" slot="end" style={{ transform: !isMobile ? desktopMenuStyle : mobileMenuStyle }}>
            <IonTitle>Featured</IonTitle>
            {/* <IonList> */}
                <div style={{  }}>
                    <p>Kings College</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <p>3 actions</p>
                        <p>2 posts</p>
                    </div>
                </div>
            {/* </IonList> */}
        </IonContent>
    )
}

export default SideMenu;