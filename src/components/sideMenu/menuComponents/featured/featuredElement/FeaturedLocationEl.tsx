import { IonText, IonTitle } from '@ionic/react';
import React from 'react';
// import './featured.css';

const FeaturedLocationEl: React.FC<{title: string, actions: number, posts: number}> = ({title, actions, posts}) => {
    return (
        <div className="featured-el-selector">
            <IonTitle className="featured-el-title">{title}</IonTitle>
            <div className="featured-el-details">
                <IonText className="featured-el-text">{actions} Actions</IonText>
                <IonText className="featured-el-text">{posts} Posts</IonText>
            </div>
        </div>
    );
};
export default FeaturedLocationEl;