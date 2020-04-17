import  React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';
import {CalculationPage} from "./pages/CalculationPage";
import {AuthPage} from "./pages/AuthPage";
import {ExperiencesPage} from "./pages/ExperiencesPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path="/experiences" exact>
                    <ExperiencesPage/>
                </Route>
                <Route path="/calculation" exact>
                    <CalculationPage/>
                </Route>
                <Redirect to="/experiences"/>
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
                <Redirect to="/"/>
            </Route>
        </Switch>
    )
};
