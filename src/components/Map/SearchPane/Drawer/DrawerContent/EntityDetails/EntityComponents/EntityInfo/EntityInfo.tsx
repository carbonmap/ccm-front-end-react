import { IonText } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Spinner from 'src/components/UI/spinner/spinner';
import { Link } from 'react-router-dom';

interface PageProps {
    emissionsData: {id: string, name: string, emissions: string[]}[];
    entitiesByBusinessType: object[];
    isEmpty: boolean;
}
const EntityInfo: React.FC<PageProps> = (props) => {
    const [entityDetails, setEntityDetails] = useState<any>();
    const [descHeight, setDescHeight] = useState('8vh');
    const [seeMoreText, setSeeMoreText] = useState("more");

    const getEntityDetails = async() => {
        const response = await fetch(`https://raw.githubusercontent.com/aldjonz/ccm-json/main/entity_property/${props.emissionsData[0].id}.json`);
        const data = await response.json();

        setEntityDetails(data);
    };

    const handleReadMore = () => {
        if(descHeight !== '100vh') {
            setDescHeight('100vh');
            setSeeMoreText("less");
        } else {
            setDescHeight('8vh');
            setSeeMoreText("more");
        }
    };

    useEffect(() => {
        if(props.isEmpty) {
            setDescHeight('100vh');
        }
    }, [props.isEmpty])
    
    useEffect(() => {
        if(props.emissionsData && props.entitiesByBusinessType.length === 0) {
            getEntityDetails();
        };
    }, []);
    return (
        <div>
            {entityDetails ?
                <div>
                    <div className="entity-identification-details" >
                        <img 
                            className="entity-img"
                            src={entityDetails.img}
                        />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <IonText className="ion-text-capitalize ion-text-left entity-title">{entityDetails.name}</IonText>
                                <IonText className="ion-text-capitalize entity-address">{entityDetails.address}</IonText>
                            </div>
                            <Link to={`/business-type/${entityDetails.business_type}`}>
                                <IonText className="ion-text-capitalize entity-business-type">{entityDetails.business_type}</IonText>
                            </Link>
                        </div>
                    </div>
                    <br />
                    <div className="entity-desc-container" onClick={() => handleReadMore()}>
                        <div className="entity-desc-text-container" style={{ maxHeight: descHeight, transitionDuration: '2s', marginBottom: '4vh' }}>
                        <IonText className="entity-desc">{entityDetails.desc}</IonText>
                        <div 
                            className="entity-desc-readmore-container" 
                            style={{ bottom: descHeight === "8vh" ? '-2vh' : '-2vh', transitionDuration: '1s', height: descHeight === "8vh" ? '140%' : '0%' }}
                        >
                            {props.isEmpty ?
                                null
                            :
                                <IonText color="primary" className="entity-desc-readmore">See {seeMoreText}...</IonText>
                            }
                        </div>
                        </div>
                    </div>
                </div>
            :
                <Spinner />}
        </div>
    );
};

export default EntityInfo;