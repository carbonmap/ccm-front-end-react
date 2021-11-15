import React, { useEffect, useState } from 'react';
import DataAccordion from './DataAccordion/DataAccordion';
import EntityActionsList from './BottomViews/EntityActions/EntityActionsList';
import EntityPostsList from './BottomViews/EntityPosts/EntityPostsList';
import EntityCO2 from './BottomViews/EntityCO2/EntityCO2';

interface PageProps {
    emissionsData: {id: string, name: string, emissions: string[]}[];
    entitiesByBusinessType: object[];
}

const EntityEmissionsData:React.FC<PageProps> = (props) => {
    const [graphData, setGraphData] = useState<any>([]);
    const [actionData, setActionData] = useState<any>([]);
    const [postData, setPostData] = useState<any>([]);

    const getEntityData = async() => {
        const emissionResponse = await fetch(`https://raw.githubusercontent.com/aldjonz/ccm-json/main/emission/${props.emissionsData[0].id}.json`);
        const emissionJson = await emissionResponse.json();

        setGraphData(emissionJson.emissions);

        const actionRes = await fetch(`https://raw.githubusercontent.com/aldjonz/ccm-json/main/entity_action/${props.emissionsData[0].id}.json`);
        const actionJson = await actionRes.json();

        setActionData(actionJson.actions);

        const postRes = await fetch(`https://raw.githubusercontent.com/aldjonz/ccm-json/main/entity_post/${props.emissionsData[0].id}.json`);
        const postJson = await postRes.json();

        setPostData(postJson.posts);
    };
    
    useEffect(() => {
        if(props.emissionsData && props.entitiesByBusinessType.length === 0) {
            getEntityData();
        }
    }, []);
    
    return (
        <div>
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

export default EntityEmissionsData;