import { IonText } from '@ionic/react';
import React from 'react';
import EntityAction from './EntityAction';

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
                            <EntityAction 
                                key={index}
                                action={action}
                            />
                        )
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