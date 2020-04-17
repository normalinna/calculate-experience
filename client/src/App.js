import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from "./routes";
import {AuthContext} from './context/authContext';
import {TotalContext} from './context/totalContext';
import {useCalc} from './hooks/calc.hook';
import {useAuth} from './hooks/auth.hook';
import {Preloader} from "./components/Preloader";
import {Header} from "./components/Header";
import { createStore } from 'redux';
import rootReducer from './store/calc/reducer';
import 'materialize-css';

function App() {
    const {token, userId, signIn, logout, load} = useAuth();
    const IsAuthenticated = !!token;
    const routes = useRoutes(IsAuthenticated);
    const {years, months, days, total, sumArray, pushTotal, distribute} = useCalc();

    const store = createStore(rootReducer);
    store.subscribe(() => console.log('store',store.getState()));

    if (!load) {
        return <Preloader/>
    }

  return (
      <AuthContext.Provider value = {{
          token, userId, signIn, logout, IsAuthenticated
      }}>
          <TotalContext.Provider value={{years, months, days, total, sumArray, pushTotal, distribute}}>
              <Router>
                  {IsAuthenticated && <Header/>}
                  <div>
                      <div className="container">
                          {routes}
                      </div>
                  </div>
              </Router>
          </TotalContext.Provider>
      </AuthContext.Provider>
  );
}

export default App;
