import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";


const DetailPage = () => {

    const [post, setPost] = useState(null)
    const postId = useParams().id
    const {request, loading} = useHttp()

    const getPost = useCallback(async () => {

        try {
            const data = await request(`/app/posts/get-post/${postId}`,
                'GET',
                null,
                )
            setPost(data)
        } catch (e) {
            console.log(e)
        }

    }, [postId, request])

    useEffect(() => {
        getPost()
    }, [getPost])

    if (loading) {
        return <Loader/>
    }

    return (
        <div>
            {!loading && post && <PostCard post={post}/>}
        </div>
    );
};

export default DetailPage;