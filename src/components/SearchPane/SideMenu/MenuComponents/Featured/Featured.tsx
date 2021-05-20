import { IonTitle } from '@ionic/react';
import React from 'react';
import FeaturedEl from './FeaturedElement/FeaturedLocationEl';
import './featured.css';

interface PageProps {
    featuredEntities: string[]
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
                            title={entity.name}
                            actions={2}
                            posts={2}
                        />
                    )
                })
            }
        </div>
    );
};

export default Featured;