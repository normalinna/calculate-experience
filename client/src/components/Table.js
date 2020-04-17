import React, {useState, useEffect, useContext} from 'react';
import {GetAllExp} from '../components/getAllExp';
import {useMessage} from "../hooks/message.hook";
import {useRequest} from "../hooks/request.hook";
import {AuthContext} from "../context/authContext";
import {useHistory} from "react-router-dom"

export const Table = (props) => {
    const history = useHistory();
    const message = useMessage();
    const auth = useContext(AuthContext);
    const {error,request,clearError} = useRequest();
    const [name, setName] = useState('');
    const [experience, setExperience] = useState({});

    const changeHandler = event => {
        setName(event.target.value);
    };

    useEffect(() => {
        message(error);
        clearError();
    },[error,message, clearError]);

    const onUpdateData = (value ={}) => {
        setExperience({...experience, y: value.y, m: value.m, d: value.d});
    };

    const fetchData = async ()=> {
        if (!name || experience === {}) {
            message("Заполните все поля");
            return;
        }
        const exp = `${experience.d} д. ${experience.m} м. ${experience.y} г.`;

        try {
            const data = await request('/api/send/calculation', 'POST', {name, exp},  {
                Authorization: `Bearer ${auth.token}`
            });

            if (data.people) {
                history.push("/experiences");
            }
        } catch (e) {

        }
    };

    return(
        <div>
            <div className="row">
                <div className="col s6">
                    <table>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Дата приема на работу</th>
                            <th>Дата увольнения</th>
                        </tr>
                        </thead>

                        <tbody>
                        {props.children}
                        </tbody>
                    </table>
                    <span className="b-button b-left"
                          onClick={ props.minusChild }><span> - </span>
                    </span>
                    <span className="b-button b-right"
                          onClick={ props.addChild }><span> + </span>
                    </span>
                </div>


                <div className="col s3 right" style={{marginTop: '1rem'}}>
                    <span className="card-title">ФИО</span>
                    <input placeholder="Введите ФИО"
                           id="name"
                           type="text"
                           name="name"
                           value={name}
                           className="white-input"
                           onChange={changeHandler}
                    />
                    <div className="col s3">
                        <button onClick={fetchData} className="waves-effect waves-light btn">Сохранить</button>
                    </div>
                </div>

                <div className="col s3 right" style={{marginTop: '1rem'}}>
                    <span>Подсчитаный стаж: <br/>
                        {experience.d && <p> {experience.d} дней</p> }
                        {experience.m && <p> {experience.m} месяцев</p> }
                        {experience.y && <p> {experience.y} год</p> }
                    </span>
                </div>
            </div>

            <div className="row">
                <div className="col s3">
                    <button onClick={ props.clearChild } className="waves-effect waves-light btn">Сбросить</button>
                </div>
            </div>

            <GetAllExp getData = {onUpdateData}/>
        </div>
    )
};
