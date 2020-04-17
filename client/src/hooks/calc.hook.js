import React, {useCallback, useState} from 'react';

export const useCalc = () => {

    const [total, setTotal] = useState({});
    const [years, setYears] = useState(0);
    const [months, setMonth] = useState(0);
    const [days, setDays] = useState(0);

    const pushTotal = useCallback((el) => {

        let y = el[0];
        let m = el[1];
        let d = el[2];

        setYears(years + y); setMonth(months + proMonth(m)); setDays(days + d);

        setTotal({...total, el});

    }, []);

    const proMonth = useCallback((m) => {
        const k = Math.ceil(m / 12) - 1;
        const diff = m - (k * 12);
        const res = diff < 0 ? diff * (-1) : diff;
        return res;
    },[]);

    const sumArray = useCallback((obj) => {
        let sum = 0;
        for (let key in obj) {
            sum += obj[key];
        }
        return sum;
    }, []);

    const distribute = useCallback((obj = {})=> {
        let d = obj.d;
        let m = obj.m;
        let y = obj.y;
        if( d===0 && m===0 && y===0) {
            return;
        }

        let w = d;
        d = d > 31 ? d - (Math.ceil(d/31) - 1) * 31 : d;
        m += (Math.ceil(w / 31) - 1);

        let r = m;
        m = m > 12 ? m - (Math.ceil(m / 12) - 1) * 12 : m;

        y =  Math.ceil(r / 12) > 1 ? y + (Math.ceil(r / 12) - 1) : y;

        const new_obj = { ...obj, y: y, m: m, d: d};

        return new_obj;
    },[]);
    return { years, months, days, total, sumArray, pushTotal, distribute };
};
