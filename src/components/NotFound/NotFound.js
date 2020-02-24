import React from 'react'
import { Link } from 'react-router-dom'

function NotFound(props) {
    return (
        <div>
            <h1>404 Page Not Found</h1>
            <Link to='/login'>
                <button>Ir a inicio de sesión</button>
            </Link>
        </div>
    )
}

export default NotFound
