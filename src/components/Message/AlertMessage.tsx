import React, {Children} from 'react';
import { IonButton, IonContent, IonPage, useIonAlert } from "@ionic/react";
import {ErrorBoundary} from 'react-error-boundary';

interface ErrorProps {
    children: React.ReactNode[];
}

const AlertMessage: React.FC<ErrorProps> = (props) => {
    const [present] = useIonAlert();

    return (

        <IonPage>
            <IonContent fullscreen>
                <IonButton
                    expand="block"
                    onClick={() =>
                        present({
                            cssClass: 'my-css',
                            header: 'Alert',
                            message: 'alert from hook',
                            buttons: [
                                'Cancel',
                                { text: 'Ok', handler: (d) => console.log('ok pressed') },
                            ],
                            onDidDismiss: (e) => console.log('did dismiss'),
                        })
                    }
                >
                    {props.children}
                </IonButton>
            </IonContent>
        </IonPage>
    )

}

export default AlertMessage;