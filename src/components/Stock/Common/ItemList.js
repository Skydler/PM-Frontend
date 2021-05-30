import React, {useState, useEffect, useContext} from 'react'

import {Switch, Route, useRouteMatch, useLocation} from 'react-router-dom'

import ItemTableScreen from './Screens/ItemTableScreen/ItemTableScreen'
import ItemRow from './Screens/ItemTableScreen/ItemRow'
import {UserContext} from 'hooks/userContext'


function ItemList(props) {
    const [rows, setRows] = useState();
    const [loading, setLoading] = useState(true);
    const {path} = useRouteMatch();
    const location = useLocation();
    const user = useContext(UserContext);

    const getItems = props.getter;
    const pathname = props.pathname;
    const createComponent = props.createComp;
    const detailComponent = props.detailComp;

    useEffect(() => {
        // pathname must be checked because this function is executed
        // from inside an item detail (cause of route below)
        //
        // user mustn't be undefined to prevent from repeating querys
        // to get the current user
        if (location.pathname === pathname && user !== undefined) {
            getItems(user).then(items => {
                const itemRows = items.map(item =>
                    <ItemRow key={item.id} item={item} />
                );
                setRows(itemRows);
                setLoading(false);
            })
        }
    }, [location, user])

    return (
        <Switch>
            <Route exact path={path} render={() => <ItemTableScreen rows={rows} title={props.title} loading={loading} />} />
            <Route path={`${path}/create`} component={createComponent} />
            <Route path={`${path}/:itemID`} component={detailComponent} />
        </Switch>
    );
}

export default ItemList;

