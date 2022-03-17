import { IonText } from '@ionic/react';
import React from 'react';

interface PageProps {
    actions: any[]
}

const EntityActionsList: React.FC<PageProps> = (props) => {
    return (
        <>
            {props.actions.length > 0 ?
                <ul className="ion-margin-top">
                    {
                        props.actions.map((action, index) => {
                            return (
                              <a
                                href={action.link}
                                target="_blank"
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  textDecoration: "none",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src="/assets/icon/actionIcons/green-energy-supplier.png"
                                  style={{
                                    width: 40,
                                    height: 40,
                                    marginRight: 8,
                                  }}
                                />
                                <p>{action.title}</p>
                              </a>
                            );
                        })
                    }
                </ul>
            :
                <IonText>No actions available</IonText>
            }
        </>
    );
};

export default EntityActionsList;