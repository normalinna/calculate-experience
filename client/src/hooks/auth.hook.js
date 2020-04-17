import {useCallback, useState, useEffect} from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [load, setLoad] = useState(false);

    const signIn = useCallback((id, token) => {
        setToken(token);
        setUserId(id);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem('userData');
    }, []);

    useEffect(()=> {
        let userData = JSON.parse(localStorage.getItem('userData'));

        if (userData) {
            signIn(userData.token, userData.userId);
        }

        setLoad(true);
    }, [signIn]);

    return { load, token, userId, signIn, logout };
};
