import React, { useState } from 'react';
import { IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import './toolbar.css';
import { personCircleOutline, informationCircleOutline } from 'ionicons/icons';
import LoginPopover from './LoginPopover/LoginPopover';
import HelpBtn from './HelpBtn/HelpBtn';

const Toolbar: React.FC = () => {
    const [showLoginPopover, setShowLoginPopover] = useState({ showPopover: false, event: undefined });
    const [showHelpPopover, setShowHelpPopover] = useState({ showPopover: false, event: undefined });

    return (
        <IonToolbar className="toolbar" color="primary">
            <div className="toolbar-content">
                <IonTitle>Cambridge Carbon Map</IonTitle>
                <HelpBtn 

                />
                {/* <IonIcon 
                    icon={informationCircleOutline} 
                    className="login-icon" 
                    onClick={(e:any) => {
                        e.persist();
                        setShowHelpPopover({ showPopover: true, event: e })
                    }}
                /> */}
                {/* <IonIcon 
                    icon={personCircleOutline} 
                    className="login-icon" 
                    onClick={(e:any) => {
                        e.persist();
                        setShowLoginPopover({ showPopover: true, event: e })
                    }}
                /> */}
                <LoginPopover  
                    popoverState={showLoginPopover}
                    setShowPopover={setShowLoginPopover}
                />
            </div>
        </IonToolbar>
    );
};

export default Toolbar;