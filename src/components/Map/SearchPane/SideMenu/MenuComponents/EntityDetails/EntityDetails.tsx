import { IonText, IonIcon, IonTitle } from '@ionic/react';
import React, { useState, useEffect }  from 'react';
import DataAccordion from './DataAccordion/DataAccordion';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reducers';
import EntityActionsList from './DataAccordion/BottomViews/EntityActions/EntityActionsList';
import EntityPostsList from './DataAccordion/BottomViews/EntityPosts/EntityPostsList';
import { useLocation } from 'react-router';
import Spinner from '../../../../../UI/spinner/spinner';

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

    const location = useLocation();
    const isMobile = useSelector( (state: RootState) => state.isMobile);
    const selectedEntity = useSelector((state: RootState) => state.selectedLocation);

    const getEntityDetails = async() => {
        const response = await fetch("https://raw.githubusercontent.com/aldjonz/ccm-json/main/entity_property.json");
        const data = await response.json();
        
        const urlId = location.pathname.substring(1, location.pathname.length);
        const filterData = data.entity_property.find((entity:any) => entity.id === urlId);
        setEntityDetails(filterData);
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
        getEntityDetails();
    }, []);

    return (
        <div className="entity-details-container" style={{ transform: !isMobile ? desktopMenuStyle : mobileMenuStyle }}>
            {entityDetails ?
                <div>
                    <img 
                        src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80"
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <IonTitle className="ion-text-capitalize ion-no-padding ion-text-left entity-details-title">{entityDetails.name}</IonTitle>
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
                titleData={props.emissionsData[0].emissions.length.toString()} 
                bottomView={posts}
            />
        </div>
    );
};

export default EntityDetails;