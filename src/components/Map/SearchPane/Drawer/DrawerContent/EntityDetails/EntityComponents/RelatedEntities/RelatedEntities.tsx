import { IonItem } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useNavigateBottomDrawer } from "../../../../drawerUtils";
import DataAccordion from "../EntityEmissionsData/DataAccordion/DataAccordion";

interface ComponentProps {
  entityRelatives: any;
}

const EntityLinkList: React.FC<ComponentProps> = ({ entityRelatives }) => {
  const { navigateDrawer } = useNavigateBottomDrawer();

  return (
    <>
      {entityRelatives.parentEntities?.length ? (
        <IonItem
          onClick={() =>
            navigateDrawer(`/${entityRelatives.parentEntities[0]?.id}`)
          }
          className="search-suggestion-el"
          style={{ borderBottom: "1px solid #ccc" }}
        >
          {entityRelatives.parentEntities[0]?.name}
        </IonItem>
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {entityRelatives.subEntities?.length
          ? entityRelatives.subEntities.map((child: any) => (
              <IonItem
                onClick={() => navigateDrawer(`/${child.id}`)}
                className="search-suggestion-el"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                {child.name}
              </IonItem>
            ))
          : null}
      </div>
    </>
  );
};

interface PageProps {
  entityDetails: any;
}

const RelatedEntities: React.FC<PageProps> = ({ entityDetails }) => {
  const [entityRelatives, setEntityRelatves] = useState<any>({
    parentEntities: [],
    siblingEntities: [],
    subEntities: [],
  });

  const getRelatedEntities = async (entity: any) => {
    const entityId = entity.id.split(".");
    entityId.pop();
    const routeId = entityId.join(".");

    const response = await fetch(
      `${process.env.REACT_APP_DATABASE_URL}/entities.json`
    );
    const data = await response.json();

    let parentEntities: any[] = [];
    let siblingEntities: any[] = [];
    let subEntities: any[] = [];

    data.entities.forEach((dataItem: any) => {
      if (dataItem.id !== entity.id) {
        const splitId = dataItem.id.split(".");
        splitId.pop();
        const parentStr = splitId.join(".");

        if (parentStr === routeId) {
          siblingEntities.push(dataItem);
        } else if (routeId === dataItem.id) {
          parentEntities.push(dataItem);
        } else if (parentStr === entity.id) {
          subEntities.push(dataItem);
        }
      }
    });

    const compare = (a: any, b: any) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    };

    parentEntities.sort(compare);
    siblingEntities.sort(compare);
    subEntities.sort(compare);

    const relatedEntities = {
      parentEntities,
      siblingEntities,
      subEntities,
    };

    setEntityRelatves(relatedEntities);
  };

  useEffect(() => {
    if (entityDetails) {
      getRelatedEntities(entityDetails);
    }
  }, [entityDetails]);

  return (
    <DataAccordion
      title="Related"
      titleData={""}
      bottomView={<EntityLinkList entityRelatives={entityRelatives} />}
    />
  );
};

export default RelatedEntities;
