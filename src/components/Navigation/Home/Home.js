import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { getUser } from "services/currentUser";
import { UserContext } from "hooks/userContext";
import HomeScreen from "./HomeScreen";

import Sales from "components/Sales";
import TopBar from "components/Navigation/TopBar";
import ProductList from "components/Stock/Product";
import SubProductList from "components/Stock/Subproduct";
import PackagingObjectList from "components/Stock/PackagingObject";

function Home() {
  const [user, setUser] = useState();
  const { path } = useRouteMatch();

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      <UserContext.Provider value={user}>
        <TopBar></TopBar>
        <Switch>
          <Route exact path={path} component={HomeScreen} />
          <Route path={`${path}products`} component={ProductList} />
          <Route path={`${path}subproducts`} component={SubProductList} />
          <Route path={`${path}packaging`} component={PackagingObjectList} />
          <Route path={`${path}sales`} component={Sales} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default Home;
