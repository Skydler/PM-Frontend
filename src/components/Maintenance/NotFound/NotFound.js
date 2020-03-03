import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'helpers/context'

function NotFound(props) {
    const { setAuthTokens } = useAuth();

    function handleLogout() {
        setAuthTokens();
    }
    return (
        <div>
            <h1>404 Page Not Found</h1>
            <button onClick={handleLogout}>Logout</button>
            <Link to='/products'>
                <button>Ir a products</button>
            </Link>
        </div>
    )
}

export default NotFound
