import React, { useState, useEffect } from 'react';
import './sideMenu.css';
import { IonContent, IonText, IonTitle, IonIcon } from '@ionic/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import Featured from './MenuComponents/Featured/Featured';
import { useFetch } from '../../service/hooks/useFetch';
import Spinner from '../UI/Spinner/Spinner'

interface PageProps {
    urlStr: any;
    setUrlStr: (urlStr: any) => void
}

const SideMenu: React.FC<PageProps> = (props) => {
    const [entityDetails, setEntityDetails] = useState<any>([]);
    const [urlArr, setUrlArr] = useState<any>([]);

    const isOpen = useSelector( (state: RootState) => state.menuOpen);
    const isMobile = useSelector( (state: RootState) => state.isMobile);

    const mobileMenuStyle = (
        isOpen ? 'translateY(6vh)' : 'translateY(42vh)'
    )
    const desktopMenuStyle = (
        isOpen ? 'translateX(0%)' : 'translateX(100%)'
    )

    const data = useFetch("https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/reporting_entities/index.json");
    const entity0 = useFetch("https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/reporting_entities/net.theleys.json");
    // const entityData = useFetch(`https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/reporting_entities/${urlArr[0]}`);

    useEffect(() => {
        console.log(urlArr)
        const handleData = async() => {
            for(let i = 0; i < urlArr.length; i++) {
                const response = await fetch(`https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/reporting_entities/${urlArr[i]}.json`);
                const json = await response.json();
    
                // console.log(json)
                props.setUrlStr(props.urlStr.push(json))
            }

            setTimeout(() => {
                console.log(entityDetails)
            }, 6000);
        }
        if(urlArr.length > 0) {
            // console.log(entityData)
            handleData()
        }

    }, [urlArr])

    useEffect(() => {
        if(data !== null) {
            setUrlArr(data);
        }
    }, [data])

    return (
        <IonContent className="ion-align-self-end side-menu" slot="end" style={{ transform: !isMobile ? desktopMenuStyle : mobileMenuStyle }}>
            <Featured 
                urlStr={props.urlStr}
            />
        </IonContent>
    )
}

export default SideMenu;