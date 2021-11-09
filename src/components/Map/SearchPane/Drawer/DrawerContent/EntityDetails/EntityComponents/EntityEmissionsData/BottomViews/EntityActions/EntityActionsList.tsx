import { IonText } from '@ionic/react';
import React from 'react';

interface PageProps {
    actions: any[]
}

const EntityActionsList: React.FC<PageProps> = (props) => {
    return (
        <>
            {props.actions.length > 0 ?
                <ul className="ion-margin-top">
                    {
                        props.actions.map((action, index) => {
                            return (
                                <a href={action.link} target="_blank" style={{ color: '#000', textDecoration: 'none' }}>
                                    <li>{action.title}</li>
                                </a>
                            );
                        })
                    }
                </ul>
            :
                <IonText>No actions available</IonText>
            }
        </>
    );
};

export default EntityActionsList;