import React, {Children} from 'react';
import {IonText } from "@ionic/react";
import {ErrorBoundary} from 'react-error-boundary';

interface ErrorProps {
    error: any
}

const Message: React.FC<ErrorProps> = (props) => {

    return <>

        {/*<img src={PageNotFound}  />*/}
        {/*<p style={{textAlign:"center"}}>*/}
        {/*    <Link to="/">Go to Home </Link>*/}
        {/*</p>*/}
        <IonText color='danger'></IonText>
        {/*<button onClick={resetErrorBoundary}>Try again</button>*/}


    </>



}
export default Message;