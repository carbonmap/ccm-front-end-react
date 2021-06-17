import { IonText } from '@ionic/react';
import React from 'react';

interface PageProps {
    action: string,
}

const EntityAction: React.FC<PageProps> = (props) => {
    return (
        <div>
            <IonText>{props.action}</IonText>
        </div>
    );
};

export default EntityAction;