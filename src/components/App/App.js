import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import { AuthContext, useAuth } from '../../helpers/context'
import PrivateRoute from '../../routes'
import Register from '../Register';
import Login from '../Login';
import NotFound from '../NotFound'

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
            <Router>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <PrivateRoute path='/products' component={Products} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

function Products(props) {
    const { setAuthTokens } = useAuth();

    function handleLogout() {
        setAuthTokens();
    }
    return (
        <div>
            <h2>hola que hace</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default App;
