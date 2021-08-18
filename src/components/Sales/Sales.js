import React, { useEffect, useState } from "react";

import {
  Container,
  FormControl,
  TextField,
  Button,
  List,
  ListItem,
  ListSubheader,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { getProducts } from "services/currentUser";
import { createSales as createSale } from "services/products";
import "./index.css";

function Sales() {
  const [form, setForm] = useState([]);
  const [products, setProducts] = useState();
  const [items, setItems] = useState();

  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedMeasure, setSelectedMeasure] = useState();

  useEffect(() => {
    getProducts().then((products) => setProducts(products));
  }, []);

  useEffect(() => {
    const listItems = form.map((formItem, index) => {
      return (
        <ListItem key={index}>
          {formItem.product_sold}: {formItem.liters_sold} lts.
        </ListItem>
      );
    });
    setItems(listItems);
  }, [form]);

  function handleAddItem() {
    if (selectedProduct && selectedMeasure) {
      setForm([
        ...form,
        {
          product_sold: selectedProduct.name,
          liters_sold: selectedMeasure.size,
          price: selectedMeasure.total_cost,
          measure: selectedMeasure.url,
        },
      ]);
    }
  }

  function handleSubmit() {
    // TODO: This should be multiple requests async
    form.forEach((item) => createSale(item));
  }

  return (
    <Container maxWidth="md" className="container">
      <FormControl className="form-container ">
        <Autocomplete
          filterSelectedOptions
          className="autocomplete-input"
          onChange={(_, value) => setSelectedProduct(value)}
          options={products}
          getOptionLabel={(option) => option.name}
          renderInput={(param) => (
            <TextField {...param} label="Products" placeholder="Add product" />
          )}
        />
        <Autocomplete
          filterSelectedOptions
          className="autocomplete-input"
          onChange={(_, value) => setSelectedMeasure(value)}
          options={selectedProduct ? selectedProduct.measures : []}
          getOptionLabel={(option) => option.name}
          renderInput={(param) => (
            <TextField
              {...param}
              label="Measures"
              placeholder="Add measure for product"
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleAddItem}
        >
          Add item
        </Button>
      </FormControl>

      <List
        subheader={
          <ListSubheader>
            <h2>Items added:</h2>
          </ListSubheader>
        }
      >
        {items}
      </List>

      {!form.length ? null : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit sale
        </Button>
      )}
    </Container>
  );
}

export default Sales;
