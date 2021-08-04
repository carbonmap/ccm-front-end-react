import React from "react";
import {IonHeader, IonText, IonButton, IonContent, IonAlert} from "@ionic/react";
import Toolbar from "../toolbar";
import "./ErrorFallback.css";
import {MapContainer, TileLayer} from "react-leaflet";


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
                <MapContainer
                    center={[52.20, 0.12]}
                    zoom={13}
                    maxZoom={18}
                    minZoom={5}
                    style={{height: '1000px', width: '100%'}}
                >
                <IonContent>

                    <IonAlert
                        isOpen={true}
                        onDidDismiss={() => {console.log("User notified about locations not found error")}}
                        cssClass='ErrorBoundaryAlert'
                        header={props.error.message}
                        buttons={[{text: 'Try again',handler:() => {props.resetErrorBoundary()} }]}
                    />
                </IonContent>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                </MapContainer>

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


