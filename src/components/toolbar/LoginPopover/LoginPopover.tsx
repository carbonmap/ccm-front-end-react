import React, { useState } from 'react';
import { IonPopover, IonIcon, IonText } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
// import LoginDisplay from 'src/components/UserAuth/LoginDisplay/LoginDisplay';

interface PageProps {
    popoverState: { showPopover: boolean, event: any },
    setShowPopover: (popoverState: { showPopover: boolean, event: any }) => void;
}

const PopoverExample: React.FC<PageProps> = (props) => {
    const [displayLogin, setDisplayLogin] = useState(true);

    const switchDisplay = () => {
        setDisplayLogin(!displayLogin);
    };

  return (
      <IonPopover
        event={props.popoverState.event}
        isOpen={props.popoverState.showPopover}
        onDidDismiss={() => props.setShowPopover({ showPopover: false, event: undefined })}
        showBackdrop={false}
    >
        {/* <LoginDisplay 
            login={displayLogin}
            switchDisplay={switchDisplay}
        /> */}
        <a href="https://cambridgecarbonmap.org/sign-up-to-the-map/" target="_blank" className="addOrgLink" >
          <IonIcon 
            icon={addCircleOutline}
            color="primary"
            style={{ fontSize: 24, marginRight: 8 }}
          />
          <IonText color="primary">Add your organisation</IonText>
        </a>
    </IonPopover>
  );
};

export default PopoverExample;