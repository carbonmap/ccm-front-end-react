import React, { useState } from 'react';
import { IonButton, IonIcon, IonPopover, IonText, IonTitle } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';

const HelpBtn:React.FC = () => {
    const [showHelpPopover, setShowHelpPopover] = useState({ showPopover: false, event: undefined })
;
    return (
        <div >
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
                    // event={showHelpPopover.event}
                    onDidDismiss={() => setShowHelpPopover({ showPopover: false, event: undefined })}
                    showBackdrop={true}
                    cssClass="info-popover"
                >
                    <div style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
                        <ol>
                            <li>Explore by selecting highlighted areas</li>
                            <li>Educate yourself about the climate actions that organisations have taken and the impacts that they have had</li>
                            <li>Engage by reaching out to the organisations which most interest you. Arrange a conversation!</li>
                            <li>Inspire others by sharing your own organisation’s actions on the map. Sign up here or email info@cambridgecarbonmap.org!</li>
                        </ol>
                        <IonButton className="popover-btn">OK</IonButton>
                    </div>
                </IonPopover>
        </div>
    );
};

export default HelpBtn;