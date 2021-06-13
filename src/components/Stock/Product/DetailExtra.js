import React, { useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListSubheader,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { deleteComposition, getProductComponents } from "services/products";

import AddSubproductDialog from "./AddSubproductDialog";
import AddMeasureDialog from "./AddMeasureDialog";

function DetailExtra(props) {
  const product = props.item;
  const [openSubproduct, setOpenSubproduct] = useState(false);
  const [openMeasure, setOpenMeasure] = useState(false);
  const refreshProduct = props.refreshFunction;
  const [stock, setStock] = useState({
    compositions: [],
    usedSubproducts: [],
    notUsedSubproducts: [],
    packagingObjects: [],
    measures: [],
  });

  useEffect(() => {
    getProductComponents(product.id).then((response) =>
      setStock(response.data)
    );
  }, [product]);

  function renderIngredients() {
    const items = stock.usedSubproducts.map((subp) => {
      const prodComposition = stock.compositions.filter(
        (comp) => comp.subproduct === subp.url
      )[0];
      return (
        <SubProductListItem
          key={subp.id}
          value={subp}
          composition={prodComposition}
          refreshFunction={refreshProduct}
        />
      );
    });
    return items;
  }

  function renderMeasures() {
    const items = stock.measures.map((measure) => {
      return (
        <MeasureListItem
          key={measure.id}
          value={measure}
          refreshFunction={refreshProduct}
        />
      );
    });
    return items;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <p>Makeable amount: {product.makeable_amount.toFixed(2)}</p>
      </Grid>

      <Grid item xs={12} sm={6}>
        <List
          subheader={
            <ListSubheader component="div">
              <h2>
                Ingredients:
                <IconButton edge="end" onClick={() => setOpenSubproduct(true)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </h2>
            </ListSubheader>
          }
        >
          {renderIngredients()}
        </List>
        <AddSubproductDialog
          items={stock.notUsedSubproducts}
          refreshProduct={refreshProduct}
          url={product.url}
          open={openSubproduct}
          close={() => setOpenSubproduct(false)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <List
          subheader={
            <ListSubheader component="div">
              <h2>
                Measures:
                <IconButton edge="end" onClick={() => setOpenMeasure(true)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </h2>
            </ListSubheader>
          }
        >
          {renderMeasures()}
        </List>
        <AddMeasureDialog
          items={stock.packagingObjects}
          refreshProduct={refreshProduct}
          url={product.url}
          open={openMeasure}
          close={() => setOpenMeasure(false)}
        />
      </Grid>
    </Grid>
  );
}

function SubProductListItem(props) {
  const subprod = props.value;
  const comp = props.composition;
  const refreshProduct = props.refreshFunction;

  function handleDelete() {
    deleteComposition(comp.id).then(() => refreshProduct());
  }

  return (
    <ListItem>
      {`${subprod.name}: ${comp.quantity}`}
      <IconButton edge="end" onClick={handleDelete}>
        <HighlightOffIcon fontSize="small" />
      </IconButton>
    </ListItem>
  );
}

function MeasureListItem(props) {
  const measure = props.value;
  const refreshProduct = props.refreshFunction;

  function handleDelete() {
    refreshProduct();
  }

  return (
    <ListItem>
      {`${measure.name}: ${measure.size} - $${measure.price}`}
      <IconButton edge="end" onClick={handleDelete}>
        <HighlightOffIcon fontSize="small" />
      </IconButton>
    </ListItem>
  );
}

export default DetailExtra;
