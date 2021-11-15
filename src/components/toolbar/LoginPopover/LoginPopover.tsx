import React, { useState } from 'react';
import { IonPopover, IonButton } from '@ionic/react';
import LoginDisplay from 'src/components/UserAuth/LoginDisplay/LoginDisplay';

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
        <LoginDisplay 
            login={displayLogin}
            switchDisplay={switchDisplay}
        />
    </IonPopover>
  );
};

export default PopoverExample;