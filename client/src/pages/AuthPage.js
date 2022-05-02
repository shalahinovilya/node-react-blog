import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} =  useHttp()
    const [form, setForm] = useState({email: '', password: '', username: ''})

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('app/users/auth/register', 'POST', {...form})
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    const logInHandler = async () => {
        try {
            const data = await request('app/users/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Blog</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Card Title</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Ведите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    className="validate"
                                    onChange={changeHandler}
                                />

                                {/*<label htmlFor="Email">First Name</label>*/}
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Ведите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    className="validate"
                                    onChange={changeHandler}
                                />
                                    {/*<label htmlFor="Пароль">Last Name</label>*/}
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Ведите имя пользователя"
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    className="validate"
                                    onChange={changeHandler}
                                />
                                {/*<label htmlFor="Пароль">Last Name</label>*/}
                            </div>


                        </div>
                    </div>

                    <div className="card-action">

                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            onClick={logInHandler}
                            disabled={loading}
                        >
                            Войти
                        </button>

                        <button
                            className="btn blue lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

