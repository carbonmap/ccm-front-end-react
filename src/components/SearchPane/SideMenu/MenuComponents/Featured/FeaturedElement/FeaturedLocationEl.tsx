import { IonContent, IonText, IonTitle } from '@ionic/react';
import React from 'react';

const FeaturedLocationEl: React.FC<{title: string, actions: number, posts: number, index: number, isOpen: boolean}> = ({title, actions, posts, index, isOpen}) => (
    <div className="featured-el-selector" style={{ transitionDelay: `0.${index}s`, transitionDuration: '0.3s', transform: isOpen ? 'translateX(0%)' : 'translateX(100%)' }} >
        <IonTitle color="dark" className="featured-el-title">{title}</IonTitle>
        <div className="featured-el-details">
            <IonText className="featured-el-text">{actions} Actions</IonText>
            <IonText className="featured-el-text">{posts} Posts</IonText>
        </div>
    </div>
);

export default FeaturedLocationEl;