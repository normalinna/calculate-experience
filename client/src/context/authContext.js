import {createContext} from 'react';

function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    signIn: noop,
    logout: noop,
    isAuthenticated: false
});
