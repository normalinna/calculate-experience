import React, {useContext, useEffect, useState, useCallback} from 'react';
import {useMessage} from "../hooks/message.hook";
import {useRequest} from "../hooks/request.hook";
import {AuthContext} from "../context/authContext";
import {Preloader} from "../components/Preloader";
import {ItemPeople} from "../components/ItemPeople";

export const ExperiencesPage = () => {
    const [peoples, setPeoples] = useState([]);
    const [activeHistory, setActiveHistory] = useState(null);
    const message = useMessage();
    const {token} = useContext(AuthContext);
    const {error,request,clearError} = useRequest();

    useEffect(() => {
        message(error);
        clearError();
    },[error,message, clearError]);


    const openItem = (id) => {
        setActiveHistory(id);
    };

    const fetchPeoples = useCallback(async () => {
        try {
            const data = await request('/api/send/peoples', 'GET', null, {
                Authorization: `Bearer ${token}`
            });

            setPeoples(data);
        } catch (e) {}
    },[token, request]);

    useEffect( ()=>{
        fetchPeoples();
    }, [fetchPeoples]);


    if (!peoples.length) {
        return  <Preloader />
    }

    return(
        <div className="row">
            <div className="col s6">
                <ul className="collection">
                    {peoples.map((people, index) => {
                        return(
                            <li key={people._id} className="collection-item" onClick={()=> {openItem(people._id)}}>{index + 1}. {people.name} </li>
                        )
                    })}
                </ul>
            </div>
            {peoples.map((people)=> {
                return(
                    activeHistory === people._id &&
                    <ItemPeople key={people._id} name={people.name} experience={people.experience} date={people.date}/>
                );
            })}
        </div>
    )
};
