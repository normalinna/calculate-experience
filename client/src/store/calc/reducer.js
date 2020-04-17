import { ADD_YEARS, ADD_MONTHS, ADD_DAYS } from '../types';

const initialState = {
    years: [],
    months: [],
    days: [],
};

function rootReducer(state = initialState, action) {

    if (action.type === ADD_YEARS) {
        state.years.push(action.years);

    }
    if (action.type === ADD_MONTHS) {
        state.months.push(action.months);
    }
    if (action.type === ADD_DAYS) {
        state.days.push(action.days);
    }
    return state;
}

export default rootReducer;
