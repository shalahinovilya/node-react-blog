import React from 'react';
import PostCard from "../components/PostCard";

const PostsList = ({posts}) => {
    if (!posts) {
        return (
            <h1>No posts</h1>
        )
    }
    return (
        <div>
            {posts.map((post) => {
                return (
                <PostCard post={post}/>
                )
            })}
        </div>
    );
};

export default PostsList;