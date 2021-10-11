import React from 'react';
import EntityAction from './EntityAction';

interface PageProps {
    actions: any[]
}

const EntityActionsList: React.FC<PageProps> = (props) => {
    return (
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
    );
};

export default EntityActionsList;