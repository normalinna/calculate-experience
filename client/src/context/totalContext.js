import {createContext} from 'react';

function noop() {}

export const TotalContext = createContext({
    total: [],
    allExp: noop,
    years: 0,
    months: 0,
    days: 0
});
