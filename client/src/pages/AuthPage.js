import React, {useEffect,useState, useContext} from 'react';
import {AuthContext} from "../context/authContext";
import M from "materialize-css";
import {Anim} from '../components/Anim';
import {useRequest} from "../hooks/request.hook";
import {useMessage} from "../hooks/message.hook";

export const AuthPage = () => {
    const {error,request,clearError} = useRequest();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    },[error,message, clearError]);

    useEffect(()=>{
        let tabs = document.querySelectorAll(".tabs");
        M.Tabs.init(tabs);
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    const onSendLoginForm = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            localStorage.setItem("userData", JSON.stringify({
                id: data.userId, token: data.token
            }));

            auth.signIn( data.userId, data.token);
        } catch (e) {

        }
    };

    const onSendRegisterForm = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {

        }
    };

    return(
        <div className="row">
            <div className="col s12 offset-s3">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s3"><a className="active" href="#login">Login form</a></li>
                        <li className="tab col s3"><a href="#register">Register form</a></li>
                    </ul>
                </div>

                <div id="login" className="col s12 center-align">
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card blue-grey lighten-1">
                                <div className="card-content white-text">
                                    <span className="card-title">Login form</span>
                                    <input placeholder="Введите email"
                                           id="email"
                                           type="text"
                                           name="email"
                                           value={form.email}
                                           className="white-input"
                                           onChange={changeHandler}
                                    />
                                    <input placeholder="Введите пароль"
                                           id="password"
                                           type="password"
                                           name="password"
                                           value={form.password}
                                           className="white-input"
                                           onChange={changeHandler}
                                    />
                                </div>
                                <div className="card-action">
                                    <button
                                        className="waves-effect btn red lighten-1 white-text"
                                        style={{marginRight: 20}}
                                        onClick={onSendLoginForm}
                                    >
                                        Войти
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="register" className="col s12 center-align">
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card blue-grey lighten-1">
                                <div className="card-content white-text">
                                    <span className="card-title">Register form</span>
                                    <input placeholder="Введите email"
                                           id="email"
                                           type="text"
                                           name="email"
                                           value={form.email}
                                           className="white-input"
                                           onChange={changeHandler}
                                    />
                                    <input placeholder="Введите имя и фамилмю"
                                           id="nickname"
                                           type="text"
                                           name="nickname"
                                           value={form.nickname}
                                           className="white-input"
                                           onChange={changeHandler}
                                    />
                                    <input placeholder="Введите пароль"
                                           id="password"
                                           type="password"
                                           name="password"
                                           value={form.password}
                                           className="white-input"
                                           onChange={changeHandler}
                                    />
                                </div>
                                <div className="card-action">
                                    <button
                                        className="waves-effect btn red lighten-1 white-text"
                                        onClick={onSendRegisterForm}
                                    >
                                        Зарегистрироваться
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col s12 center">
                <Anim/>
            </div>
        </div>
    )
};
