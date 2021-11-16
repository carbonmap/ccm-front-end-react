import React, { useState } from 'react';
import {  IonIcon, IonPopover, IonText } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';

const HelpBtn:React.FC = () => {
    const [showHelpPopover, setShowHelpPopover] = useState({ showPopover: false, event: undefined })
;
    return (
        <div>
            <IonIcon 
                icon={informationCircleOutline} 
                className="login-icon" 
                onClick={(e:any) => {
                    e.persist();
                    setShowHelpPopover({ showPopover: true, event: e })
                }}
            />
            <IonPopover
                isOpen={showHelpPopover.showPopover}
                event={showHelpPopover.event}
                onDidDismiss={() => setShowHelpPopover({ showPopover: false, event: undefined })}
                showBackdrop={false}
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: 16, textAlign: 'center' }}>
                    <IonText style={{ marginBottom: 16, fontWeight: 500 }}>Welcome to the Cambridge Carbon Map!</IonText>
                    <a href="https://cambridgecarbonmap.org/" target="_blank">Learn More</a>
                </div>
            </IonPopover>
        </div>
    );
};

export default HelpBtn;