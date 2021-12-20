import React from 'react';
import { IonTitle, IonToolbar } from '@ionic/react';
import LoginPopover from './LoginPopover/LoginPopover';
import HelpBtn from './HelpBtn/HelpBtn';

const Toolbar: React.FC = () => {
    return (
        <IonToolbar className="toolbar" color="primary">
            <div className="toolbar-content">
                <IonTitle className="toolbar-title">Cambridge Carbon Map</IonTitle>
                <div className="icon-container">
                    <HelpBtn />
                    <LoginPopover />
                </div>
            </div>
        </IonToolbar>
    );
};

export default Toolbar;