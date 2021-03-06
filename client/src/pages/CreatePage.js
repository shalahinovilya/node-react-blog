import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useNavigate} from "react-router-dom";


const CreatePage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({title: '', description: '', picture: ''})
    const {request} = useHttp()
    const auth = useContext(AuthContext)

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const sendData = async () => {

        const formData = new FormData()
        formData.append('img', form.img)
        formData.append('title', form.title)
        formData.append('description', form.description)
        formData.append('author', auth.userId)


        try {
            const data = await request('/app/posts/create-post',  'POST', formData, {})
            navigate(`/detail/${data._id}/`)
        } catch (e) {
            console.log(e)
        }

    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const changePic = event => {
        setForm({...form, [event.target.name]: event.target.files[0]})
    }

    return (
        <div className="row">
            <div className="col s12">

                <div className="input-field col s12">
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className="validate"
                        onChange={changeHandler}
                    />
                        <label htmlFor="title">Title</label>
                </div>

                <div className="input-field col s12">
                    <input id="description"
                           name="description"
                           type="text"
                           className="validate"
                           onChange={changeHandler}
                    />
                        <label htmlFor="description">Description</label>
                </div>

                <div className="file-field input-field col s12" >
                    <div className="btn">
                        <span>File</span>
                        <input
                            type="file"
                            name="img"
                            accept=".jpg"
                            onChange={changePic}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>


                <div className="input-field col s12">
                    <button className="btn waves-effect waves-light"
                            onClick={sendData}
                            name="action">Create Post
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CreatePage;