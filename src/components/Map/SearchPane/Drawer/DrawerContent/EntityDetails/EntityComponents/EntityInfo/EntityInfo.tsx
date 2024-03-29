import { IonText } from '@ionic/react';
import React, { useCallback, useEffect, useState } from "react";
import Spinner from "src/components/UI/spinner/spinner";
import ContactLink from "./ContactLink/ContactLink";
import { useNavigateBottomDrawer } from "../../../../drawerUtils";

interface PageProps {
  emissionsData: { id: string; name: string; emissions: string[] }[];
  entitiesByBusinessType: object[];
  isEmpty: boolean;
}
const EntityInfo: React.FC<PageProps> = (props) => {
  const [entityDetails, setEntityDetails] = useState<any>();
  const [descHeight, setDescHeight] = useState("8vh");
  const [seeMoreText, setSeeMoreText] = useState("more");

  const { navigateDrawer } = useNavigateBottomDrawer();

  const getEntityDetails = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_DATABASE_URL}/entity_property/${props.emissionsData[0].id}.json`
    );
    const data = await response.json();

    setEntityDetails(data);
  }, [props.emissionsData]);

  const handleReadMore = () => {
    if (!props.isEmpty) {
      if (descHeight !== "100vh") {
        setDescHeight("100vh");
        setSeeMoreText("less");
      } else {
        setDescHeight("8vh");
        setSeeMoreText("more");
      }
    }
  };

  useEffect(() => {
    if (props.isEmpty) {
      setDescHeight("100vh");
    } else {
      setDescHeight("8vh");
    }
  }, [props.isEmpty]);

  useEffect(() => {
    if (props.emissionsData && props.entitiesByBusinessType.length === 0) {
      getEntityDetails();
    }
  }, [getEntityDetails, props.emissionsData, props.entitiesByBusinessType]);

  return (
    <div>
      {entityDetails ? (
        <div>
          <div className="entity-identification-details">
            <div>
              <div className="entity-title-container">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 8,
                  }}
                >
                  <IonText className="ion-text-capitalize ion-text-left entity-title">
                    {entityDetails.name}
                  </IonText>
                  <IonText className="ion-text-capitalize entity-address">
                    {entityDetails.address}
                  </IonText>
                </div>
                {entityDetails.business_type ? (
                  <IonText
                    onClick={() =>
                      navigateDrawer(
                        `/business-type/${entityDetails.business_type}`
                      )
                    }
                    className="ion-text-capitalize entity-business-type"
                  >
                    {entityDetails.business_type}
                  </IonText>
                ) : null}
              </div>
              <div className="connect-link-container">
                {entityDetails.website ? (
                  <ContactLink
                    src="link.png"
                    alt="Link Icon"
                    text="Website"
                    href={entityDetails.website}
                  />
                ) : null}
                <ContactLink
                  src="friends.png"
                  alt="Connect Icon"
                  text="Connect"
                  href={`mailto:info@cambridgecarbonmap.org?subject=Please introduce me to ${entityDetails.name}&body=Thank you!`}
                />
              </div>
            </div>
            <img
              alt={entityDetails.name}
              className="entity-img"
              src={entityDetails.img}
            />
          </div>
          <br />
          <div
            className="entity-desc-container"
            onClick={() => handleReadMore()}
          >
            <div
              className="entity-desc-text-container"
              style={{
                maxHeight: descHeight,
                transitionDuration: "2s",
                marginBottom: "4vh",
              }}
            >
              <IonText className="entity-desc">{entityDetails.desc}</IonText>
              <div
                className="entity-desc-readmore-container"
                style={{
                  bottom: descHeight === "8vh" ? "-2vh" : "-2vh",
                  transitionDuration: "1s",
                  height: descHeight === "8vh" ? "140%" : "0%",
                }}
              >
                {props.isEmpty ? null : (
                  <IonText color="primary" className="entity-desc-readmore">
                    See {seeMoreText}...
                  </IonText>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default EntityInfo;