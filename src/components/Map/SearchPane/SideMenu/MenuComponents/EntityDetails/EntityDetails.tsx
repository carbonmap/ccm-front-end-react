import { IonSpinner, IonText } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import DataAccordion from './DataAccordion/DataAccordion';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reducers';
import EntityActionsList from './DataAccordion/BottomViews/EntityActions/EntityActionsList';
import EntityPostsList from './DataAccordion/BottomViews/EntityPosts/EntityPostsList';
import EntityCO2 from './DataAccordion/BottomViews/EntityCO2/EntityCO2';

interface PageProps {
    isOpen: boolean;
    closeMenu: Function;
    isSearching: boolean;
    isMobile: boolean;
    emissionsData: {id: string, name: string, emissions: string[]}[];
}

const EntityDetails: React.FC<PageProps> = (props) => {
    const [graphData, setGraphData] = useState<any>([]);
    const [actionData, setActionData] = useState<any>([]);
    const [postData, setPostData] = useState<any>([]);

    const isMobile = useSelector( (state: RootState) => state.isMobile);
    const selectedEntity = useSelector((state: RootState) => state.selectedLocation);

    const getEntityData = async() => {
        const emissionResponse = await fetch('https://raw.githubusercontent.com/aldjonz/ccm-json/main/emission.json');
        const emissionJson = await emissionResponse.json();

        const entityEmissionData = emissionJson.emission.find((emission:any) => emission.entity_id === props.emissionsData[0].id);
        setGraphData(entityEmissionData.emissions);

        const actionRes = await fetch('https://raw.githubusercontent.com/aldjonz/ccm-json/main/entity_action.json');
        const actionJson = await actionRes.json();

        const entityActionData = actionJson.action.find((action:any) => action.entity_id === props.emissionsData[0].id);
        setActionData(entityActionData.actions);

        const postRes = await fetch('https://raw.githubusercontent.com/aldjonz/ccm-json/main/entity_post.json');
        const postJson = await postRes.json();

        const entityPostData = postJson.post.find((post:any) => post.entity_id === props.emissionsData[0].id);
        setPostData(entityPostData.posts);
    };

    const mobileMenuStyle = (
        props.isOpen ? 'translateY(6vh)' : 'translateY(42vh)'
    );
    const desktopMenuStyle = (
        props.isOpen ? 'translateX(0%)' : 'translateX(100%)'
    );

    useEffect(() => {
        getEntityData();
    }, [])

    return (
        <div className="entity-details-container" style={{ transform: !isMobile ? desktopMenuStyle : mobileMenuStyle }}>
            <img 
                src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80"
            />
            <IonText className="ion-no-padding ion-text-left">{props.emissionsData[0].name}</IonText>
            <br />
            <IonText>15 Market Hill, Cambridge</IonText>
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