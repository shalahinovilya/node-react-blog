import React, {useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useCallback, useEffect} from "react";
import Loader from "../components/Loader";
import PostsList from "../components/PostsList";


const PostsPage = () => {

    const [posts, setPosts] = useState(null)
    const {request, loading} = useHttp()

    const getPosts = useCallback(async () => {

        try {
            const data = await request(`/app/posts/get-all-posts/`,
                'GET',
                null,
            )

            setPosts(data)
        } catch (e) {
            console.log(e)
        }

    }, [request])

    useEffect(() => {
        getPosts()
    }, [getPosts])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            <PostsList posts={posts}/>
        </>
    );
};

export default PostsPage;