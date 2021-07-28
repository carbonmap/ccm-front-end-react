import React from "react";
import {IonHeader, IonText} from "@ionic/react";
import Toolbar from "../toolbar";
import "./ErrorBoundary.css";


interface IErrorBoundaryProps {
    children: React.ReactNode[];
}

interface IErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
    IErrorBoundaryProps,
    IErrorBoundaryState
    > {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        this.setState({ hasError: true });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <>
                    <IonHeader>
                       <Toolbar />
                    </IonHeader>
                    <div className="ErrorBoundary text-center">
                        <IonText color='danger'></IonText>
                        <h3>There is something wrong, we are working on it</h3>
                    </div>
                </>
            )


            ;
        }
        return this.props.children;
    }
}