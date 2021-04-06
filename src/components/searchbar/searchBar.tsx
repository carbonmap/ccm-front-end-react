import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel } from '@ionic/react';
import React from 'react';

const searchBar: React.FC = () => (
    <IonItem slot="end" style={{ width: '20%', marginLeft: 'auto' }}>
        {/* <IonLabel position="stacked">Label</IonLabel> */}
        <IonInput placeholder="Search" />
        <IonIcon name="search-outline"></IonIcon>
        <IonButton slot="end">Featured</IonButton>
    </IonItem>
);

export default searchBar;