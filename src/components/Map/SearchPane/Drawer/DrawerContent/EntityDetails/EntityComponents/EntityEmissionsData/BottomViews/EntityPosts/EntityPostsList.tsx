import { IonText } from '@ionic/react';
import React from 'react';
import EntityPost from './EntityPost';

interface PageProps {
    posts: any[]
}

const EntityPostsList: React.FC<PageProps> = (props) => {
    return (
        <>
            {props.posts.length > 0 ?
                <div className="ion-margin-top accordion-post-list">
                    {props.posts.map((post, index) => {
                        return (
                            <EntityPost 
                                key={index}
                                title={post.title}
                                text={post.text}
                                date={post.date}
                            />
                        )
                    })}
                </div>
            :
                <IonText>No posts available</IonText>
            }
        </>
    );
};

export default EntityPostsList;