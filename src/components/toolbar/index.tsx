import React, { useState } from 'react';
import { IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import './toolbar.css';
import { personCircleOutline } from 'ionicons/icons';
import LoginPopover from './LoginPopover/LoginPopover';

const Toolbar: React.FC = () => {
    const [showPopover, setShowPopover] = useState({ showPopover: false, event: undefined });

    return (
        <IonToolbar className="toolbar" color="primary">
            <div className="toolbar-content">
                <IonTitle>Cambridge Carbon Map</IonTitle>
                <IonIcon 
                    icon={personCircleOutline} 
                    className="login-icon" 
                    onClick={(e:any) => {
                        e.persist();
                        setShowPopover({ showPopover: true, event: e })
                    }}
                />
                <LoginPopover  
                    popoverState={showPopover}
                    setShowPopover={setShowPopover}
                />
            </div>
        </IonToolbar>
    );
};

export default Toolbar;