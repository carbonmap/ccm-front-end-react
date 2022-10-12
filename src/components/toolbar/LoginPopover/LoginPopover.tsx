import React, { useState } from 'react';
import { personCircleOutline } from 'ionicons/icons';
import '../toolbar.css';
import { IonPopover, IonIcon, IonText } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import LoginDisplay from "src/components/UserAuth/LoginDisplay/LoginDisplay";

const LoginPopover: React.FC = () => {
  const [displayLogin, setDisplayLogin] = useState(true);
  const [showLoginPopover, setShowLoginPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  const switchDisplay = () => {
    setDisplayLogin(!displayLogin);
  };

  return (
    <div>
      <IonIcon
        icon={personCircleOutline}
        className="login-icon"
        onClick={(e: any) => {
          e.persist();
          setShowLoginPopover({ showPopover: true, event: e });
        }}
      />
      {/* )} */}
      <IonPopover
        event={showLoginPopover.event}
        isOpen={showLoginPopover.showPopover}
        onDidDismiss={() =>
          setShowLoginPopover({ showPopover: false, event: undefined })
        }
        showBackdrop={false}
      >
        <LoginDisplay login={displayLogin} switchDisplay={switchDisplay} />
        <a
          href="https://cambridgecarbonmap.org/sign-up-to-the-map/"
          target="_blank"
          rel="noreferrer"
          className="addOrgLink"
        >
          <IonIcon
            icon={addCircleOutline}
            color="primary"
            style={{ fontSize: 24, marginRight: 8 }}
          />
          <IonText color="primary">Add your organisation</IonText>
        </a>
      </IonPopover>
    </div>
  );
};

export default LoginPopover;