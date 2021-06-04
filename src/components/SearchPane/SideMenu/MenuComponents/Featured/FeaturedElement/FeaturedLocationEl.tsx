import { IonContent, IonText, IonTitle } from '@ionic/react';
import React from 'react';
import { useDispatch } from 'react-redux';

interface PageProps {
    title: string;
    actions: number; 
    posts: number; 
    index: number;
    isOpen: boolean;
    entity: any;
    setIsSearching: (isSearching: boolean) => void;
}

const FeaturedLocationEl: React.FC<PageProps> = (props) => { 

    const dispatch = useDispatch();

    const selectEntity = () => {
        props.setIsSearching(false);
        dispatch({ type: 'SET_LOCATION', payload: props.entity });
    };

    return(
        <div className="featured-el-selector" style={{ transitionDelay: `0.${props.index}s`, transitionDuration: '0.3s', transform: props.isOpen ? 'translateX(0%)' : 'translateX(100%)' }} onClick={() => selectEntity()} >
            <IonTitle color="dark" className="featured-el-title">{props.title}</IonTitle>
            <div className="featured-el-details">
                <IonText className="featured-el-text">{props.actions} Actions</IonText>
                <IonText className="featured-el-text">{props.entity.emissions.length} Posts</IonText>
            </div>
        </div>
    );
};

export default FeaturedLocationEl;