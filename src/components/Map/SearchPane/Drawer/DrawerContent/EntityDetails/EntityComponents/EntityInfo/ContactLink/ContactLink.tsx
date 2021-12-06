import { IonText } from '@ionic/react'
import React from 'react'

interface PageProps {
    src: string;
    alt:string;
    text:string;
}

const ContactLink: React.FC<PageProps> = (props) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', marginRight: 24 }}>
            <img 
                src={`/assets/icon/linkIcons/${props.src}`}
                style={{ width: 20, height: 20, marginRight: 8 }}
                alt={props.alt}
            />
            <IonText>{props.text}</IonText>
        </div>
    );
};

export default ContactLink;