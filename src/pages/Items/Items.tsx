import { useEffect, useState } from "react";
import { getItems, selectItems } from "../../features/items/itemSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Grid, Container } from "@mui/material";
import Header from "../../layout/Header";
import Producst from "./components/Products";

export default function Items() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  console.log("items", items);

  useEffect(() => {
    dispatch(getItems(16));
  }, []);

  //   if (items.status === "loading") {
  //     return <div>Loading...</div>;
  //   }
  return (
    <div>
      <Header />

      <Container sx={{ p: 10 }}>
        {items.status === "loading" ? (
          <div>Loading</div>
        ) : (
          <Grid container spacing={2}>
            <Grid xs={2}>
              {/* filters */}
              filter
            </Grid>
            <Grid xs={8}>
              <Producst products={items?.value} />
            </Grid>
            <Grid xs={2}>
              {/* basket */}
              baseket
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}
