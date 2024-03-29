import React, { useState } from 'react';
import { IonButton, IonIcon, IonPopover, IonText } from "@ionic/react";
import { informationCircleOutline } from 'ionicons/icons';

const HelpBtn:React.FC = () => {
    const [showHelpPopover, setShowHelpPopover] = useState({ showPopover: false, event: undefined })
;
    return (
      <div>
        <IonIcon
          icon={informationCircleOutline}
          className="login-icon"
          onClick={(e: any) => {
            e.persist();
            setShowHelpPopover({ showPopover: true, event: e });
          }}
        />
        <IonPopover
          isOpen={showHelpPopover.showPopover}
          // event={showHelpPopover.event}
          onDidDismiss={() =>
            setShowHelpPopover({ showPopover: false, event: undefined })
          }
          showBackdrop={true}
          className="info-popover"
        >
          <div className="popover-content-container">
            <IonText className="info-popover-title">
              How to use Cambridge Carbon Map:
            </IonText>
            <ol>
              <li className="info-popover-txt">
                Explore by selecting highlighted areas
              </li>
              <li className="info-popover-txt">
                Educate yourself about the climate actions that organisations
                have taken and the impacts that they have had
              </li>
              <li className="info-popover-txt">
                Engage by reaching out to the organisations which most interest
                you. Arrange a conversation!
              </li>
              <li className="info-popover-txt">
                Inspire others by sharing your own organisation’s actions on the
                map! Sign up{" "}
                <a
                  href="https://cambridgecarbonmap.org/sign-up-to-the-map/"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>{" "}
                or email{" "}
                <a href="mailto:info@cambridgecarbonmap.org">
                  info@cambridgecarbonmap.org
                </a>
              </li>
            </ol>
            <IonButton
              onClick={() =>
                setShowHelpPopover({ showPopover: false, event: undefined })
              }
              className="popover-btn"
            >
              OK
            </IonButton>
          </div>
        </IonPopover>
      </div>
    );
};

export default HelpBtn;