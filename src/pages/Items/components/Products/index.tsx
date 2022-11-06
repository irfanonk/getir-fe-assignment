import { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import {
  addToBasket,
  getItems,
  Item,
  selectItems,
} from "../../../../features/items/itemSlice";

import { styled } from "@mui/material/styles";
import ProductCard from "./ProductCard";
import { useTheme } from "@mui/material/styles";
import Pagination from "../Pagination";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import PageLoading from "../../../../components/PageLoading";
import {
  filterByItemType,
  selectFilters,
} from "../../../../features/filter/filterSlice";

const ITEMTYPES = ["mug", "shirt"];

const StyledButton = styled(Button)(() => ({
  textTransform: "lowercase",
}));

export default function Products() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const filters = useAppSelector(selectFilters);
  console.log("filters", filters);
  const itemType = filters.itemType;

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const onClickItemType = (_itemType: string) => {
    dispatch(filterByItemType(_itemType));
    dispatch(getItems());
  };

  const onAddToBasket = (item: Item) => {
    console.log("item", item);
    dispatch(addToBasket(item));
  };

  return (
    <Stack spacing={2}>
      <Stack>
        <Typography>Products</Typography>
      </Stack>
      <Stack spacing={2} direction="row">
        {ITEMTYPES.map((type: string) => {
          return (
            <StyledButton
              onClick={() => onClickItemType(type)}
              variant={itemType === type ? "contained" : "text"}
            >
              {type}
            </StyledButton>
          );
        })}
      </Stack>
      <Stack sx={{ background: "#fff" }} p={5} direction="row">
        <Grid
          container
          minHeight={"100vh"}
          alignItems="center"
          spacing={4}
          justifyContent="center"
        >
          {items.status === "loading" ? (
            <CircularProgress />
          ) : (
            items.value?.map((item: Item, i: number) => {
              return (
                <Grid key={i} item xs={12} sm={6} md={3}>
                  <ProductCard onAddToBasket={onAddToBasket} product={item} />
                </Grid>
              );
            })
          )}
        </Grid>
      </Stack>
      <Stack>
        <Pagination />
      </Stack>
    </Stack>
  );
}
