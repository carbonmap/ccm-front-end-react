import { IonSpinner, IonText } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import DataAccordion from './DataAccordion/DataAccordion';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import EntityActionsList from './DataAccordion/BottomViews/EntityActions/EntityActionsList';
import EntityPostsList from './DataAccordion/BottomViews/EntityPosts/EntityPostsList';
import { useLocation } from 'react-router';
import Spinner from '../../../../../UI/spinner/spinner';
import EntityCO2 from './DataAccordion/BottomViews/EntityCO2/EntityCO2';
import { fetchIndividualEntity } from 'src/service/fetchURL/individualEntity/fetchIndividualEntity';

interface PageProps {
    isOpen: boolean;
    closeMenu: Function;
    isSearching: boolean;
    isMobile: boolean;
    emissionsData: {id: string, name: string, emissions: string[]}[];
}

const EntityDetails: React.FC<PageProps> = (props) => {
    const [entityDetails, setEntityDetails] = useState<any>();
    const [descHeight, setDescHeight] = useState('8vh');
    const [seeMoreText, setSeeMoreText] = useState("more");
    const [graphData, setGraphData] = useState<any>([]);
    const [actionData, setActionData] = useState<any>([]);
    const [postData, setPostData] = useState<any>([]);

    const isMobile = useSelector( (state: RootState) => state.isMobile);
    const selectedEntity = useSelector((state: RootState) => state.selectedLocation);
    const location = useLocation();

    const dbURl = process.env.REACT_APP_DATABASE_URL;
    const entityId = props.emissionsData[0].id;

    const getEntityData = async() => {
        const emissionJson = await fetchIndividualEntity(`/emission/${entityId}.json`);
        if(emissionJson) {
            setGraphData(emissionJson.emissions);
        };

        const actionJson = await fetchIndividualEntity(`/entity_action/${entityId}.json`);
        if(actionJson) {
            setActionData(actionJson.actions);
        };

        const postJson = await fetchIndividualEntity(`/entity_post/${entityId}.json`);
        if(postJson) {
            setPostData(postJson.posts);
        }
    };

    const getEntityDetails = async() => {
        const data = await fetchIndividualEntity(`/entity_property/${entityId}.json`);
        if(data) {
            setEntityDetails(data);
        };
    };

    const mobileMenuStyle = (
        props.isOpen ? 'translateY(6vh)' : 'translateY(42vh)'
    );
    const desktopMenuStyle = (
        props.isOpen ? 'translateX(0%)' : 'translateX(100%)'
    );

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
        getEntityData();
        getEntityDetails();
    }, []);

    return (
        <div className="entity-details-container" style={{ transform: !isMobile ? desktopMenuStyle : mobileMenuStyle }}>
            {entityDetails ?
                <div>
                    <img 
                        className="entity-img"
                        src={entityDetails.img}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <IonText className="ion-text-capitalize ion-text-left entity-title">{entityDetails.name}</IonText>
                            <IonText className="ion-text-capitalize entity-address">{entityDetails.address}</IonText>
                        </div>
                        <IonText className="ion-text-capitalize entity-business-type">{entityDetails.business_type}</IonText>
                    </div>
                    <br />
                    <div className="entity-desc-container" onClick={() => handleReadMore()}>
                        <div className="entity-desc-text-container" style={{ maxHeight: descHeight, transitionDuration: '2s', marginBottom: '4vh' }}>
                        <IonText className="entity-desc">{entityDetails.desc}</IonText>
                        <div 
                            className="entity-desc-readmore-container" 
                            style={{ bottom: descHeight === "8vh" ? '-2vh' : '-2vh', transitionDuration: '1s', height: descHeight === "8vh" ? '140%' : '0%' }}>
                            <IonText color="primary" className="entity-desc-readmore">See {seeMoreText}...</IonText>
                        </div>
                        </div>
                    </div>
                </div>
            :
                <Spinner />
            }
            <DataAccordion 
                title="CO2e in 2021"
                titleData="24t"
                bottomView={
                    <EntityCO2 
                        graphData={graphData}
                        labels={graphData.map((emission:any) => emission.measure)}
                        data={graphData.map((emission:any) => emission.value)}
                    />
                }
            />
            <DataAccordion 
                title="actions"
                titleData={actionData.length}
                bottomView={
                    <EntityActionsList 
                        actions={actionData}
                    />
                }
            />
            <DataAccordion 
                title="posts"
                titleData={postData.length} 
                bottomView={
                    <EntityPostsList 
                        posts={postData}
                    />
                }
            />
        </div>
    );
};

export default EntityDetails;