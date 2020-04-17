import React, {useState, useEffect, useCallback, useContext} from 'react';
import {TotalContext} from '../context/totalContext';

export const Row = (props) => {
    const operation = useContext(TotalContext);
    const [load, setLoad] = useState(false);
    const [form, setForm] = useState({
        start: '', end: ''
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});

        setLoad(event.target.name === 'end' ? true: false);
    };

    const dateDiff = useCallback((date1, date2) => {

            var years = date2.getFullYear() - date1.getFullYear();
            var months = years * 12 + date2.getMonth() - date1.getMonth();
            var days = date2.getDate() - date1.getDate();

            years -= date2.getMonth() < date1.getMonth();
            months -= date2.getDate() < date1.getDate();
            days += days < 0 ? new Date( date2.getFullYear(), date2.getMonth() - 1, 0 ).getDate() + 1 : 0;

            return [ years, months, days ];

    });

    useEffect(()=> {
        const diff = dateDiff( new Date( form.start ), new Date( form.end ) );

        if (load && new Date( form.end ).getFullYear() > 1950) {
            operation.pushTotal(diff);
            setLoad(false);
        }

    },[form]);

    return (

        <tr>
            <td>{props.index + 1}</td>
            <td>
                <input
                    id="start"
                    type="date"
                    name="start"
                    value={form.start}
                    onChange={changeHandler}
                />
            </td>
            <td>
                <input
                    id="end"
                    type="date"
                    name="end"
                    value={form.end}
                    onChange={changeHandler}
                />
            </td>
        </tr>
    )
};
