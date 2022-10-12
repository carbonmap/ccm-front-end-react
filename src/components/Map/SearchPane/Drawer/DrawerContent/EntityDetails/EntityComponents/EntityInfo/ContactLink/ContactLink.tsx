import { IonText } from '@ionic/react'
import React from 'react'

interface PageProps {
    src: string;
    alt:string;
    text:string;
    href:string;
}

const ContactLink: React.FC<PageProps> = (props) => {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "flex",
          flexDirection: "row",
          marginRight: 24,
          textDecoration: "none",
        }}
      >
        <img
          src={`/assets/icon/linkIcons/${props.src}`}
          style={{ width: 20, height: 20, marginRight: 8 }}
          alt={props.alt}
        />
        <IonText style={{ color: "black" }}>{props.text}</IonText>
      </a>
    );
};

export default ContactLink;