import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import { AuthContext } from 'helpers/context'
import CssBaseline from '@material-ui/core/CssBaseline';
import NotFound from 'components/Maintenance/NotFound'
import Register from 'components/Users/Register';
import Login from 'components/Users/Login';
import Home from 'components/Navigation/Home'
import PrivateRoute from 'routes'

function App() {
    // Try to set the tokens if there are
    const tokens = localStorage.getItem('tokens') || sessionStorage.getItem('tokens');
    const [authTokens, setAuthTokens] = useState(tokens);

    function setTokens(data, remember) {
        if (data) {
            sessionStorage.setItem('tokens', JSON.stringify(data));

            if (remember) {
                localStorage.setItem('tokens', JSON.stringify(data));
            }
        } else {
            localStorage.removeItem('tokens');
            sessionStorage.removeItem('tokens');
        }
        setAuthTokens(data);
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <Router basename="/PM-Frontend">
                <CssBaseline />
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <PrivateRoute path='/home' component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
