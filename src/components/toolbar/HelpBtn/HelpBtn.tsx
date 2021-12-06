import React, { useState } from 'react';
import { IonIcon, IonPopover, IonText } from '@ionic/react';
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
                    <div style={{ padding: 24 }}>
                        <IonText className="info-popover-txt">
                            How to use Cambridge Carbon Map:
                        </IonText>
                        <br/>
                        <IonText className="info-popover-txt">
                            Step 1: Explore by selecting highlighted areas
                        </IonText>
                        <br/>
                        <IonText className="info-popover-txt">
                            Step 2: Educate yourself about the climate actions that organisations have taken and the impacts that they have had
                        </IonText>
                        <br/>
                        <IonText className="info-popover-txt">
                            Step 3: Engage by reaching out to the organisations which most interest you. Arrange a conversation!
                        </IonText>
                        <br/>
                        <IonText className="info-popover-txt">
                            Step 4: Inspire others by sharing your own organisation’s actions on the map. Sign up here or email info@cambridgecarbonmap.org!
                        </IonText>
                    </div>
                </IonPopover>
        </div>
    );
};

export default HelpBtn;