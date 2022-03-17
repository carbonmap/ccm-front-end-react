import { IonIcon, IonText } from '@ionic/react'
import React, { useState } from 'react';
import { chevronDown } from 'ionicons/icons'; 

interface PageProps {
    bottomView: any,
    title: string,
    titleData: string
}

const DataAccordion: React.FC<PageProps> = (props) => {
    const [maxHeight, setMaxHeight] = useState("0vh");

    const openAccordion = () => {
        if(maxHeight === "0vh") {
            setMaxHeight("100vh");
        } else {
            setMaxHeight("0vh");
        };
    };

    return (
      <div className="ion-padding data-accordion">
        <div
          className="ion-justify-content-between accordion-title-container"
          onClick={() => openAccordion()}
        >
          <IonText className="accordion-title">
            <span className="accordion-title-bold">{props.titleData} </span>
            {props.title}
          </IonText>
          <IonIcon
            className="ion-align-self-center"
            icon={chevronDown}
            color="black"
          />
        </div>
        <div
          className="bottom-view-container"
          style={{
            maxHeight: maxHeight,
            transitionDuration: "1s",
            overflow: "hidden",
          }}
        >
          {props.bottomView}
        </div>
      </div>
    );
};

export default DataAccordion;