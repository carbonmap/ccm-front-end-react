import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IonItem, IonText } from '@ionic/react';

interface PageProps {
    entitiesByBusinessType: any;
}

const BusinessTypeEntities: React.FC<PageProps> = (props) => {

    return (
        <div style={{ height: '100%', marginTop: '4vh', overflow: 'visible' }}>
            <IonText style={{ fontSize: 32, textDecoration: 'underline' }} color="primary" className="ion-text-capitalize ion-margin">{props.entitiesByBusinessType[0].business_type}</IonText>
            {props.entitiesByBusinessType.map((entity:any,index:number) => {
                return (
                    <Link key={index} to={`/${entity.id}`} >
                        <IonItem 
                            className="search-suggestion-el"
                        >{entity.name}</IonItem>
                    </Link>
                )
            })}
        </div>
    );
};

export default BusinessTypeEntities;