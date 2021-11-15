import { IonText } from '@ionic/react';
import React from 'react';
import FeaturedEl from './FeaturedElement/FeaturedLocationEl';

interface PageProps {
    emissionsData: {id: string, name: string, emissions: string[]}[];
    featuredEntities: {id: string, name: string, emissions: string[]}[];
    openMenu: Function;
    setInputVal: Function;
}

const Featured: React.FC<PageProps> = (props) => {

    return (
        <div className="featured-container">
            <IonText className="featured-title-main" color="primary">Featured</IonText>
            {
                props.featuredEntities.map((entity: any, index) => {
                    return (
                        <FeaturedEl 
                            key={index}
                            index={index}
                            entity={entity}
                            title={entity.name}
                            actions={2}
                            posts={2}
                            openMenu={props.openMenu}
                            setInputVal={props.setInputVal}
                        />
                    )
                })
            }
        </div>
    );
};

export default Featured;