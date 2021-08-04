import React from "react";
import {IonHeader, IonText, IonButton, IonContent, IonAlert} from "@ionic/react";
import Toolbar from "../toolbar";
import "./ErrorFallback.css";


interface IErrorBoundaryProps {
    error: Error,
    resetErrorBoundary: any,

}

const ErrorFallback: React.FC<IErrorBoundaryProps> = (props) => {

    return (

            <>
                <IonHeader>
                    <Toolbar />
                </IonHeader>

                <IonContent>

                    <IonAlert
                        isOpen={true}
                        onDidDismiss={() => {console.log("User notified about locations not found error")}}
                        cssClass='ErrorBoundary'
                        header={props.error.message}
                        buttons={[{text: 'Try again',handler:() => {props.resetErrorBoundary()} }]}
                    />
                </IonContent>

            </>
        // <>
            //     <IonHeader>
            //         <Toolbar />
            //     </IonHeader>
            //     <div className="ErrorBoundary text-center">
            //         <p color='danger'>{props.error.message}</p>
            //         <h3>There is something wrong, we are working on it</h3>
            //         <button  onClick={props.resetErrorBoundary} color="danger">Try again</button>
            //     </div>
            // </>

    )
}

export default ErrorFallback;


