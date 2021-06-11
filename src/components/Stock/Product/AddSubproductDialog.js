import React, { useState } from "react";
import {
  Select,
  Input,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { createComposition } from "services/products";

function AddSubproductDialog(props) {
  const [form, setForm] = useState({
    product: props.url,
    subproduct: "",
    quantity: "",
  });

  const refreshProduct = props.refreshProduct;

  function handleSubmit() {
    createComposition(form);
    refreshProduct();
    props.close();
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function renderFilteredSubproducts() {
    const items = props.items.map((subp) => (
      <MenuItem key={subp.id} value={subp.url}>
        {subp.name}
      </MenuItem>
    ));
    return items;
  }

  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogTitle>Add new ingredient</DialogTitle>
      <DialogContent>
        <FormControl>
          <Select name="subproduct" displayEmpty onChange={handleChange}>
            {renderFilteredSubproducts()}
          </Select>
          <Input
            name="quantity"
            onChange={handleChange}
            placeholder="Quantity"
          ></Input>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSubproductDialog;
