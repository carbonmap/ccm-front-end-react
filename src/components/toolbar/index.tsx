import React from 'react';
import { IonTitle, IonToolbar } from '@ionic/react';
import './toolbar.css';

const Toolbar: React.FC = () => (
    <IonToolbar className="toolbar" color="primary">
        <IonTitle>Cambridge Carbon Map</IonTitle>
    </IonToolbar>
)

export default Toolbar;