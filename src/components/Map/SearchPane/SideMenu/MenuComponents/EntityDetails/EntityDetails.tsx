import { IonText } from '@ionic/react';
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

    const isMobile = useSelector( (state: RootState) => state.isMobile);
    const selectedEntity = useSelector((state: RootState) => state.selectedLocation);

    const getEmissionsData = async() => {
        const response = await fetch('https://raw.githubusercontent.com/aldjonz/ccm-json/main/emission.json');
        const data = await response.json();

        const entityData = data.emission.find((emission:any) => emission.entity_id === props.emissionsData[0].id);

        setGraphData(entityData.emissions)
    };

    const actions = (
        <EntityActionsList 
            actions={["Green Tariff", "Reduce Food Waste"]}
        />
    );
    const posts = (
        <EntityPostsList 
            posts={[
                {
                    title: "Getting Started",
                    text: "It's 20221 and time we took our carbon footprint seriously. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    date: "1 April 2021"
                },
                {
                    title: "Food Waste",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet sit amet cursus sit amet. Consequat nisl vel pretium lectus quam id leo in vitae. Diam maecenas sed enim ut sem viverra. Aliquam faucibus purus in massa tempor nec feugiat nisl pretium. Aenean et tortor at risus viverra adipiscing at in. Auctor augue mauris augue neque gravida in. Bibendum enim facilisis gravida neque.",
                    date: "5 April 2021"
                },
                {
                    title: "Develop a decarbonisation plan",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet sit amet cursus sit amet. Consequat nisl vel pretium lectus quam id leo in vitae. Diam maecenas sed enim ut sem viverra. Aliquam faucibus purus in massa tempor nec feugiat nisl pretium. Aenean et tortor at risus viverra adipiscing at in. Auctor augue mauris augue neque gravida in. Bibendum enim facilisis gravida neque.",
                    date: "14 May 2021"
                },
            ]}
        />
    );

    const mobileMenuStyle = (
        props.isOpen ? 'translateY(6vh)' : 'translateY(42vh)'
    );
    const desktopMenuStyle = (
        props.isOpen ? 'translateX(0%)' : 'translateX(100%)'
    );

    useEffect(() => {
        getEmissionsData();
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
                title="CO2e in 2020"
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
                titleData="2"
                bottomView={actions}
            />
            <DataAccordion 
                title="posts"
                titleData={props.emissionsData[0].emissions.length.toString()} 
                bottomView={posts}
            />
        </div>
    );
};

export default EntityDetails;