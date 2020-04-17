import { ADD_YEARS, ADD_MONTHS, ADD_DAYS } from "../types";

export function addYears(payload) {
    return { type: ADD_YEARS, payload };
}

export function addMonths(payload) {
    return { type: ADD_MONTHS, payload };
}

export function addDays(payload) {
    return { type: ADD_DAYS, payload };
}
