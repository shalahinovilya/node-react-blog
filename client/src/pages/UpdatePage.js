import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";


const UpdatePage = () => {

    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const location = useLocation();
    console.log(location.state)
    const {_id, title, description, img} = location.state
    const [newForm, setNewForm] = useState({'title': title, 'description': description, 'img': img})

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = (event) => {
        setNewForm({...newForm, [event.target.name]: [event.target.value]})
    }

    const changePic = event => {
        setNewForm({...newForm, [event.target.name]: event.target.files[0]})
    }

    const sendUpdatedData = async () => {

        try {
            const formData = new FormData()
            formData.append('img', newForm.img)
            formData.append('title', newForm.title)
            formData.append('description', newForm.description)
            formData.append('author', auth.userId)

            const data = await request(`/app/posts/update-post/${_id}`,  'PUT', formData, {})
            navigate(`/detail/${data._id}/`)

        } catch (e) {

        }


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
                        value={newForm.title}
                        onChange={changeHandler}
                    />
                    <label htmlFor="title">Title</label>
                </div>

                <div className="input-field col s12">
                    <input id="description"
                           name="description"
                           type="text"
                           className="validate"
                           value={newForm.description}
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
                            <input value={img} className="file-path validate" type="text" placeholder="Choose an image"/>
                        </div>
                </div>


                <div className="input-field col s12">
                    <button className="btn waves-effect waves-light"
                            onClick={sendUpdatedData}
                            name="action">Update Post
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UpdatePage;
