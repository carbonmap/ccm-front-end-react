import { IonButton, IonText } from '@ionic/react';
import React from 'react';

interface PageProps {
    action: string,
}

const EntityAction: React.FC<PageProps> = (props) => {
    return (
        <div>
            {/* <IonButton>Click</IonButton> */}
            <IonText>{props.action}</IonText>
        </div>
    );
};

export default EntityAction;