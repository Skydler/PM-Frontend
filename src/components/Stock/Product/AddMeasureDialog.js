import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createMeasure } from "services/products";

function AddMeasureDialog(props) {
  const [form, setForm] = useState({
    product: props.url,
    name: "",
    size: "",
    price: "",
    packaging_objects: [],
  });

  const refreshProduct = props.refreshProduct;

  function handleSubmit() {
    createMeasure(form).then(() => refreshProduct());
    props.close();
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogTitle>Add new measure</DialogTitle>
      <DialogContent>
        <FormControl>
          <Autocomplete
            multiple
            filterSelectedOptions
            onChange={(_, values) => {
              const urls = values.map((value) => value.url);
              setForm({ ...form, packaging_objects: urls });
            }}
            options={props.items}
            getOptionLabel={(option) => option.name}
            renderInput={(param) => (
              <TextField
                {...param}
                label="Packaging Products"
                placeholder="Add packaging"
              />
            )}
          />
          <TextField
            required
            name="name"
            onChange={handleChange}
            label="Name"
          />
          <TextField
            required
            name="size"
            type="number"
            onChange={handleChange}
            label="Size"
          />
          <TextField
            required
            name="price"
            type="number"
            onChange={handleChange}
            label="Price"
          />
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

export default AddMeasureDialog;
