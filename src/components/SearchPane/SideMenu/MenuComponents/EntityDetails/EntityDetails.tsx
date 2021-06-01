import { IonText, IonTitle } from '@ionic/react';
import React from 'react';
import DataAccordion from './DataAccordion/DataAccordion';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducers';
import EntityActionsList from './DataAccordion/BottomViews/EntityActions/EntityActionsList';
import EntityPostsList from './DataAccordion/BottomViews/EntityPosts/EntityPostsList';

interface PageProps {

}

const EntityDetails: React.FC<PageProps> = (props) => {

    const selectedEntity = useSelector((state: RootState) => state.selectedLocation);

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

    return (
        <div className="ion-padding">
            <>
                <img 
                    src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80"
                />
                <IonTitle className="ion-text-left">{selectedEntity.name}</IonTitle>
                <IonText>15 Market Hill, Cambridge</IonText>
                <DataAccordion 
                    title="CO2e in 2020"
                    titleData="24t"
                    bottomView={<IonText>Hello</IonText>}
                />
                <DataAccordion 
                    title="actions"
                    titleData="2"
                    bottomView={actions}
                />
                <DataAccordion 
                    title="posts"
                    titleData={selectedEntity.emissions.length}
                    bottomView={posts}
                />
            </>
        </div>
    );
};

export default EntityDetails;