import { IonText, IonTitle } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import FeaturedEl from './featuredElement/FeaturedLocationEl';
import './featured.css';
// import { useFetch } from '../../../../service/hooks/useFetch';

const Featured: React.FC = () => {

    return (
        <div className="featured-container">
            <IonTitle className="featured-title-main" color="primary">Featured</IonTitle>
            <FeaturedEl 
                title="The Leys School"
                actions={2}
                posts={2}
            />
            <FeaturedEl 
                title="Caius College"
                actions={2}
                posts={2}
            />
            <FeaturedEl 
                title="King's College"
                actions={2}
                posts={2}
            />
        </div>
    );
};
export default Featured;