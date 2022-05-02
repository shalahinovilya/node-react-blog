import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {Image} from "react-bootstrap";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import Axios from "axios";
import {useHttp} from "../hooks/http.hook";

const PostCard = ({post}) => {

    const {userId, token} = useContext(AuthContext)
    const {request, loading} = useHttp()

    const deletePost = async () => {
        try {

            const delRequest = request(
                `app/posts/delete-post/${post._id}`,
                'DELETE',
                null
            )
            // const formData = new FormData()
            // formData.append('img', post.img)
            // formData.append('title', post.title)
            // formData.append('description', post.description)
            // formData.append('postId', post._id)
            // formData.append('token', token)
            // formData.append('userId', userId)
            //

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="row">
            <div className="col s12 m7">
                <div className="card">
                    <div className="card-image">
                        <img src={require(`../static/${post.img}`)}/>
                            <span className="card-title">{post.title}</span>
                    </div>
                    <div className="card-content">
                        <p>{post.description}</p>
                    </div>
                    <div className="card-action">

                        <Link key={post._id} to={`/detail/${post._id}`} className="material-icons left">This is a link</Link>

                        {userId && post.author && userId === post.author && <NavLink to='posts'
                                                                                     className="waves-effect waves-light red btn material-icons right"
                                                                                     onClick={deletePost}> delete
                            post </NavLink>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;