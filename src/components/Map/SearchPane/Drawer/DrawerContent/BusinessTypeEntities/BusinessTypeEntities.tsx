import React from "react";
import { IonItem, IonText } from "@ionic/react";
import { useNavigateBottomDrawer } from "../../drawerUtils";

interface PageProps {
  entitiesByBusinessType: any;
}

const BusinessTypeEntities: React.FC<PageProps> = (props) => {
  const { navigateDrawer } = useNavigateBottomDrawer();

  return (
    <div style={{ height: "100%", marginTop: "4vh", overflow: "visible" }}>
      <IonText
        style={{ fontSize: 32, textDecoration: "underline" }}
        color="primary"
        className="ion-text-capitalize ion-margin"
      >
        {props.entitiesByBusinessType[0].business_type}
      </IonText>
      {props.entitiesByBusinessType.map((entity: any, index: number) => {
        return (
          <div onClick={() => navigateDrawer(`/${entity.id}`)}>
            <IonItem className="search-suggestion-el">{entity.name}</IonItem>
          </div>
        );
      })}
    </div>
  );
};

export default BusinessTypeEntities;
