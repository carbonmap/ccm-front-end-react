import { IonList, IonText } from '@ionic/react';
import React from 'react';

interface PageProps {
    action: any,
}

const EntityAction: React.FC<PageProps> = (props) => {
    return (
        // <div>
            <a href={props.action.link} target="_blank" style={{ color: '#000', textDecoration: 'none' }}><li>{props.action.title}</li></a>
            // <IonText>{props.action}</IonText>
        // </div>
    );
};

export default EntityAction;