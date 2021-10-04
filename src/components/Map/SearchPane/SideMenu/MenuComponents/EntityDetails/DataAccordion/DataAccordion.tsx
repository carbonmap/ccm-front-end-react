import { IonIcon, IonText } from '@ionic/react'
import React, { useState } from 'react';
import '../entityDetails.css';
import { chevronDown } from 'ionicons/icons'; 

interface PageProps {
    bottomView: any,
    title: string,
    titleData: string
}

const DataAccordion: React.FC<PageProps> = (props) => {
    const [bottomViewClass, setBottomViewClass] = useState("ion-hide");

    const openAccordion = () => {
        if(bottomViewClass === "ion-hide") {
            setBottomViewClass("");
        } else {
            setBottomViewClass("ion-hide");
        };
    };

    return (
        <div className="ion-padding data-accordion" >
            <div className="ion-justify-content-between accordion-title-container" onClick={() => openAccordion()}>
                <IonText className="accordion-title"><span className="accordion-title-bold">{props.titleData} </span>{props.title}</IonText>
                <IonIcon className="ion-align-self-center" icon={chevronDown} color="black" />
            </div>
            <div className={bottomViewClass}>
                {props.bottomView}
            </div>
        </div>
    );
};

export default DataAccordion;