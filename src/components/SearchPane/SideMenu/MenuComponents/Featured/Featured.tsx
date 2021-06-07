import { IonTitle } from '@ionic/react';
import React from 'react';
import FeaturedEl from './FeaturedElement/FeaturedLocationEl';
import './featured.css';

interface PageProps {
    featuredEntities: string[];
    openMenu: Function
}

const Featured: React.FC<PageProps> = (props) => {

    return (
        <div className="featured-container">
            <IonTitle className="featured-title-main" color="primary">Featured</IonTitle>
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
                        />
                    )
                })
            }
        </div>
    );
};

export default Featured;