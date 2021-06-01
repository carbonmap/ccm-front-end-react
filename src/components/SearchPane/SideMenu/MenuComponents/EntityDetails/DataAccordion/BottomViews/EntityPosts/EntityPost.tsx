import { IonText, IonTitle } from '@ionic/react';
import React from 'react';

interface PageProps {
    title: string,
    text: string,
    date: string
}

const EntityPost: React.FC<PageProps> = (props) => {
    return (
        <div className="accordion-post">
            <div className="accordion-post-title ion-justify-content-between">
                <IonText className="accordion-title-bold">{props.title}</IonText>
                <IonText>{props.date}</IonText>
            </div>
            <div className="accordion-post-text-container">
                <IonText className="accordion-post-text">{props.text}</IonText>
                <div className="accordion-post-readmore-container">
                    <IonText className="accordion-post-readmore">[READ MORE]</IonText>
                </div>
            </div>
        </div>
    );
};

export default EntityPost;