import React, {useState, useEffect} from 'react'

import {Switch, Route, useRouteMatch, useLocation} from 'react-router-dom'

import ItemTableScreen from './Screens/ItemTableScreen/ItemTableScreen'
import ItemRow from './Screens/ItemTableScreen/ItemRow'


function ItemList(props) {
    const [rows, setRows] = useState();
    const [loading, setLoading] = useState(true);
    const {path} = useRouteMatch();
    const location = useLocation();

    const getItems = props.getter;
    const pathname = props.pathname;
    const createComponent = props.createComp;
    const detailComponent = props.detailComp;

    useEffect(() => {
        if (location.pathname == pathname) {
            getItems().then(items => {
                const itemRows = items.map(item =>
                    <ItemRow key={item.id} item={item} />
                );
                setRows(itemRows);
                setLoading(false);
            })
        }
    }, [location])

    return (
        <Switch>
            <Route exact path={path} render={() => <ItemTableScreen rows={rows} title={props.title} loading={loading} />} />
            <Route path={`${path}/create`} component={createComponent} />
            <Route path={`${path}/:itemID`} component={detailComponent} />
        </Switch>
    );
}

export default ItemList;

