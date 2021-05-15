import { IonText, IonTitle } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import FeaturedEl from './FeaturedElement/FeaturedLocationEl';
import './featured.css';
import { useFetch } from '../../../../service/hooks/useFetch';

const Featured: React.FC = () => {
    // const [jsonData, setJsonData] = useState<string>();

    // const data = useFetch({
    //     url: "https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/reporting_entities/index.json",
    //     init: {}
    // });

    // console.log(data);

    // useEffect(() => {
    //         console.log(data);
    //         setJsonData(data);
    // },[])

    return (
        <div className="featured-container">
            <IonTitle className="featured-title-main" color="primary">Featured</IonTitle>
            <FeaturedEl 
                title="The Leys School"
                actions={2}
                posts={2}
            />
            <FeaturedEl 
                title="Caius College"
                actions={2}
                posts={2}
            />
            <FeaturedEl 
                title="King's College"
                actions={2}
                posts={2}
            />
        </div>
    );
};
export default Featured;