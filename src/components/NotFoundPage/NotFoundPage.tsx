import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../assets/images/sample.png';
import Toolbar from "../toolbar";
import {IonHeader} from "@ionic/react";


const NotFoundPage: React.FC = () => {

        return <>
            <IonHeader>
                <Toolbar />
            </IonHeader>
            {/*<img src={PageNotFound}  />*/}
            {/*<p style={{textAlign:"center"}}>*/}
            {/*    <Link to="/">Go to Home </Link>*/}
            {/*</p>*/}


        </>



}
export default NotFoundPage;