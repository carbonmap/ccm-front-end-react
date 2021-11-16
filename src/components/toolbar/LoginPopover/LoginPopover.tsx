import React, { useState } from 'react';
import { IonPopover, IonIcon } from '@ionic/react';
import LoginDisplay from 'src/components/UserAuth/LoginDisplay/LoginDisplay';
import { personCircleOutline } from 'ionicons/icons';
import '../toolbar.css';

const PopoverExample: React.FC = () => {
    const [displayLogin, setDisplayLogin] = useState(true);
    const [showLoginPopover, setShowLoginPopover] = useState({ showPopover: false, event: undefined });

    const switchDisplay = () => {
        setDisplayLogin(!displayLogin);
    };

  return (
      <div>
        <IonIcon 
            icon={personCircleOutline} 
            className="login-icon" 
            onClick={(e:any) => {
                e.persist();
                setShowLoginPopover({ showPopover: true, event: e })
            }}
        />
        <IonPopover
            event={showLoginPopover.event}
            isOpen={showLoginPopover.showPopover}
            onDidDismiss={() => setShowLoginPopover({ showPopover: false, event: undefined })}
            showBackdrop={false}
        >
            <LoginDisplay 
                login={displayLogin}
                switchDisplay={switchDisplay}
            />
        </IonPopover>
      </div>
  );
};

export default PopoverExample;