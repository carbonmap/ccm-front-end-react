import { IonList, IonText } from '@ionic/react';
import React from 'react';

interface PageProps {
    action: any,
}

const EntityAction: React.FC<PageProps> = (props) => {
    return (
      <a
        href={props.action.link}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#000", textDecoration: "none" }}
      >
        <li>{props.action.title}</li>
      </a>
    );
};

export default EntityAction;