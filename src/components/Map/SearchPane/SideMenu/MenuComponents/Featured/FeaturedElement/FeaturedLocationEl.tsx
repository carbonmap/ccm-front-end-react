import { IonContent, IonText } from '@ionic/react';
import React from 'react';
import { useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface PageProps {
    title: string;
    actions: number; 
    posts: number; 
    index: number;
    entity: any;
    openMenu: Function
}

const FeaturedLocationEl: React.FC<PageProps> = (props) => { 
    const dispatch = useDispatch();

    const selectEntity = () => {
        props.openMenu();
        dispatch({ type: 'SET_LOCATION', payload: props.entity });
    };

    return(
        <Link to={`/${props.entity.id}`} >
            <div className="featured-el-selector" onClick={() => selectEntity()} >
                <IonText className="featured-el-title" color="dark" >{props.title}</IonText>
                <div className="featured-el-details">
                    <IonText className="featured-el-text">{props.actions} Actions</IonText>
                    <IonText className="featured-el-text">{props.entity.emissions.length} Posts</IonText>
                </div>
            </div>
        </Link>
    );
};

export default FeaturedLocationEl;