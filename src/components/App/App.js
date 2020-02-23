import React, { useState } from 'react';
import Login from '../Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import PrivateRoute from '../../routes'
import { AuthContext, useAuth } from '../../helpers/context'

function App() {
    // Try to set the tokens if there are
    const tokens = localStorage.getItem('tokens');
    const [authTokens, setAuthTokens] = useState(tokens);

    function setTokens(data, remember) {
        if (data) {
            if (remember) {
                localStorage.setItem('tokens', JSON.stringify(data));
            }
        } else {
            localStorage.removeItem('tokens');
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

function Register(props) {
    return <h2>Termino esto y me hago un cafecito con tostada</h2>
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

function NotFound(props) {
    return (
        <div>
            <h1>404 Page Not Found</h1>
            <Link to='/'>
                <button>Ir a casa</button>
            </Link>
        </div>
    )
}

export default App;
