import React from "react";

import Container from "@material-ui/core/Container";
import DetailBody from "./DetailBody";
import DetailHeading from "./DetailHeading";

function ItemDetailScreen(props) {
  const item = props.item;
  const deleteFunction = props.deleteFunction;
  const refreshFunction = props.refreshFunction;
  const DetailExtra = props.DetailExtra;

  return (
    <Container maxWidth="md" className="container">
      <DetailHeading item={item} deleteFunction={deleteFunction} />
      <DetailBody item={item} />
      {DetailExtra && (
        <DetailExtra item={item} refreshFunction={refreshFunction} />
      )}
    </Container>
  );
}

export default ItemDetailScreen;
