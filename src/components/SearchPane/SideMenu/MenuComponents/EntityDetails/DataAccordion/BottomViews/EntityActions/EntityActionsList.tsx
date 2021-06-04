import React from 'react';
import EntityAction from './EntityAction';

interface PageProps {
    actions: string[]
}

const EntityActionsList: React.FC<PageProps> = (props) => {
    return (
        <div className="ion-margin-top">
            {
                props.actions.map(action => {
                    return (
                        <EntityAction 
                            action={action}
                        />
                    )
                })
            }
        </div>
    );
};

export default EntityActionsList;