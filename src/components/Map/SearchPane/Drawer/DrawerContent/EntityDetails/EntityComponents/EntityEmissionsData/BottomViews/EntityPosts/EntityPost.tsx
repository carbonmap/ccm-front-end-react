import { IonText } from '@ionic/react';
import React, { useState } from 'react';

interface PageProps {
    title: string,
    text: string,
    date: string
}

const EntityPost: React.FC<PageProps> = (props) => {
    const [maxHeight, setMaxHeight] = useState("0vh");

    const date = new Date(props.date);

    const togglePostDisplay = () => {
        if(maxHeight === "0vh") {
            setMaxHeight("100vh");
        } else {
            setMaxHeight("0vh");
        };
    };

    return (
        <div className="accordion-post" style={{ borderBottom: '1px solid black' }}>
            <div className="accordion-post-title ion-justify-content-between ion-padding-vertical">
                <IonText onClick={() => togglePostDisplay()} className="accordion-title-bold">{props.title}</IonText>
                <IonText>{date.toLocaleDateString("en-UK")}</IonText>
            </div>
            <div className="accordion-post-text-container" style={{ maxHeight: maxHeight, overflow: 'hidden', transitionDuration: '1s' }}>
                <IonText className="accordion-post-text">{props.text}</IonText>
            </div>
        </div>
    );
};

export default EntityPost;