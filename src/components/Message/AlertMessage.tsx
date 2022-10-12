import React from "react";
import { IonContent, IonAlert } from "@ionic/react";

import "./AlertMessage.css";

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
        cssClass="my-custom-class "
        message={props.children}
        buttons={["OK"]}
      />
    </IonContent>
  );
};

export default AlertMessage;
