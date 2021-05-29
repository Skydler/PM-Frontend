import React from 'react'
import {Link} from 'react-router-dom'

function NotFound(props) {
    return (
        <div>
            <h1>404 Page Not Found</h1>
            <p>{props.reason ? props.reason : ''}</p>

            <Link to='/'>
                <button>Back to home</button>
            </Link>
        </div>
    )
}

export default NotFound
