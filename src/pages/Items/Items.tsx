import { useEffect, useState } from "react";
import { getItems, selectItems } from "../../features/items/itemSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Grid, Box, styled } from "@mui/material";
import Header from "../../layout/Header";
import Products from "./components/Products";
import useResponsive from "../../hooks/useResponsive";
import Filters from "./components/Filters";
import Basket from "./components/Basket";

const RootContainerBox = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "center",
  padding: 80,
}));
export default function Items() {
  const isDesktop = useResponsive("up", "lg");

  return (
    <>
      <Header />

      <RootContainerBox>
        <Grid container justifyContent="center" gap={2}>
          {isDesktop && (
            <Grid item>
              {/* filters */}
              <Filters />
            </Grid>
          )}

          <Grid item xs={isDesktop ? 6 : 12}>
            <Products />
          </Grid>
          {isDesktop && (
            <Grid item>
              {/* basket */}
              <Basket />
            </Grid>
          )}
        </Grid>
      </RootContainerBox>
    </>
  );
}
