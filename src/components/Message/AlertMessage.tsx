import React, {Children,useState} from 'react';
import { IonButton, IonContent, IonPage, useIonAlert,IonAlert } from "@ionic/react";

import './AlertMessage.css';

interface ErrorProps {
    children: string;
}

const AlertMessage: React.FC<ErrorProps> = (props) => {
    return (
        <IonContent>
            <IonAlert
                isOpen={true}
                onDidDismiss={() => {
                    console.log("User notified about locations not found error");
                }}
                cssClass='my-custom-class '
                // header={'Something went wrong'}
                // subHeader={'Subtitle'}
                message={props.children}
                buttons={['OK']}
            />
        </IonContent>
    )

}

export default AlertMessage;