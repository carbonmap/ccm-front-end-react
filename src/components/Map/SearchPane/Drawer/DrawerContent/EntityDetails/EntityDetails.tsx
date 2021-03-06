import React, { useState } from 'react';
import EntityInfo from './EntityComponents/EntityInfo/EntityInfo';
import EntityEmissionsData from './EntityComponents/EntityEmissionsData/EntityEmissionsData';
import RelatedEntities from "./EntityComponents/RelatedEntities/RelatedEntities";

interface PageProps {
  isOpen: boolean;
  emissionsData: { id: string; name: string; emissions: string[] }[];
  entitiesByBusinessType: object[];
  isMobile: boolean;
}

const EntityDetails: React.FC<PageProps> = (props) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const mobileMenuStyle = props.isOpen ? "translateY(0vh)" : "translateY(42vh)";
  const desktopMenuStyle = props.isOpen ? "translateX(0%)" : "translateX(100%)";

  return (
    <div
      className="entity-details-container"
      style={{
        transform: !props.isMobile ? desktopMenuStyle : mobileMenuStyle,
      }}
    >
      <EntityInfo
        emissionsData={props.emissionsData}
        entitiesByBusinessType={props.entitiesByBusinessType}
        isEmpty={isEmpty}
      />
      <EntityEmissionsData
        emissionsData={props.emissionsData}
        entitiesByBusinessType={props.entitiesByBusinessType}
        setIsEmpty={setIsEmpty}
      />
      <RelatedEntities entityDetails={props.emissionsData[0]} />
    </div>
  );
};

export default EntityDetails;