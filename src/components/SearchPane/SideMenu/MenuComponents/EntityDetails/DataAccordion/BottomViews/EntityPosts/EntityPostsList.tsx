import React from 'react';
import EntityPost from './EntityPost';

interface PageProps {
    posts: any[]
}

const EntityPostsList: React.FC<PageProps> = (props) => {
    return (
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
    );
};

export default EntityPostsList;