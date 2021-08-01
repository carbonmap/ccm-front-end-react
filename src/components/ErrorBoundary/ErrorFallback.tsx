import React from "react";
import {IonHeader, IonText, IonButton} from "@ionic/react";
import Toolbar from "../toolbar";
import "./ErrorFallback.css";



interface IErrorBoundaryProps {
    error: any,
    resetErrorBoundary: any
}

const ErrorFallback: React.FC<IErrorBoundaryProps> = (props) => {

    return (
        <>
            <IonHeader>
                <Toolbar />
            </IonHeader>
            <div className="ErrorBoundary text-center">
                <IonText color='danger'>{props.error.message}</IonText>
                <h3>There is something wrong, we are working on it</h3>
                <IonButton  onClick={props.resetErrorBoundary} color="danger">Try again</IonButton>
            </div>
        </>
    )
}

export default ErrorFallback;
