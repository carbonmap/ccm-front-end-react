import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IonItem, IonTitle } from '@ionic/react';

interface PageProps {
    entitiesByBusinessType: any;
}

const BusinessTypeEntities: React.FC<PageProps> = (props) => {

    useEffect(() => {
        console.log(props.entitiesByBusinessType[0])
    }, [props.entitiesByBusinessType])
    return (
        <>
            <IonTitle className="ion-text-capitalize">{props.entitiesByBusinessType[0].business_type}</IonTitle>
            {props.entitiesByBusinessType.map((entity:any,index:number) => {
                return (
                    <Link key={index} to={`/${entity.id}`} >
                        <IonItem 
                            className="search-suggestion-el"
                        >{entity.name}</IonItem>
                    </Link>
                )
            })}
        </>
    );
};

export default BusinessTypeEntities;