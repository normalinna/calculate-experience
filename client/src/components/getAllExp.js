import React, {useContext, useEffect, useState, useCallback} from 'react';
import {TotalContext} from '../context/totalContext';
import {createStore} from "redux";
import rootReducer from "../store/calc/reducer";

export const GetAllExp = (props) => {

    const [allYears, setAllYears ] = useState([]);
    const [allMonths, setAllMonths ] = useState([]);
    const [allDays, setAllDays ] = useState([]);
    const [all, setAll ] = useState({ y: 0, m: 0, d: 0});

    const store = createStore(rootReducer);
    // store.subscribe(() => console.log('store',store.getState()));

    const operation = useContext(TotalContext);

    const addYears = (years)=> {
        if (years!== 0) {
            store.dispatch({
                type: 'ADD_YEARS',
                years
            })
        }};
    const addMonths = (months)=> {
        if (months!== 0) {
            store.dispatch({
                type: 'ADD_MONTHS',
                months
            })
        }};
    const addDays = (days)=> {
        if (days!== 0) {
            store.dispatch({
                type: 'ADD_DAYS',
                days
            })
        }};

    useEffect(()=>{
        if (operation.years !== 0) {
            addYears(operation.years);
            setAllYears({
                ...store.getState().years
            });
        }
        if (operation.months !== 0) {
            addMonths(operation.months);
            setAllMonths({
                ...store.getState().months
            });
        }
        if (operation.days !== 0) {
            addDays(operation.days);
            setAllDays({
                ...store.getState().days
            });
        }
    }, [operation.years, operation.months, operation.days]);

    const onCalculation = useCallback(() => {
        const y = operation.sumArray(allYears);
        const m = operation.sumArray(allMonths);
        const d =  operation.sumArray(allDays);

        const res = operation.distribute({y, m,d});
        setAll({...all, y: res.y, m: res.m, d: res.d});
        props.getData({y: res.y, m: res.m, d: res.d});
    }, [allYears, allMonths, allDays]);

    return(
        <div>
            <div className="col s3">
                <button onClick={onCalculation} className="waves-effect waves-light btn">Рассчитать</button>
            </div>
            <div className="row">
                <div className="col s6">
                    <div>
                        <p>years: {operation.years !== 0 && operation.years} </p>
                        <p>months: {operation.months !== 0 && operation.months} </p>
                        <p>days: {operation.days !==0 && operation.days} </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

