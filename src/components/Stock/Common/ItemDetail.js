import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import NotFound from "components/Maintenance/NotFound";
import ItemDetailScreen from "./Screens/ItemDetailScreen/ItemDetailScreen";
import CircularProgress from "@material-ui/core/CircularProgress";

function ItemDetail(props) {
  const [item, setItem] = useState();
  const [error, setError] = useState(false);

  let { itemID } = useParams();
  const history = useHistory();

  const pathname = props.pathname;
  const getItem = props.getter;
  const deleteItem = props.deletter;

  useEffect(() => {
    refreshItem();
  }, [itemID]);

  function refreshItem() {
    getItem(itemID)
      .then((response) => setItem(response.data))
      .catch((error) => {
        setError(true);
        throw error;
      });
  }

  function handleDelete(id) {
    deleteItem(id).then(() => {
      history.push(pathname);
    });
  }

  if (error) {
    return (
      <NotFound reason="Couldn't find the item you searched for. Sorry :(" />
    );
  }

  return !item ? (
    <CircularProgress />
  ) : (
    <ItemDetailScreen
      item={item}
      deleteFunction={handleDelete}
      refreshFunction={refreshItem}
      DetailExtra={props.DetailExtra}
    />
  );
}

export default ItemDetail;
