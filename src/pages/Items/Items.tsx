import { useEffect, useState } from "react";
import { getItems, selectItems } from "../../features/items/itemSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Grid, Container } from "@mui/material";
import Header from "../../layout/Header";
import Products from "./components/Products";
import useResponsive from "../../hooks/useResponsive";

export default function Items() {
  const isDesktop = useResponsive("up", "lg");
  console.log("isDesktop", isDesktop);

  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  console.log("items", items);

  //   useEffect(() => {
  //     const params = {
  //       limit: 16,
  //       page: 1,
  //     };
  //     dispatch(getItems(params));
  //   }, []);

  //   if (items.status === "loading") {
  //     return <div>Loading...</div>;
  //   }
  return (
    <div>
      <Header />

      <Container sx={{ p: 10 }}>
        <Grid container>
          {isDesktop && (
            <Grid xs={2}>
              {/* filters */}
              filter
            </Grid>
          )}

          <Grid xs={isDesktop ? 8 : 12}>
            <Products />
          </Grid>
          {isDesktop && (
            <Grid xs={2}>
              {/* basket */}
              baseket
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}
