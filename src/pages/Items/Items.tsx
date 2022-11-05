import { useEffect, useState } from "react";
import { getItems, selectItems } from "../../features/items/itemSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Grid, Container } from "@mui/material";
import Header from "../../layout/Header";
import Products from "./components/Products";
import useResponsive from "../../hooks/useResponsive";
import Filters from "./components/Filters";

export default function Items() {
  const isDesktop = useResponsive("up", "lg");

  return (
    <div>
      <Header />

      <Container sx={{ py: 10 }}>
        <Grid container gap={2}>
          {isDesktop && (
            <Grid xs={2}>
              {/* filters */}
              <Filters />
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
