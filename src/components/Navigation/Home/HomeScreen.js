import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'

function HomeScreen() {
    const {path} = useRouteMatch()

    return (
        <div>
            <h1>Home page</h1>
            <Link to={`${path}/products`}>
                <button>Go to products</button>
            </Link>
            <Link to={`${path}/subproducts`}>
                <button>Go to subproducts</button>
            </Link>
        </div>
    )
}

export default HomeScreen
