import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from "../context/authContext";

export const Header = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = (e) => {
        e.preventDefault();
        auth.logout();
        history.push("/");
    };

    return (
        <nav className="b-nav">
            <div className="nav-wrapper">
                <a href="/" className="brand-logo right">EXP</a>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li className="b-margin"><NavLink to="/experiences">Список сотрудников</NavLink></li>
                    <li><NavLink to="/calculation">Добавить нового</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
};
