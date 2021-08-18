import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button, Container } from "@material-ui/core";
import "./index.css";

function HomeScreen() {
  const { path } = useRouteMatch();

  return (
    <Container maxWidth="sm" className="container">
      <div className="heading-container">
        <h1 className="home-title">Home page</h1>
      </div>
      <div className="home-body">
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to={`${path}products`}
        >
          Go to products
        </Button>

        <Button
          color="primary"
          variant="contained"
          component={Link}
          to={`${path}subproducts`}
        >
          Go to subproducts
        </Button>

        <Button
          color="primary"
          variant="contained"
          component={Link}
          to={`${path}packaging`}
        >
          Go to packaging
        </Button>
      </div>
      <div className="home-body">
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to={`${path}sales`}
        >
          Go to sales
        </Button>
      </div>
    </Container>
  );
}

export default HomeScreen;
