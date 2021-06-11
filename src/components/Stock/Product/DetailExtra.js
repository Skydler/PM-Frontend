import React, { useEffect, useState } from "react";
import {
  Container,
  IconButton,
  List,
  ListItem,
  ListSubheader,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { getSubproducts, getPackagingObjects } from "services/currentUser";
import {
  deleteComposition,
  getCompositionsOfProduct,
  getMeasuresOfProduct,
} from "services/products";

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
    // All of this filtering should be done by the backend
    // but for now let's leave it this way so I can get a simple prototype working
    getCompositionsOfProduct(product).then((compositions) => {
      getSubproducts().then((totalSubproducts) => {
        const CompSubproductUrls = compositions.map((comp) => comp.subproduct);
        const notUsedSubproducts = totalSubproducts.filter(
          (subp) => !CompSubproductUrls.includes(subp.url)
        );
        const usedSubproducts = totalSubproducts.filter((subp) =>
          CompSubproductUrls.includes(subp.url)
        );

        getMeasuresOfProduct(product).then((measures) => {
          getPackagingObjects().then((packaging) => {
            setStock({
              compositions: compositions,
              usedSubproducts: usedSubproducts,
              notUsedSubproducts: notUsedSubproducts,
              packagingObjects: packaging,
              measures: measures,
            });
          });
        });
      });
    });
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
    <Container>
      <p>Makeable amount: {product.makeable_amount}</p>

      <List
        subheader={
          <ListSubheader component="div">
            Ingredients:
            <IconButton edge="end" onClick={() => setOpenSubproduct(true)}>
              <AddCircleOutlineIcon />
            </IconButton>
          </ListSubheader>
        }
      >
        {renderIngredients()}
      </List>
      <List
        subheader={
          <ListSubheader component="div">
            Measures:
            <IconButton edge="end" onClick={() => setOpenMeasure(true)}>
              <AddCircleOutlineIcon />
            </IconButton>
          </ListSubheader>
        }
      >
        {renderMeasures()}
      </List>
      <AddSubproductDialog
        items={stock.notUsedSubproducts}
        refreshProduct={refreshProduct}
        url={product.url}
        open={openSubproduct}
        close={() => setOpenSubproduct(false)}
      />
      <AddMeasureDialog
        items={stock.packagingObjects}
        refreshProduct={refreshProduct}
        url={product.url}
        open={openMeasure}
        close={() => setOpenMeasure(false)}
      />
    </Container>
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
